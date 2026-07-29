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

async function request(endpoint, options = {}) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${path}`

  const { headers: optionHeaders, body, ...rest } = options

  const config = {
    ...rest,
    headers: {
      Accept: 'application/json',
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

export function fetchSettings() {
  return api.get('/settings').then(unwrapObject)
}

export function fetchFeatures() {
  return api.get('/features').then(unwrapList)
}

export function fetchLocations() {
  return api.get('/locations').then(unwrapList)
}

export function fetchPrograms() {
  return api.get('/programs').then(unwrapList)
}

/** All gallery images (optional category slug or id). */
export function fetchGallery(category) {
  const query =
    category && category !== 'all'
      ? `?category=${encodeURIComponent(category)}`
      : ''
  return api.get(`/gallery${query}`).then(unwrapList)
}

/** Categories with nested gallery images — best for tabs/filters UI. */
export function fetchGalleryCategories() {
  return api.get('/gallery/categories').then(unwrapList)
}

/** Single category and its images by slug. */
export function fetchGalleryCategoryBySlug(slug) {
  return api
    .get(`/gallery/categories/${encodeURIComponent(slug)}`)
    .then(unwrapObject)
}

/** Synced Instagram posts (separate from gallery images). */
export function fetchInstagram() {
  return api.get('/instagram').then(unwrapList)
}

/** @deprecated Use fetchInstagram */
export function fetchInstagramGallery() {
  return fetchInstagram()
}

/** All published blogs (newest first). */
export function fetchBlogs() {
  return api.get('/blogs').then(unwrapList)
}

/** Latest blogs. `limit` is 1–20 (API default 5). */
export function fetchLatestBlogs(limit = 5) {
  const safe = Math.min(20, Math.max(1, Number(limit) || 5))
  return api.get(`/blogs/latest?limit=${safe}`).then(unwrapList)
}

/** Single published blog by slug. */
export function fetchBlogBySlug(slug) {
  return api.get(`/blogs/${encodeURIComponent(slug)}`).then(unwrapObject)
}

/**
 * Load all public homepage data in parallel (no /home).
 * Dedupes in-flight requests so React Strict Mode remounts reuse the same Promise.
 */
let siteContentPromise = null

export function fetchSiteContent() {
  if (!siteContentPromise) {
    // Gallery section is hidden on Home — skip that request on the critical path.
    siteContentPromise = Promise.all([
      fetchSettings(),
      fetchFeatures(),
      fetchLocations(),
      fetchPrograms(),
      fetchInstagram(),
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
        siteContentPromise = null
        throw error
      })
  }

  return siteContentPromise
}

/** Submit contact form. Throws ApiError on 422 with field errors. */
export function submitContact(payload) {
  return api.post('/contact', payload)
}

export { API_BASE_URL }
