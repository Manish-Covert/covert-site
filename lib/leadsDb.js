import { resolvePgUrl } from './pgUrl.js'
import { sql } from '@vercel/postgres'

// Make the connection string discoverable under any provider env-var name.
const PG_URL = resolvePgUrl()
if (PG_URL && !process.env.POSTGRES_URL) process.env.POSTGRES_URL = PG_URL

/* Schema is intentionally schemaless: a few first-class columns for
   listing/filtering (form, name, email, created_at) + a JSONB `data` blob
   holding every submitted field. New form fields need no migration. */
export async function ensureLeadsTable() {
  await sql`CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    form TEXT,
    name TEXT,
    email TEXT,
    data JSONB
  )`
  // Bring any pre-existing table up to the current shape.
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS form TEXT`
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS name TEXT`
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS data JSONB`
}

export async function insertLead({ form, name, email, data }) {
  await ensureLeadsTable()
  await sql`INSERT INTO leads (form, name, email, data)
    VALUES (${form}, ${name}, ${email}, ${JSON.stringify(data)}::jsonb)`
}

export async function listLeads() {
  await ensureLeadsTable()
  const { rows } = await sql`SELECT id, created_at, form, name, email, data
    FROM leads ORDER BY created_at DESC LIMIT 5000`
  return rows
}

export { sql }
