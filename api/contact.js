import { resolvePgUrl } from '../lib/pgUrl.js'
import { sql } from '@vercel/postgres'

const PG_URL = resolvePgUrl()
if (PG_URL && !process.env.POSTGRES_URL) process.env.POSTGRES_URL = PG_URL

/* Marketing attribution params captured on the landing URL. */
const ATTRIB = [
  'gclid', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'ad_set_id', 'ad_id', 'ad_campaign',
]

const BRAND_GREEN = '#a6f23c'

function esc(s = '') {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

/* Shared email shell — dark header w/ brand accent, light body. */
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

async function saveLead(lead) {
  await sql`CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    first_name TEXT, last_name TEXT, email TEXT, phone TEXT,
    message TEXT, referral TEXT,
    gclid TEXT, fbclid TEXT, msclkid TEXT,
    utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, utm_term TEXT, utm_content TEXT,
    ad_set_id TEXT, ad_id TEXT, ad_campaign TEXT,
    landing_page TEXT, referrer TEXT
  )`
  await sql`INSERT INTO leads (
    first_name, last_name, email, phone, message, referral,
    gclid, fbclid, msclkid, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    ad_set_id, ad_id, ad_campaign, landing_page, referrer
  ) VALUES (
    ${lead.first_name}, ${lead.last_name}, ${lead.email}, ${lead.phone}, ${lead.message}, ${lead.referral},
    ${lead.gclid}, ${lead.fbclid}, ${lead.msclkid}, ${lead.utm_source}, ${lead.utm_medium}, ${lead.utm_campaign},
    ${lead.utm_term}, ${lead.utm_content}, ${lead.ad_set_id}, ${lead.ad_id}, ${lead.ad_campaign},
    ${lead.landing_page}, ${lead.referrer}
  )`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
  const first_name = (body.first_name || '').trim()
  const last_name = (body.last_name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  const message = (body.message || '').trim()
  const referral = (body.referral || '').trim()

  if (!first_name || !email) return res.status(400).json({ error: 'Name and email are required.' })

  const attribution = {}
  for (const k of ATTRIB) attribution[k] = (body[k] || '').toString().trim()
  const landing_page = (body.landing_page || '').toString().trim()
  const referrer = (body.referrer || '').toString().trim()
  const fullName = `${first_name} ${last_name}`.trim()

  // Absolute origin of this deployment, so the email logo resolves anywhere.
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0]
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'covertcommunication.com'
  const origin = `${proto}://${host}`

  // Admin notification
  const attribRows = ATTRIB.filter(k => attribution[k]).map(k => row(k, attribution[k])).join('')
  const adminHtml = shell('New contact form submission', `
    <table style="width:100%;border-collapse:collapse;">
      ${row('Name', fullName)}
      ${row('Email', email)}
      ${row('Phone', phone)}
      ${row('Heard via', referral)}
      ${row('Message', message)}
    </table>
    ${attribRows ? `<h2 style="font-size:15px;margin:24px 0 8px;color:#0a0f0a;">Attribution</h2>
      <table style="width:100%;border-collapse:collapse;">${attribRows}
      ${row('Landing page', landing_page)}${row('Referrer', referrer)}</table>` : ''}
  `, origin)

  // Auto-reply to the submitter
  const userHtml = shell(`Thanks, ${esc(first_name)} — we've received your message`, `
    <p style="font-size:15px;line-height:1.7;color:#333;">We have received your message. Our representative will contact you within <strong>2 days</strong>.</p>
    <p style="font-size:15px;line-height:1.7;color:#333;">In the meantime, feel free to explore what we do at
      <a href="https://covertcommunication.com" style="color:#2a8a4a;">covertcommunication.com</a>.</p>
    <p style="font-size:15px;line-height:1.7;color:#333;margin-top:24px;">— The Covert Communication Team</p>
  `, origin)

  const adminTo = (process.env.ADMIN_EMAIL || '').split(',').map(e => ({ email: e.trim() })).filter(e => e.email)

  const tasks = [
    saveLead({ first_name, last_name, email, phone, message, referral, ...attribution, landing_page, referrer }),
  ]
  if (adminTo.length) {
    tasks.push(brevoSend({ to: adminTo, subject: `New lead: ${fullName || email}`, html: adminHtml, replyTo: { email, name: fullName } }))
  }
  tasks.push(brevoSend({ to: [{ email, name: fullName }], subject: 'We received your message — Covert Communication', html: userHtml }))

  const results = await Promise.allSettled(tasks)
  const failed = results.filter(r => r.status === 'rejected')
  failed.forEach(f => console.error('contact task failed:', f.reason))

  // Succeed as long as the lead was saved OR at least one email went out.
  if (failed.length === results.length) {
    return res.status(500).json({ error: 'Submission failed. Please try again.' })
  }
  return res.status(200).json({ ok: true })
}
