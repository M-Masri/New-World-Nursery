import aboutKids from '../assets/about-kids.webp'
import logo from '../assets/logo.png'

export const BLOG_FALLBACK_IMAGE = aboutKids

export const DEFAULT_BLOG_AUTHOR = {
  name: 'New World Nursery',
  role: 'Educators & Care Team',
  bio: 'A warm, play-based nursery in Al Barsha. We share gentle tips, classroom moments, and guidance for families growing with us.',
  avatar: logo,
}

/** Strip HTML tags for word counts / plain excerpts. */
export function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function estimateReadMinutes(htmlOrText) {
  const words = stripHtml(htmlOrText).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200) || 1)
}

/**
 * Normalize API blog payload to the shape used by blog UI.
 */
export function normalizeBlogPost(raw) {
  if (!raw || typeof raw !== 'object') return null

  const content = raw.content ?? ''
  const excerpt =
    (typeof raw.excerpt === 'string' && raw.excerpt.trim()) ||
    stripHtml(content).slice(0, 160)

  return {
    id: raw.id,
    title: raw.title || 'Untitled',
    slug: raw.slug || '',
    excerpt,
    content,
    image: raw.image || BLOG_FALLBACK_IMAGE,
    publishedAt: raw.published_at || raw.publishedAt || null,
    readMinutes: estimateReadMinutes(content || excerpt),
    author: DEFAULT_BLOG_AUTHOR,
  }
}

export function normalizeBlogPosts(list) {
  if (!Array.isArray(list)) return []
  return list.map(normalizeBlogPost).filter(Boolean)
}

export function formatBlogDate(isoDate) {
  if (!isoDate) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

export function formatBlogDateShort(isoDate) {
  if (!isoDate) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

export function formatTimeAgo(isoDate) {
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) return ''
  const days = Math.max(0, Math.floor((Date.now() - then) / 86400000))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1) return '1 month ago'
  return `${months} months ago`
}
