/* GoHighLevel (LeadConnector) REST client.

   Creates/updates a contact on each form submission via the standard Contacts
   API (upsert dedups by email/phone). We deliberately avoid GHL's premium
   Inbound Webhook trigger — instead we tag the contact `website-lead`, and a
   GHL Workflow triggered by that tag creates the opportunity in the desired
   pipeline/stage (a standard, non-premium trigger).

   Custom-field IDs are resolved at runtime from the location's custom fields
   (matched by fieldKey/name) and cached, so no opaque IDs are hardcoded and the
   integration self-heals if a field is recreated.

   Lead source: every website submission sets the primary lead source
   (contact.lead_source) to `covert_contact`. When updating an existing contact,
   the previous primary value is first moved down into the secondary lead source
   (contact.secondary_lead_source) — always, even if it already matched. */

const API_BASE = 'https://services.leadconnectorhq.com'
const API_VERSION = '2021-07-28'
const LEAD_TAG = 'website-lead'
const LEAD_SOURCE_VALUE = 'Covert Contact'

function headers() {
  return {
    Authorization: `Bearer ${process.env.GHL_TOKEN}`,
    Version: API_VERSION,
    'content-type': 'application/json',
    accept: 'application/json',
  }
}

// Module-scope cache of resolved field IDs, keyed by location.
const fieldCache = new Map()

/* Fetch the location's custom fields once and resolve the IDs we need. */
async function resolveFieldIds(locationId) {
  if (fieldCache.has(locationId)) return fieldCache.get(locationId)

  const res = await fetch(`${API_BASE}/locations/${locationId}/customFields`, { headers: headers() })
  if (!res.ok) throw new Error(`GHL customFields ${res.status}: ${await res.text()}`)
  const json = await res.json()
  const fields = json.customFields || json.customField || []

  const norm = s => String(s || '').toLowerCase()
  const byKey = key => {
    const f = fields.find(cf => norm(cf.fieldKey) === key)
    return f ? f.id : null
  }
  const byName = needle => {
    const f = fields.find(cf => norm(cf.name).includes(needle))
    return f ? f.id : null
  }

  const ids = {
    howHeard: byName('how did you hear'),
    leadSource: byKey('contact.lead_source'),
    secondaryLeadSource: byKey('contact.secondary_lead_source'),
    message: byKey('contact.message'),
  }
  fieldCache.set(locationId, ids)
  return ids
}

/* Look up an existing contact by email (falls back to phone). Returns the
   contact object (including its customFields) or null when none exists. */
async function findExistingContact(locationId, email, phone) {
  const params = new URLSearchParams({ locationId })
  if (email) params.set('email', email)
  if (phone) params.set('number', phone)
  const res = await fetch(`${API_BASE}/contacts/search/duplicate?${params}`, { headers: headers() })
  if (!res.ok) return null // treat lookup failure as "no existing" — upsert still dedups
  const json = await res.json().catch(() => ({}))
  return json.contact || null
}

/* Read a custom field's current value off a contact record. */
function readContactField(contact, fieldId) {
  if (!contact || !fieldId) return undefined
  const cf = (contact.customFields || contact.customField || []).find(f => f.id === fieldId)
  return cf ? (cf.value ?? cf.fieldValue) : undefined
}

/* Create or update a GHL contact for a form submission. Throws on failure so
   the caller's Promise.allSettled records + logs it (consistent with brevoSend). */
export async function upsertContact({ firstName, lastName, email, phone, referral, message }) {
  const token = process.env.GHL_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) throw new Error('GHL_TOKEN / GHL_LOCATION_ID not configured')

  // Strip formatting so dedup on phone is reliable; assume US (+1) if 10 digits.
  const digits = String(phone || '').replace(/\D/g, '')
  const normalizedPhone = digits.length === 10 ? `+1${digits}` : digits ? `+${digits}` : undefined

  const ids = await resolveFieldIds(locationId)

  // Lead-source swap: if the contact already exists, move its current primary
  // lead source down into the secondary field (always), then set the new primary.
  const existing = await findExistingContact(locationId, email, normalizedPhone)
  const oldPrimary = readContactField(existing, ids.leadSource)

  const customFields = []
  if (ids.howHeard && referral) customFields.push({ id: ids.howHeard, value: referral })
  if (ids.message && message) customFields.push({ id: ids.message, value: message })
  if (ids.leadSource) customFields.push({ id: ids.leadSource, value: LEAD_SOURCE_VALUE })
  if (ids.secondaryLeadSource && existing && oldPrimary) {
    customFields.push({ id: ids.secondaryLeadSource, value: oldPrimary })
  }

  const body = {
    locationId,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email: email || undefined,
    phone: normalizedPhone,
    tags: [LEAD_TAG],
    ...(customFields.length ? { customFields } : {}),
  }

  const res = await fetch(`${API_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`GHL upsert ${res.status}: ${await res.text()}`)
  return res.json()
}
