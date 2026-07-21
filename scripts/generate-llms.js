/* Build-time llms.txt generator.
 * Produces a Markdown llms.txt (https://llmstxt.org/) from src/data.js so the
 * file always reflects current services, about pages, case studies, and posts.
 * Requirements the audit checks: at least one H1 header and at least one link.
 * Runs via the `prebuild` npm script alongside the sitemap generator.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { SERVICES, MEGA_ABOUT, CASE_STUDIES, LATEST } from '../src/data.js'

const SITE = 'https://covertcommunication.com'
const link = (label, path, note) =>
  `- [${label}](${SITE}${path})${note ? `: ${note}` : ''}`

const sections = [
  `# Covert Communication`,
  ``,
  `> Covert Communication LLC is a full-service marketing and brand agency: brand building, programmatic advertising, SEM/SEO/GEO/AEO, social media, fraud protection, and technology consulting. We do it all.`,
  ``,
  `## Main pages`,
  ``,
  link('Home', '/', 'Overview of the agency and everything we do'),
  link('Services', '/services', 'Full list of marketing and technology services'),
  link('About', '/about', 'The people, brands, and story behind Covert Communication'),
  link('Case Studies', '/case-studies', 'Selected client work and results'),
  link('The Latest', '/the-latest', 'Articles, podcast episodes, and updates'),
  link('Contact', '/contact', 'Get in touch to start a project'),
  ``,
  `## Services`,
  ``,
  ...SERVICES.map(s =>
    link(s.title, `/services/${s.id}`, s.subs?.length ? s.subs.join(', ') : undefined)
  ),
  ``,
  `## About`,
  ``,
  ...MEGA_ABOUT.map(a => link(a.label, `/about/${a.id}`, a.tagline || undefined)),
  ``,
  `## Case studies`,
  ``,
  ...CASE_STUDIES.map(c => link(c.title, `/case-studies/${c.slug}`, c.excerpt || undefined)),
  ``,
  `## The Latest`,
  ``,
  ...LATEST.map(l => link(l.title, `/the-latest/${l.slug}`, l.category || undefined)),
  ``,
]

const outPath = resolve(dirname(fileURLToPath(import.meta.url)), '../public/llms.txt')
writeFileSync(outPath, sections.join('\n'))
console.log(`llms.txt written: ${SERVICES.length + MEGA_ABOUT.length + CASE_STUDIES.length + LATEST.length + 6} links`)
