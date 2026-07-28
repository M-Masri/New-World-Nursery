/**
 * Critical-path images only (above the fold).
 * Below-fold media loads lazily in each section.
 */
export function collectCriticalImageUrls({ settings = null } = {}) {
  const urls = new Set()
  const add = (value) => {
    if (typeof value !== 'string') return
    const url = value.trim()
    if (url) urls.add(url)
  }

  add(settings?.hero?.image)
  return [...urls]
}

/**
 * Hint the browser to fetch the LCP image without blocking React paint.
 * Returns a cleanup that removes the link (optional).
 */
export function hintHeroImagePreload(payload) {
  if (typeof document === 'undefined') return () => {}

  const [url] = collectCriticalImageUrls(payload)
  if (!url) return () => {}

  const existing = document.head.querySelector('link[data-hero-preload="1"]')
  if (existing) {
    if (existing.getAttribute('href') === url) return () => {}
    existing.remove()
  }
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  link.fetchPriority = 'high'
  link.dataset.heroPreload = '1'
  document.head.appendChild(link)

  return () => {
    link.remove()
  }
}

/** @deprecated Prefer hintHeroImagePreload — do not block first paint on decode. */
export function preloadCriticalImages(payload) {
  hintHeroImagePreload(payload)
  return Promise.resolve()
}

/** @deprecated Use preloadCriticalImages */
export const preloadHomeImages = preloadCriticalImages
