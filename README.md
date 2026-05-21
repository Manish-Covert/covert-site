# Covert Communication — React Site

Dark, futuristic landing page built from the PDF design, with
Lesse-Studio-style smooth scroll reveals, a glowing animated "C"
emblem, floating service tags, an animated gradient footer, and a
contact form.

## Tech
- Vite + React (static output — works on GoDaddy cPanel shared hosting)
- `vite.config.js` uses `base: './'` so it works in the domain root OR a subfolder
- `framer-motion` installed (optional; current animations are CSS + IntersectionObserver)

## Develop
```bash
npm install
npm run dev
```

## Build for upload
```bash
npm run build      # outputs the static site into /dist
```
Upload the **contents of `dist/`** to `public_html` on GoDaddy.
See `dist/UPLOAD-INSTRUCTIONS.txt` for step-by-step directions.

## Customize
- **Contact form:** set `WEB3FORMS_KEY` in `src/App.jsx` (free key at web3forms.com).
- **Portrait:** drop `portrait.png` in `public/`, then in `src/App.jsx`
  replace the `.portrait__placeholder` block with `<img src="./portrait.png" alt="Founder" />`.
- **Copy / services:** edit the `SERVICES_LEFT` / `SERVICES_RIGHT` arrays and headline in `src/App.jsx`.
- **Colors:** all tokens live at the top of `src/index.css` (`:root`).
