const DEFAULT_API_ORIGIN = 'https://neworld-backend.sawatech.ae'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  `${import.meta.env.VITE_API_ORIGIN || DEFAULT_API_ORIGIN}/api`
).replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, { status, errors, data } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors ?? null
    this.data = data ?? null
  }
}

/** Normalize UI language to API locale (`en` | `ar`). */
export function normalizeLocale(locale) {
  return locale === 'ar' ? 'ar' : 'en'
}

function buildUrl(endpoint, { locale, skipLocale } = {}) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const qIndex = path.indexOf('?')
  const pathname = qIndex >= 0 ? path.slice(0, qIndex) : path
  const existingQuery = qIndex >= 0 ? path.slice(qIndex + 1) : ''
  const params = new URLSearchParams(existingQuery)

  if (!skipLocale) {
    params.set('locale', normalizeLocale(locale))
  }

  const qs = params.toString()
  return `${API_BASE_URL}${pathname}${qs ? `?${qs}` : ''}`
}

async function request(endpoint, options = {}) {
  const {
    headers: optionHeaders,
    body,
    locale,
    skipLocale = false,
    ...rest
  } = options

  const url = buildUrl(endpoint, { locale, skipLocale })
  const resolvedLocale = normalizeLocale(locale)

  const config = {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...(skipLocale ? {} : { 'X-Locale': resolvedLocale }),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...optionHeaders,
    },
    ...(body !== undefined ? { body } : {}),
  }

  const response = await fetch(url, config)

  let payload = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    payload = await response.json()
  }

  if (!response.ok) {
    throw new ApiError(payload?.message || `API Error: ${response.status}`, {
      status: response.status,
      errors: payload?.errors ?? null,
      data: payload,
    })
  }

  return payload
}

function unwrapList(payload) {
  const data = payload?.data ?? payload
  return Array.isArray(data) ? data : []
}

function unwrapObject(payload) {
  return payload?.data ?? payload ?? null
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: 'DELETE' }),
}

export function fetchSettings(locale = 'en') {
  return api.get('/settings', { locale }).then(unwrapObject)
}

export function fetchFeatures(locale = 'en') {
  return api.get('/features', { locale }).then(unwrapList)
}

export function fetchLocations(locale = 'en') {
  return api.get('/locations', { locale }).then(unwrapList)
}

export function fetchPrograms(locale = 'en') {
  return api.get('/programs', { locale }).then(unwrapList)
}

/** All gallery images (optional category slug or id). */
export function fetchGallery(category, locale = 'en') {
  const query =
    category && category !== 'all'
      ? `?category=${encodeURIComponent(category)}`
      : ''
  return api.get(`/gallery${query}`, { locale }).then(unwrapList)
}

/** Categories with nested gallery images — best for tabs/filters UI. */
export function fetchGalleryCategories(locale = 'en') {
  return api.get('/gallery/categories', { locale }).then(unwrapList)
}

/** Single category and its images by slug. */
export function fetchGalleryCategoryBySlug(slug, locale = 'en') {
  return api
    .get(`/gallery/categories/${encodeURIComponent(slug)}`, { locale })
    .then(unwrapObject)
}

/** Synced Instagram posts (separate from gallery images). */
export function fetchInstagram(locale = 'en') {
  return api.get('/instagram', { locale }).then(unwrapList)
}

/** @deprecated Use fetchInstagram */
export function fetchInstagramGallery(locale = 'en') {
  return fetchInstagram(locale)
}

/** All published blogs (newest first). */
export function fetchBlogs(locale = 'en') {
  return api.get('/blogs', { locale }).then(unwrapList)
}

/** Latest blogs. `limit` is 1–20 (API default 5). */
export function fetchLatestBlogs(limit = 5, locale = 'en') {
  const safe = Math.min(20, Math.max(1, Number(limit) || 5))
  return api.get(`/blogs/latest?limit=${safe}`, { locale }).then(unwrapList)
}

/** Single published blog by slug. */
export function fetchBlogBySlug(slug, locale = 'en') {
  return api
    .get(`/blogs/${encodeURIComponent(slug)}`, { locale })
    .then(unwrapObject)
}

/**
 * Load all public homepage data in parallel (no /home).
 * Dedupes in-flight requests so React Strict Mode remounts reuse the same Promise.
 */
const siteContentPromises = new Map()

export function fetchSiteContent(locale = 'en') {
  const key = normalizeLocale(locale)
  let pending = siteContentPromises.get(key)

  if (!pending) {
    // Gallery section is hidden on Home — skip that request on the critical path.
    pending = Promise.all([
      fetchSettings(key),
      fetchFeatures(key),
      fetchLocations(key),
      fetchPrograms(key),
      fetchInstagram(key),
    ])
      .then(([settings, features, locations, programs, instagramFeed]) => ({
        settings,
        features,
        locations,
        programs,
        gallery: [],
        instagramFeed,
      }))
      .catch((error) => {
        siteContentPromises.delete(key)
        throw error
      })

    siteContentPromises.set(key, pending)
  }

  return pending
}

/** Submit contact form. Throws ApiError on 422 with field errors. */
export function submitContact(payload) {
  return api.post('/contact', payload, { skipLocale: true })
}

export { API_BASE_URL }
