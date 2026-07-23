/* GoHighLevel (LeadConnector) REST client.

   Creates/updates a contact on each form submission via the standard Contacts
   API (upsert dedups by email/phone). We deliberately avoid GHL's premium
   Inbound Webhook trigger — instead we tag the contact `website-lead`, and a
   GHL Workflow triggered by that tag creates the opportunity in the desired
   pipeline/stage (a standard, non-premium trigger).

   Custom-field IDs are resolved at runtime from the location's custom fields
   (matched by name/key) and cached, so no opaque IDs are hardcoded and the
   integration self-heals if a field is recreated. */

const API_BASE = 'https://services.leadconnectorhq.com'
const API_VERSION = '2021-07-28'
const LEAD_TAG = 'website-lead'
const LEAD_SOURCE_VALUE = 'covert_contact'

// Substrings used to locate the two custom fields by name or fieldKey.
const HOW_HEARD_MATCH = 'how did you hear'
const LEAD_SOURCE_MATCH = 'lead source'

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

  const find = needle => {
    const f = fields.find(cf => {
      const name = String(cf.name || '').toLowerCase()
      const key = String(cf.fieldKey || '').toLowerCase()
      return name.includes(needle) || key.includes(needle.replace(/ /g, '_'))
    })
    return f ? f.id : null
  }

  const ids = { howHeard: find(HOW_HEARD_MATCH), leadSource: find(LEAD_SOURCE_MATCH) }
  fieldCache.set(locationId, ids)
  return ids
}

/* Create or update a GHL contact for a form submission. Throws on failure so
   the caller's Promise.allSettled records + logs it (consistent with brevoSend). */
export async function upsertContact({ firstName, lastName, email, phone, referral }) {
  const token = process.env.GHL_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) throw new Error('GHL_TOKEN / GHL_LOCATION_ID not configured')

  const ids = await resolveFieldIds(locationId)
  const customFields = []
  if (ids.howHeard && referral) customFields.push({ id: ids.howHeard, value: referral })
  if (ids.leadSource) customFields.push({ id: ids.leadSource, value: LEAD_SOURCE_VALUE })

  // Strip formatting so dedup on phone is reliable; assume US (+1) if 10 digits.
  const digits = String(phone || '').replace(/\D/g, '')
  const normalizedPhone = digits.length === 10 ? `+1${digits}` : digits ? `+${digits}` : undefined

  const body = {
    locationId,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email: email || undefined,
    phone: normalizedPhone,
    source: 'Website contact form',
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
