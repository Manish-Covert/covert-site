import { insertLead } from '../lib/leadsDb.js'

/* Marketing attribution params captured on the landing URL. */
const ATTRIB = [
  'gclid', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'ad_set_id', 'ad_id', 'ad_campaign',
]
const META_KEYS = ['landing_page', 'referrer', 'form', 'consent']

const BRAND_GREEN = '#a6f23c'

function esc(s = '') {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

/* first_name -> "First name" */
function humanize(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/* Shared email shell — dark header w/ logo + brand accent, light body. */
function shell(title, bodyHtml, origin) {
  const logo = `${origin || 'https://covertcommunication.com'}/logo-horiz.png`
  return `<!doctype html><html><body style="margin:0;background:#0a0f0a;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0a0f0a;padding:24px 32px;border-bottom:3px solid ${BRAND_GREEN};">
      <img src="${logo}" alt="Covert Communication" height="40" style="height:40px;width:auto;display:block;" />
    </div>
    <div style="padding:32px;">
      <h1 style="margin:0 0 18px;font-size:22px;color:#0a0f0a;">${title}</h1>
      ${bodyHtml}
    </div>
    <div style="background:#0a0f0a;padding:18px 32px;color:#8a938a;font-size:12px;">
      Covert Communication LLC &middot; <a href="https://covertcommunication.com" style="color:${BRAND_GREEN};text-decoration:none;">covertcommunication.com</a>
    </div>
  </div></body></html>`
}

function row(label, value) {
  if (!value) return ''
  return `<tr><td style="padding:6px 12px 6px 0;color:#6b746b;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:6px 0;font-size:14px;color:#1a1a1a;">${esc(value)}</td></tr>`
}

/* Render an object as a label/value table, in a preferred order first. */
function fieldTable(obj, keys) {
  const rows = keys.map(k => row(humanize(k), obj[k])).join('')
  return rows ? `<table style="width:100%;border-collapse:collapse;">${rows}</table>` : ''
}

async function brevoSend({ to, subject, html, replyTo }) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || 'Covert Communication' },
      to,
      subject,
      htmlContent: html,
      ...(replyTo ? { replyTo } : {}),
    }),
  })
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`)
  return res.json()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})

  // Trim every string value; keep the whole payload (scalable to new fields).
  const data = {}
  for (const [k, v] of Object.entries(body)) {
    data[k] = typeof v === 'string' ? v.trim() : v
  }

  const first_name = data.first_name || ''
  const email = data.email || ''
  if (!first_name || !email) return res.status(400).json({ error: 'Name and email are required.' })

  const form = (data.form || 'contact') || 'contact'
  const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim()

  // Absolute origin of this deployment, so the email logo resolves anywhere.
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0]
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'covertcommunication.com'
  const origin = `${proto}://${host}`

  // Ordered submission fields (known first, then any extras), attribution separate.
  const preferred = ['first_name', 'last_name', 'email', 'phone', 'referral', 'message']
  const extraKeys = Object.keys(data).filter(
    k => !preferred.includes(k) && !ATTRIB.includes(k) && !META_KEYS.includes(k)
  )
  const submissionKeys = [...preferred, ...extraKeys].filter(k => data[k])
  const attribKeys = [...ATTRIB, 'landing_page', 'referrer'].filter(k => data[k])

  const adminHtml = shell(`New ${esc(form)} submission`, `
    ${fieldTable(data, submissionKeys)}
    ${attribKeys.length ? `<h2 style="font-size:15px;margin:24px 0 8px;color:#0a0f0a;">Attribution</h2>
      ${fieldTable(data, attribKeys)}` : ''}
  `, origin)

  const userHtml = shell(`Thanks, ${esc(first_name)} — we've received your message`, `
    <p style="font-size:15px;line-height:1.7;color:#333;">We have received your message. Our representative will contact you within <strong>2 days</strong>.</p>
    <p style="font-size:15px;line-height:1.7;color:#333;">In the meantime, feel free to explore what we do at
      <a href="https://covertcommunication.com" style="color:#2a8a4a;">covertcommunication.com</a>.</p>
    <p style="font-size:15px;line-height:1.7;color:#333;margin-top:24px;">— The Covert Communication Team</p>
  `, origin)

  const adminTo = (process.env.ADMIN_EMAIL || '').split(',').map(e => ({ email: e.trim() })).filter(e => e.email)

  const tasks = [insertLead({ form, name: fullName, email, data })]
  if (adminTo.length) {
    tasks.push(brevoSend({ to: adminTo, subject: `New lead (${form}): ${fullName || email}`, html: adminHtml, replyTo: { email, name: fullName } }))
  }
  tasks.push(brevoSend({ to: [{ email, name: fullName }], subject: 'We received your message — Covert Communication', html: userHtml }))

  const results = await Promise.allSettled(tasks)
  const failed = results.filter(r => r.status === 'rejected')
  failed.forEach(f => console.error('contact task failed:', f.reason))

  if (failed.length === results.length) {
    return res.status(500).json({ error: 'Submission failed. Please try again.' })
  }
  return res.status(200).json({ ok: true })
}
