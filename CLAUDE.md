# Covert Site — Working Preferences

Vite + React (react-router) marketing site. Source in `src/`, static assets in `public/`.

## Workflow (agreed with the user)

- **Do NOT verify visual changes with Playwright screenshots.** Make the edit, run
  the build to confirm it compiles, and move on. The user reviews visuals via the
  preview URL themselves.
- **After every build, surface a preview URL for the page currently being edited.**
  Keep a `vite preview` server running (background, port 4173) and reply with the
  full URL including the route, e.g. `http://localhost:4173/about/anna`.

### Standard build + preview step

1. `npm run build` (confirms it compiles).
2. Ensure the preview server is running. It must be launched via the Bash tool's
   **background mode** (`run_in_background: true`) with `--host 0.0.0.0`, otherwise
   the sandbox reaps it when the call ends:
   `npx vite preview --port 4173 --host 0.0.0.0`
   (Only start it if it isn't already up — `curl -s -o /dev/null -w '%{http_code}'
   http://localhost:4173/` returns 200 when live.)
3. Reply with the URL for the route just edited: `http://localhost:4173<route>`

## Notes

- Shared gradient pill button: `.btn-gradient` (App.css). Wrap the label in a
  `<span>` so it stays above the animated fill.
- Global footer (contact form + footer) lives in `src/SiteFooter.jsx`, used on all pages.
- About subpage heroes use `heroBg` + `heroEmblem` fields in `data.js` (`MEGA_ABOUT`).
- Large images from Google Drive: the MCP download tool caps at ~10MB and its
  output is base64 that often exceeds the tool token limit — it gets saved to a
  file; decode it with a small python `base64.b64decode` snippet into `public/`.
