# SEO Checklist — run this every time we add a new page or blog post

This is the standing SEO procedure for the Covert Communication site. **Every
time** a new route/page is added (a service, About subpage, case study, or a new
"The Latest" blog post), work through this list before considering the page done.

> Context: the site is a client-side React SPA (Vite + react-router). The base
> `index.html` only carries **global** meta (site-wide title, description, OG).
> There is currently **no per-route meta management**, so most of the work below
> is about giving each new page its own title, description, canonical, and
> structured data. See "One-time setup" at the bottom if the per-page meta
> helper doesn't exist yet.

---

## Per-page checklist (do all of these for the new page)

### 1. Title tag
- [ ] Unique, descriptive `<title>`, ~50–60 characters.
- [ ] Format: `Primary Keyword / Topic — Covert Communication`.
- [ ] Not a duplicate of any existing page's title.

### 2. Meta description
- [ ] Unique `<meta name="description">`, ~140–160 characters.
- [ ] Reads as a compelling summary (it's the search snippet), includes the
      main keyword naturally, no keyword stuffing.

### 3. Canonical URL
- [ ] `<link rel="canonical" href="https://covertcommunication.com/<route>">`
      pointing at the clean, final URL for this page (no query/UTM params).

### 4. Open Graph + Twitter cards (social sharing)
- [ ] `og:title`, `og:description`, `og:url`, `og:type`
      (`article` for blog posts / case studies, `website` for landing pages).
- [ ] `og:image` — an absolute URL to a 1200×630 image for this page
      (fall back to the site logo/social card if the page has no hero image).
- [ ] `twitter:card` = `summary_large_image`, plus `twitter:title` /
      `twitter:description` / `twitter:image`.

### 5. Structured data (JSON-LD)
- [ ] Blog post ("The Latest"): `Article` / `BlogPosting` schema with
      `headline`, `datePublished`, `dateModified`, `author`, `image`, `url`.
- [ ] Service / About / landing page: `WebPage` (or `Service` /
      `Organization` where it fits).
- [ ] Case study: `Article` is fine; add `about` if relevant.
- [ ] Validate the JSON-LD (https://validator.schema.org/ or Google Rich
      Results Test).

### 6. Headings & on-page content
- [ ] Exactly **one** `<h1>` on the page, containing the primary keyword.
- [ ] Logical heading order (`h1` → `h2` → `h3`, no skipped levels).
- [ ] Primary keyword appears in the first ~100 words of body copy.

### 7. Images
- [ ] Every meaningful image has descriptive `alt` text (empty `alt=""` only for
      purely decorative images).
- [ ] Images are compressed and served as `.webp` where possible
      (match existing assets in `public/`).
- [ ] Large hero/OG images sized appropriately (don't ship a 4000px original).

### 8. Links
- [ ] At least one internal link **to** the new page from a relevant existing
      page (so it isn't orphaned) — e.g. link a new blog post from
      `/the-latest`, a new service from the services index / nav.
- [ ] At least one internal link **out** to a related page.
- [ ] External links use `rel="noopener"` (and `nofollow`/`sponsored` where
      appropriate).

### 9. Sitemap & robots
- [ ] Add the new route's URL to `public/sitemap.xml` with `<lastmod>`.
- [ ] Confirm the page is **not** blocked in `public/robots.txt`
      (admin/internal routes like `/admin` should stay disallowed).

### 10. URL & routing hygiene
- [ ] Slug is lowercase, hyphenated, keyword-rich, and stable
      (don't rename slugs after publishing — if you must, add a redirect).
- [ ] Route is registered in `src/App.jsx`.
- [ ] Unknown/typo slugs redirect sensibly (the detail pages already
      `<Navigate>` back to their index — keep that).

### 11. Accessibility & performance (SEO-adjacent, cheap wins)
- [ ] Page is keyboard-navigable and color-contrast is OK.
- [ ] `npm run build` passes and no console errors on the route.
- [ ] Lazy-load heavy below-the-fold assets (follow the existing `lazy()`
      pattern in `App.jsx` for big chunks).

### 12. Post-deploy verification
- [ ] Open the Vercel preview URL and view source: confirm the title,
      description, canonical, OG tags, and JSON-LD render for **this** route.
- [ ] Run the URL through Google Rich Results Test / a share-debugger
      (LinkedIn / Facebook / X) to confirm the card looks right.
- [ ] After it's live on production, submit/ping the sitemap in Google Search
      Console so the new URL gets crawled.

---

## Blog post ("The Latest") — extra notes

When adding a post, the body lives in `src/latestContent.js` and the card
metadata in `src/data.js` (`LATEST` / `LATEST_CATEGORIES`). While you're there:

- [ ] Set a real `excerpt` — it's reused as the meta description / card summary.
- [ ] Set `date` (used for `datePublished`) and update it if the post is edited.
- [ ] Assign the correct category so it's discoverable via the index filters.
- [ ] Use a specific, absolute `img` URL for the OG image.

---

## One-time setup (do this once if it isn't already in place)

The per-page steps above assume a way to set `<title>`/meta per route. If that
doesn't exist yet, set it up first, then this checklist becomes routine:

1. Add a lightweight head manager (`react-helmet-async`, or a small
   `useEffect`-based `useSEO(...)` hook that sets `document.title` and injects/
   updates the meta, canonical, OG, and JSON-LD tags on mount).
2. Create `public/sitemap.xml` and `public/robots.txt` (robots should point at
   the sitemap and disallow `/admin`).
3. Wire a default/fallback SEO block so pages that forget still get sane meta.
