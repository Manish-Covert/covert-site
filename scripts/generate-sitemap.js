/* Build-time sitemap generator.
 * Reads the route data straight from src/data.js so new services, about
 * subpages, case studies, and blog posts are picked up automatically.
 * Runs via the `prebuild` npm script (see package.json).
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { SERVICES, MEGA_ABOUT, CASE_STUDIES, LATEST } from '../src/data.js'

const SITE = 'https://covertcommunication.com'
const today = new Date().toISOString().slice(0, 10)

// [path, priority]. Static routes first, then everything derived from data.
const routes = [
  ['/', '1.0'],
  ['/services', '0.8'],
  ['/about', '0.7'],
  ['/case-studies', '0.7'],
  ['/the-latest', '0.7'],
  ['/contact', '0.6'],
  ...SERVICES.map(s => [`/services/${s.id}`, '0.6']),
  ...MEGA_ABOUT.map(a => [`/about/${a.id}`, '0.5']),
  ...CASE_STUDIES.map(c => [`/case-studies/${c.slug}`, '0.5']),
  ...LATEST.map(l => [`/the-latest/${l.slug}`, '0.5']),
]

// Note: /admin and /thank-you are intentionally excluded (see robots.txt).

const body = routes
  .map(([path, priority]) =>
    `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

const outPath = resolve(dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml')
writeFileSync(outPath, xml)
console.log(`sitemap.xml written: ${routes.length} URLs`)
