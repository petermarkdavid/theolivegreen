import { Helmet } from 'react-helmet-async'
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from '../seo/siteSeo'

/**
 * Per-route title, description, keywords, canonical, and Open Graph / Twitter tags.
 * Static route index.html files (Vite post-build) still matter for crawlers that skip JS.
 */
export default function Seo({
  path,
  title,
  description,
  keywords,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
}) {
  const url = `${SITE_ORIGIN}${path}`

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      <meta property="og:site_name" content="Olive Green Martinborough" />
      <meta property="og:locale" content="en_NZ" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}
    </Helmet>
  )
}
