import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For custom domain: use '/' as base path
// For GitHub Pages subdomain: use '/theolivegreen/'
// Check if CNAME exists to determine if using custom domain
import { existsSync, copyFileSync } from 'fs'
import { join } from 'path'

const hasCustomDomain = existsSync(join(__dirname, 'public/CNAME'))
const basePath = hasCustomDomain ? '/' : '/theolivegreen/'

/** GitHub Pages serves 404.html for unknown paths; copy index.html so the SPA loads and React Router can match /harvest etc. */
function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = join(process.cwd(), 'dist')
      const indexHtml = join(dist, 'index.html')
      const notFoundHtml = join(dist, '404.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFoundHtml)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback404()],
  base: process.env.NODE_ENV === 'production' || process.env.VITE_BUILD ? basePath : '/',
})
