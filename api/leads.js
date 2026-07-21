import { resolvePgUrl } from '../lib/pgUrl.js'
import { sql } from '@vercel/postgres'

const PG_URL = resolvePgUrl()
if (PG_URL && !process.env.POSTGRES_URL) process.env.POSTGRES_URL = PG_URL

/* Password-protected leads listing for the /admin page.
   Password is compared server-side against ADMIN_PASSWORD. */
export default async function handler(req, res) {
  const provided = req.method === 'POST'
    ? (typeof req.body === 'string' ? JSON.parse(req.body || '{}').password : (req.body || {}).password)
    : req.query.password

  if (!process.env.ADMIN_PASSWORD || provided !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Ensure the table exists so an empty DB returns [] instead of erroring.
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
    const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 2000`
    return res.status(200).json({ leads: rows })
  } catch (e) {
    console.error('leads query failed:', e)
    // Password-gated endpoint — include the reason so setup issues are visible.
    return res.status(500).json({
      error: 'Failed to load leads.',
      detail: String(e && e.message ? e.message : e),
      hasConnString: Boolean(process.env.POSTGRES_URL),
    })
  }
}
