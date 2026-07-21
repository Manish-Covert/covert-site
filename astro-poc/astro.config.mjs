import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// POC config. Static output so we can measure the "zero-JS-by-default" win of
// the service pages. Swap `output`/`adapter` for @astrojs/vercel when wiring a
// real Vercel deployment (needed once API routes / SSR pages are ported).
export default defineConfig({
  integrations: [react()],
  // Reuse the same /public asset folder as the Vite app (symlinked).
  publicDir: './public',
})
