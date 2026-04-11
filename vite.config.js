import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For custom domain: use '/' as base path
// For GitHub Pages subdomain: use '/theolivegreen/'
// Check if CNAME exists to determine if using custom domain
import { existsSync, copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { SITE_ORIGIN, SEO_HARVEST, SEO_SHOP } from './src/seo/siteSeo.js'

const hasCustomDomain = existsSync(join(__dirname, 'public/CNAME'))
const basePath = hasCustomDomain ? '/' : '/theolivegreen/'

function escapeHtmlAttr(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

/**
 * Crawlers often skip JS. Emit /harvest/index.html and /shop/index.html with correct OG + keywords.
 * Replaces the homepage meta block derived from dist/index.html.
 */
function routeShareIndexHtml(fromBuiltIndex, meta) {
  let html = fromBuiltIndex
  const url = `${SITE_ORIGIN}${meta.path}`
  const t = escapeHtmlAttr(meta.title)
  const d = escapeHtmlAttr(meta.description)
  const alt = escapeHtmlAttr(meta.imageAlt || 'Olive Green Martinborough')
  const kw = meta.keywords ? escapeHtmlAttr(meta.keywords) : null

  html = html.replace(/<html lang="[^"]*"/, '<html lang="en-NZ"')
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}<\/title>`)
  html = html.replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${t}"`)
  if (kw) {
    if (/<meta name="keywords" /.test(html)) {
      html = html.replace(/<meta name="keywords" content="[^"]*"\s*\/>/, `<meta name="keywords" content="${kw}" />`)
    } else {
      html = html.replace(
        /(<meta name="title" content="[^"]*"\s*\/>)/,
        `$1\n    <meta name="keywords" content="${kw}" />`,
      )
    }
  }
  html = html.replace(
    /(<meta\s*\n\s*name="description"\s*\n\s*content=")([^"]*)("\s*\n\s*\/>)/,
    `$1${d}$3`,
  )
  html = html.replace(
    /<link rel="canonical" href="https:\/\/www\.olivegreenmartinborough\.com\/[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  )
  html = html.replace(
    /<meta property="og:url" content="https:\/\/www\.olivegreenmartinborough\.com\/[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${t}"`)
  html = html.replace(
    /(<meta\s*\n\s*property="og:description"\s*\n\s*content=")([^"]*)("\s*\n\s*\/>)/,
    `$1${d}$3`,
  )
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    `<meta property="og:image:alt" content="${alt}"`,
  )
  html = html.replace(
    /<meta name="twitter:url" content="https:\/\/www\.olivegreenmartinborough\.com\/[^"]*"\s*\/>/,
    `<meta name="twitter:url" content="${url}" />`,
  )
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${t}"`)
  html = html.replace(
    /(<meta\s*\n\s*name="twitter:description"\s*\n\s*content=")([^"]*)("\s*\n\s*\/>)/,
    `$1${d}$3`,
  )
  html = html.replace(
    /<meta name="twitter:image:alt" content="[^"]*"/,
    `<meta name="twitter:image:alt" content="${alt}"`,
  )
  return html
}

/** GitHub Pages: 404.html for SPA fallback; route-specific index.html for crawlers + previews. */
function spaFallback404AndRouteMeta() {
  return {
    name: 'spa-fallback-route-meta',
    closeBundle() {
      const dist = join(process.cwd(), 'dist')
      const indexHtml = join(dist, 'index.html')
      const notFoundHtml = join(dist, '404.html')
      if (!existsSync(indexHtml)) return
      copyFileSync(indexHtml, notFoundHtml)

      const raw = readFileSync(indexHtml, 'utf8')

      const harvestDir = join(dist, 'harvest')
      mkdirSync(harvestDir, { recursive: true })
      writeFileSync(join(harvestDir, 'index.html'), routeShareIndexHtml(raw, SEO_HARVEST), 'utf8')

      const shopDir = join(dist, 'shop')
      mkdirSync(shopDir, { recursive: true })
      writeFileSync(join(shopDir, 'index.html'), routeShareIndexHtml(raw, SEO_SHOP), 'utf8')
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback404AndRouteMeta()],
  base: process.env.NODE_ENV === 'production' || process.env.VITE_BUILD ? basePath : '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
})
