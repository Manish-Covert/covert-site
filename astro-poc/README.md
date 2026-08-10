# Astro POC — covert-site

A throwaway proof-of-concept that ports **one page family** (the simple service
pages, `/services/:id`) to [Astro](https://astro.build) so we can measure the
payoff of Astro's "static HTML by default, hydrate only islands" model against
the current Vite + React SPA.

This lives in a subfolder and is **fully self-contained** — it does not touch the
production Vite build or the Vercel config. Shared CSS and data are imported
directly from `../src`, so nothing is duplicated.

## What's here

| File | Role |
|------|------|
| `astro.config.mjs` | Astro + `@astrojs/react` integration, static output |
| `src/components/Layout.astro` | HTML shell; imports the app's real CSS; scroll-reveal as a tiny inline script (replaces the `useReveal` React hook) |
| `src/components/Nav.astro` | Native port of `SiteNav.jsx` — static HTML + ~1KB inline script for mega-hover + mobile drawer (was full React state) |
| `src/components/Footer.astro` | Native port of `SiteFooter.jsx`; hydrates only the contact form |
| `src/components/ContactFormIsland.jsx` | The **one** React island, loaded `client:visible`. Reuses the existing form; only change vs `ContactForm.jsx` is `window.location` instead of react-router `useNavigate` |
| `src/pages/services/[id].astro` | The ported page, one static file pre-rendered per service via `getStaticPaths` |

## Run it

```bash
cd astro-poc
npm install
npm run dev        # http://localhost:4321/services/fraud
npm run build      # static output in ./dist  (see per-page JS in the build log)
```

## Friction found (the real lesson of the POC)

1. **react-router coupling.** `SiteNav`, `SiteFooter`, and `ContactForm` all import
   from `react-router-dom` (`Link`, `useLocation`, `useNavigate`). Those hooks
   crash outside a `<Router>`, so components can't be reused as islands verbatim —
   they need `<a href>` and `window.location` instead. Nav/Footer were reimplemented
   as `.astro`; the form needed a one-line island tweak.
2. **Global smooth scroll (`lenis`) and framer-motion route transitions** are not
   in scope here. They assume a single long-lived React app and are the hardest
   part of a full migration — they'd need a site-wide script (lenis) and Astro
   `<ClientRouter>` view transitions (framer).
3. **Backend.** `/api/contact` (Vercel + `@vercel/postgres`) would move to an Astro
   API route / Vercel function with the `@astrojs/vercel` adapter. Untouched here.

## Measuring the win

Build both and compare the JS shipped for an equivalent page:

- **Astro:** `npm run build` here → the simple service page ships **zero framework
  JS** except the footer form island (loaded only when scrolled into view).
- **SPA:** the current app loads React + react-router (+ eventually three.js /
  framer / lenis) before first paint on every route.

Run Lighthouse against both preview URLs to quantify first-paint / TBT / bundle
size before deciding on a full migration.

## Deploying to Vercel (next step, not done here)

Switch `astro.config.mjs` to the `@astrojs/vercel` adapter and point a separate
Vercel project (or a subfolder build) at `astro-poc/`. Kept separate deliberately
so the POC branch can't affect the live site's deploy.
