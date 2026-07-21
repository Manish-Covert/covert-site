import { useEffect } from 'react'

const SITE = 'https://covertcommunication.com'
const DEFAULT_OG_IMAGE = `${SITE}/logo-horiz.png`

// Set or update a <meta> tag, keyed by name or property, in <head>.
function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page SEO. Call once near the top of a page component.
 *
 *   useSEO({
 *     title: 'Page Title — Covert Communication',
 *     description: '...140-160 chars...',
 *     path: '/the-route',            // canonical path, no query/UTM
 *     ogType: 'website' | 'article', // default 'website'
 *     image: 'https://.../card.jpg', // absolute; falls back to site logo
 *     jsonLd: { ... } | [ ... ],     // optional structured data object(s)
 *   })
 */
export function useSEO({ title, description, path = '/', ogType = 'website', image, jsonLd } = {}) {
  useEffect(() => {
    const url = `${SITE}${path}`
    // OG/Twitter images must be absolute; absolutize local paths.
    const ogImage = image
      ? (image.startsWith('http') ? image : `${SITE}${image.startsWith('/') ? '' : '/'}${image}`)
      : DEFAULT_OG_IMAGE

    if (title) document.title = title
    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImage)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    // Structured data — replace the tag we manage so stale schema never lingers.
    const prev = document.getElementById('seo-jsonld')
    if (prev) prev.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'seo-jsonld'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, ogType, image, JSON.stringify(jsonLd)])
}
