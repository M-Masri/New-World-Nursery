/**
 * Collect image URLs from split homepage API payloads.
 */
export function collectHomeImageUrls({
  settings = null,
  features = [],
  locations = [],
  programs = [],
  gallery = [],
  instagramFeed = [],
} = {}) {
  const urls = new Set()

  const add = (value) => {
    if (typeof value !== 'string') return
    const url = value.trim()
    if (url) urls.add(url)
  }

  add(settings?.hero?.image)
  add(settings?.about?.image)

  for (const feature of features) add(feature.icon_image)
  for (const location of locations) add(location.image)
  for (const program of programs) add(program.image)
  for (const item of gallery) add(item.image)
  for (const item of instagramFeed) add(item.image)

  return [...urls]
}

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * Wait until home media is in the browser cache (or timeout / failures).
 * Never rejects — bad images should not trap the loader forever.
 * Dedupes concurrent calls (e.g. React Strict Mode).
 */
let preloadPromise = null

export function preloadHomeImages(payload, { timeoutMs = 20_000 } = {}) {
  if (preloadPromise) return preloadPromise

  const urls = collectHomeImageUrls(payload)
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
