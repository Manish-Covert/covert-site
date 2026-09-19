# Covert Site — Agent Project Context

This file is the persistent technical overview for humans and coding agents working on the Covert Communication website. Keep it current whenever architecture, routes, integrations, hosting, build behavior, or workflow rules change.

Last audited: 2026-09-18
Repository: Manish-Covert/covert-site
Primary development branch: dev
Production branch: main
Vercel project: covert-site

## 1. Operating rules

- All website work starts on `dev` (or a short-lived branch created from `dev` and merged back into `dev`).
- Never merge, promote, or deploy to `main` / production unless Manish explicitly says: **Approve for production.**
- Before a production update, record and confirm the exact approved development commit SHA, then promote only that approved change to `main`.
- Every push to a non-main branch creates a Vercel preview deployment.
- After a website change, return the exact Vercel preview URL, preferably including the edited route.
- Build verification is `npm run build`. Visual review is done by Manish through the Vercel preview; do not rely on Playwright screenshots as the normal visual-approval step.

See also:
- `docs/development-workflow.md` — production safety workflow.
- `CLAUDE.md` — existing working preferences and preview-fetch guidance.
- `.github/workflows/preview-url.yml` — preview URL automation.

## 2. Current architecture

### Front end
- Vite 8
- React 19
- React DOM 19
- React Router DOM 7
- ECMAScript modules (`"type": "module"`)
- CSS files colocated with page/component modules
- Framer Motion
- Lenis smooth scrolling
- Three.js via `three`, `@react-three/fiber`, and `@react-three/drei`

The application is a client-rendered SPA. Vercel rewrites all non-`/api/*` routes to `/index.html`, allowing React Router to own page routing.

Most non-home routes are lazy-loaded from `src/App.jsx` to reduce the homepage bundle. Three.js is also delayed on the homepage until user interaction on supported devices.

### Back end / serverless
Vercel Functions live in `api/`:
- `api/contact.js` — receives contact-form submissions.
- `api/leads.js` — password-protected lead listing used by the admin page.

Shared server-side modules live in `lib/`:
- `lib/leadsDb.js` — Postgres lead table creation, inserts, and listing.
- `lib/pgUrl.js` — resolves Postgres connection strings across common env names.
- `lib/ghl.js` — GoHighLevel / LeadConnector contact upsert integration.

### Data / content
- `src/data.js` — central service/about/navigation/case-study data used across multiple pages.
- `src/latestContent.js` — large article-detail content module; intentionally separated for lazy loading.
- `src/newDaySolarCaseStudy.js` — detailed New Day Solar case-study content/data.
- Static media and SEO files live in `public/`.

## 3. Route map

Routes are declared in `src/App.jsx`.

| Route | Main module | Purpose |
| --- | --- | --- |
| `/` and unmatched routes | `App.jsx` / `HomePage` | Main homepage |
| `/home-v2` | `HomeV2.jsx` | Alternate homepage version |
| `/home-v3` | `HomeV3.jsx` | Alternate homepage version |
| `/services` | `ServicesIndexPage.jsx` | Services index |
| `/services/:id` | `ServicePage.jsx` | Service detail |
| `/about` | `AboutIndexPage.jsx` | About index |
| `/about/:id` | `AboutPage.jsx` | About detail |
| `/contact` | `ContactPage.jsx` | Contact page |
| `/thank-you` | `ThankYouPage.jsx` | Form-completion page |
| `/case-studies` | `CaseStudiesPage.jsx` | Case studies index |
| `/case-studies/:slug` | `CaseStudyPage.jsx` | Case-study detail |
| `/the-latest` | `TheLatestPage.jsx` | Latest content index |
| `/the-latest/:slug` | `TheLatestDetailPage.jsx` | Article/content detail |
| `/admin` | `AdminLeadsPage.jsx` | Password-protected lead viewer |
| `/privacy-policy` | `PrivacyPolicyPage.jsx` | Privacy policy |
| `/terms-of-service` | `TermsOfServicePage.jsx` | Terms of service |

Legacy service URLs redirect in React Router:
- `/services/brand-creation` -> `/services/branding`
- `/services/brand-building` -> `/services/authority-influence`
- `/services/brand-specialties` -> `/services/branding`
- `/services/trad` -> `/services/digital-growth`

## 4. Important front-end modules

Shared/site-wide:
- `src/SiteNav.jsx` — primary navigation.
- `src/SiteFooter.jsx` — global footer and contact area.
- `src/ContactForm.jsx` — reusable website lead form.
- `src/useSEO.js` — page title/meta/Open Graph/JSON-LD handling.
- `src/useReveal.js` — reveal-on-scroll behavior.
- `src/useSmoothScroll.js` — smooth scrolling helper.
- `src/utm.js` — marketing attribution / UTM handling.
- `src/HeroLogo.jsx` — interactive Three.js homepage logo.
- `src/Emblem.jsx` — reusable emblem visual.
- `src/CaseCard.jsx` — reusable case-study card.

Page modules:
- `AboutIndexPage.jsx`, `AboutPage.jsx`
- `ServicesIndexPage.jsx`, `ServicePage.jsx`
- `ContactPage.jsx`, `ThankYouPage.jsx`
- `CaseStudiesPage.jsx`, `CaseStudyPage.jsx`
- `TheLatestPage.jsx`, `TheLatestDetailPage.jsx`
- `PrivacyPolicyPage.jsx`, `TermsOfServicePage.jsx`
- `AdminLeadsPage.jsx`
- `HomeV2.jsx`, `HomeV3.jsx`

## 5. Lead and CRM flow

Website forms POST to `/api/contact`.

Current submission flow:
1. Normalize submitted fields and preserve attribution fields.
2. Require first name + email.
3. Insert the lead into Postgres.
4. If GoHighLevel credentials are configured, upsert the contact into GHL.
5. Apply GHL tag `website-lead`.
6. Set the GHL primary lead source to `Covert Contact`; for existing contacts, the previous primary source is moved into the secondary source when available.
7. If an admin recipient is configured, send an admin notification through Brevo.
8. Send the submitter a Brevo confirmation email.
9. Individual downstream failures are logged with `Promise.allSettled`; the endpoint returns total failure only if every task fails.

The GHL integration intentionally uses a standard contact/tag workflow rather than a premium inbound-webhook trigger.

### Postgres schema
The `leads` table is created/updated lazily and includes:
- `id`
- `created_at`
- `form`
- `name`
- `email`
- `data JSONB`

The JSONB payload allows new form fields without a database migration.

## 6. Environment variables / secrets

Known runtime variables referenced in the repository:

Database:
- `POSTGRES_URL`
- `DATABASE_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `DATABASE_URL_UNPOOLED`

Brevo:
- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME` (optional; defaults to Covert Communication)
- `ADMIN_EMAIL` (comma-separated supported)

GoHighLevel:
- `GHL_TOKEN`
- `GHL_LOCATION_ID`

Admin lead viewer:
- `ADMIN_PASSWORD`

GitHub Actions preview workflow:
- `VERCEL_TOKEN`
- `VERCEL_PROJECT_ID`

Do not put secret values in this file or in source control.

## 7. Build, SEO, and generated files

Package scripts:
- `npm run dev` -> Vite dev server.
- `npm run build` -> runs `prebuild`, then Vite production build.
- `npm run lint` -> ESLint.
- `npm run preview` -> Vite local production preview.
- `npm run sitemap` -> sitemap generator.

Prebuild automatically runs:
- `scripts/generate-sitemap.js`
- `scripts/generate-llms.js`

Generated/public SEO artifacts include:
- `public/sitemap.xml`
- `public/robots.txt`
- `public/llms.txt`

When routes/content change materially, confirm the generators still include the intended pages.

## 8. Vite / bundle behavior

`vite.config.js`:
- Uses `@vitejs/plugin-react`.
- Outputs to `dist/`.
- Uses `assets/` for bundled assets.
- Separates framework packages into a `react-vendor` chunk.
- Separates Framer Motion / Lenis-related dependencies into a `motion-vendor` chunk.
- Three.js is kept out of the main initial homepage path through lazy loading.

## 9. Vercel hosting configuration

Vercel project:
- Project name: `covert-site`
- Project ID: `prj_TXa0pCaiyH2uJT6D9p7TnX60HkdX`
- Team ID: `team_RSvEpiTbL4KsC3LwVQGTG953`
- Framework: Vite
- Node.js: 24.x
- Git repository: `Manish-Covert/covert-site`
- Production branch: `main`
- Development/previews: `dev` and other non-main branches

`vercel.json`:
- Rewrites every non-API route to `/index.html` for SPA routing.
- Gives long immutable caching to built `/assets/*`.
- Gives long cache + stale-while-revalidate behavior to common static image/font/model formats.

Current production aliases include:
- `covert-site.vercel.app`
- `covert-site-manish-2200s-projects.vercel.app`
- `covert-site-git-main-manish-2200s-projects.vercel.app`

## 10. GitHub -> Vercel preview workflow

Vercel is connected directly to the GitHub repository and creates deployments from pushes.

Additionally, `.github/workflows/preview-url.yml` runs on pushes to every branch except `main`:
1. Polls Vercel for a READY preview for the pushed branch.
2. Uses GitHub secrets `VERCEL_TOKEN` and `VERCEL_PROJECT_ID`.
3. Finds an existing open PR for the branch or auto-creates a draft PR against `main`.
4. Comments the Vercel preview URL on the PR.

This is useful for surfacing branch previews, but the agent should still fetch/report the exact deployment URL for the commit it just changed.

## 11. Static assets

Major asset groupings under `public/` include:
- `about/`
- `case-studies/`
- `categories/`
- `home-v2/`
- `icons/`
- `services/`
- brand/logo files
- contact-background images
- `logo-3d.gltf`
- hero logo WebP variants

Prefer existing optimized WebP assets when available. Large media additions should stay organized by feature/page.

## 12. Known documentation caveat

`README.md` still contains older instructions describing manual GoDaddy/cPanel static hosting and a Web3Forms customization path. The live/current architecture uses Vercel hosting and the serverless `/api/contact` flow described above. Treat this `AGENTS.md`, current source code, `CLAUDE.md`, and `docs/development-workflow.md` as the more current operational references until the README is refreshed.

## 13. Fast change guide

For common requests:
- Homepage layout/copy: start with `src/App.jsx` and `src/App.css`.
- Navigation: `src/SiteNav.jsx`.
- Footer/global contact area: `src/SiteFooter.jsx`.
- Contact form fields/behavior: `src/ContactForm.jsx` + `api/contact.js`.
- Service names/content/category mapping: `src/data.js`; rendering in service page modules.
- About content/mapping: `src/data.js` + about page modules.
- Case studies: `src/data.js`, `src/newDaySolarCaseStudy.js`, `CaseStudiesPage.jsx`, `CaseStudyPage.jsx`, and `public/case-studies/`.
- Latest/articles: `src/data.js`, `src/latestContent.js`, and TheLatest page modules.
- SEO metadata: page-level `useSEO()`, plus sitemap/llms generators.
- Leads/CRM/email: `api/contact.js`, `lib/leadsDb.js`, `lib/ghl.js`.
- Admin lead viewer: `src/AdminLeadsPage.jsx` + `api/leads.js`.
- Hosting/routing/cache: `vercel.json`, Vercel project settings.
- Build/chunking: `vite.config.js`, `package.json`.

## 14. Maintenance rule for this file

Update this file in the same development change whenever any of the following changes:
- framework/package stack
- route map
- shared component ownership
- API endpoints
- database model
- CRM/email integrations
- required env vars
- build scripts
- SEO generators
- Vercel project/hosting behavior
- GitHub Actions/deployment workflow
- branch/production approval rules

Do not use this file as a change log. Keep it as a concise snapshot of the current system so future prompts can be answered quickly and consistently.
