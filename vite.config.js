import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For custom domain: use '/' as base path
// For GitHub Pages subdomain: use '/theolivegreen/'
// Check if CNAME exists to determine if using custom domain
import { existsSync } from 'fs'
import { join } from 'path'

const hasCustomDomain = existsSync(join(__dirname, 'public/CNAME'))
const basePath = hasCustomDomain ? '/' : '/theolivegreen/'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' || process.env.VITE_BUILD ? basePath : '/',
})
