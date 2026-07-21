import { listLeads } from '../lib/leadsDb.js'

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
    const leads = await listLeads()
    return res.status(200).json({ leads })
  } catch (e) {
    console.error('leads query failed:', e)
    return res.status(500).json({
      error: 'Failed to load leads.',
      detail: String(e && e.message ? e.message : e),
      hasConnString: Boolean(process.env.POSTGRES_URL),
    })
  }
}
