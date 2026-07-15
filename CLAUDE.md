# Covert Site — Working Preferences

Vite + React (react-router) marketing site. Source in `src/`, static assets in `public/`.

## Workflow (agreed with the user)

- **Do NOT verify visual changes with Playwright screenshots.** Make the edit, run
  the build to confirm it compiles, and move on. The user reviews visuals via the
  Vercel preview URL themselves.
- **After each change, reply with the Vercel preview URL for the page edited.**
  The site auto-deploys on Vercel on every push to the branch. Fetch the exact
  deployment URL for the just-pushed commit via the Vercel API and reply with
  `https://<deployment-url>/<route>`.

### Standard build + preview step

1. `npm run build` (confirms it compiles), then commit and push the branch.
2. Fetch the preview URL for the pushed commit (Vercel deploy takes ~30-60s;
   poll until `state` is `READY`). Token is in `$VERCEL_TOKEN`; team is
   `team_RSvEpiTbL4KsC3LwVQGTG953`; project app name is `covert-site`:
   ```bash
   SHA=$(git rev-parse HEAD)
   curl -s "https://api.vercel.com/v6/deployments?app=covert-site&limit=10&teamId=team_RSvEpiTbL4KsC3LwVQGTG953" \
     -H "Authorization: Bearer $VERCEL_TOKEN" \
   | python3 -c "import sys,json;d=json.load(sys.stdin);print(next((x['url'],x['state']) for x in d['deployments'] if x.get('meta',{}).get('githubCommitSha','').startswith('$SHA'[:7]) or x.get('meta',{}).get('githubCommitSha')=='$SHA'))"
   ```
3. Reply with the URL for the route just edited: `https://<deployment-url><route>`
   (Requires the env network policy to allow `api.vercel.com` — already added.)

## Notes

- Shared gradient pill button: `.btn-gradient` (App.css). Wrap the label in a
  `<span>` so it stays above the animated fill.
- Global footer (contact form + footer) lives in `src/SiteFooter.jsx`, used on all pages.
- About subpage heroes use `heroBg` + `heroEmblem` fields in `data.js` (`MEGA_ABOUT`).
- Large images from Google Drive: the MCP download tool caps at ~10MB and its
  output is base64 that often exceeds the tool token limit — it gets saved to a
  file; decode it with a small python `base64.b64decode` snippet into `public/`.
