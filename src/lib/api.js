const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://new-world-nursery.test/api'
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

/** Full homepage payload: settings + features + locations + programs + gallery */
export function fetchHome() {
  return api.get('/home')
}

/** Submit contact form. Throws ApiError on 422 with field errors. */
export function submitContact(payload) {
  return api.post('/contact', payload)
}

export { API_BASE_URL }
