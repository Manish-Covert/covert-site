/* Resolve a Postgres connection string from whatever env var the hosting
   provider set. Vercel Postgres/Neon normally sets POSTGRES_URL, but we also
   accept the other common names and, as a last resort, scan every env value
   for a postgres:// URL so an oddly-named var still works. */
export function resolvePgUrl() {
  const named =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED
  if (named) return named
  for (const v of Object.values(process.env)) {
    if (typeof v === 'string' && /^postgres(ql)?:\/\//i.test(v)) return v
  }
  return ''
}
