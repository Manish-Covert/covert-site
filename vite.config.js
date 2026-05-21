import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from the root, so default absolute base paths are correct.
// (If you ever deploy to a subfolder again, set base: './'.)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
