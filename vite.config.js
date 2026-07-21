import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from the root, so default absolute base paths are correct.
// (If you ever deploy to a subfolder again, set base: './'.)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Keep the framework separate from app code so it caches across
          // deploys and route chunks stay small. three.js is already
          // isolated in the lazy HeroLogo chunk.
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils|lenis)[\\/]/.test(id)) return 'motion-vendor'
        },
      },
    },
  },
})
