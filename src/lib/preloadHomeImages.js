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

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.fetchPriority = 'high'
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * Preload only the hero image so the loader can dismiss quickly.
 * Dedupes concurrent calls (e.g. React Strict Mode).
 */
let preloadPromise = null

export function preloadCriticalImages(payload, { timeoutMs = 8_000 } = {}) {
  if (preloadPromise) return preloadPromise

  const urls = collectCriticalImageUrls(payload)
  if (urls.length === 0) {
    preloadPromise = Promise.resolve()
    return preloadPromise
  }

  preloadPromise = Promise.race([
    Promise.all(urls.map(preloadImage)),
    new Promise((resolve) => {
      window.setTimeout(resolve, timeoutMs)
    }),
  ]).catch(() => {
    preloadPromise = null
  })

  return preloadPromise
}

/** @deprecated Use preloadCriticalImages */
export const preloadHomeImages = preloadCriticalImages
