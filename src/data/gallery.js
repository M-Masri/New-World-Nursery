import aboutKids from '../assets/about-kids.webp'
import heroKids from '../assets/hero-kids.webp'

export const GALLERY_FALLBACK_IMAGE = aboutKids

/** Normalize a gallery image from /api/gallery or nested category items. */
export function normalizeGalleryItem(raw, categoryOverride) {
  if (!raw || typeof raw !== 'object') return null

  const category = categoryOverride || raw.category

  return {
    id: raw.id,
    image: raw.image || GALLERY_FALLBACK_IMAGE,
    alt: (typeof raw.alt === 'string' && raw.alt.trim()) || '',
    sortOrder: raw.sort_order ?? 0,
    categorySlug: category?.slug || 'uncategorized',
    categoryName: category?.name || 'Gallery',
  }
}

/** Normalize /api/gallery/categories list (tabs + nested items). */
export function normalizeGalleryCategories(list) {
  if (!Array.isArray(list)) return []

  return list
    .map((category) => ({
      id: category.id,
      name: category.name || 'Gallery',
      slug: category.slug || String(category.id),
      sortOrder: category.sort_order ?? 0,
      items: (category.items || [])
        .map((item) => normalizeGalleryItem(item, category))
        .filter(Boolean),
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

/** Flatten categories into one list (preserves category on each item). */
export function flattenGalleryCategories(categories) {
  const seen = new Set()
  const flat = []

  for (const category of categories) {
    for (const item of category.items) {
      const key = item.id ?? item.image
      if (seen.has(key)) continue
      seen.add(key)
      flat.push(item)
    }
  }

  return flat.sort((a, b) => a.sortOrder - b.sortOrder)
}

/** Normalize /api/instagram posts. */
export function normalizeInstagramPosts(list) {
  if (!Array.isArray(list)) return []

  return list
    .map((post) => ({
      id: post.id,
      image: post.image,
      alt: (typeof post.alt === 'string' && post.alt.trim()) || '',
      permalink: post.permalink || null,
      sortOrder: post.sort_order ?? 0,
    }))
    .filter((post) => Boolean(post.image))
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export const FALLBACK_GALLERY_CATEGORIES = [
  {
    id: 'f-cat-1',
    name: 'Moments of Joy',
    slug: 'moments-of-joy',
    sortOrder: 1,
    items: [
      {
        id: 'f1',
        image: aboutKids,
        alt: 'Children smiling at nursery',
        sortOrder: 1,
        categorySlug: 'moments-of-joy',
        categoryName: 'Moments of Joy',
      },
      {
        id: 'f4',
        image: heroKids,
        alt: 'Everyday nursery moments',
        sortOrder: 2,
        categorySlug: 'moments-of-joy',
        categoryName: 'Moments of Joy',
      },
    ],
  },
  {
    id: 'f-cat-2',
    name: 'Classroom',
    slug: 'classroom',
    sortOrder: 2,
    items: [
      {
        id: 'f2',
        image: heroKids,
        alt: 'Classroom play and discovery',
        sortOrder: 1,
        categorySlug: 'classroom',
        categoryName: 'Classroom',
      },
      {
        id: 'f5',
        image: aboutKids,
        alt: 'Learning through play indoors',
        sortOrder: 2,
        categorySlug: 'classroom',
        categoryName: 'Classroom',
      },
    ],
  },
  {
    id: 'f-cat-3',
    name: 'Outdoors',
    slug: 'outdoors',
    sortOrder: 3,
    items: [
      {
        id: 'f3',
        image: aboutKids,
        alt: 'Outdoor play in the sunshine',
        sortOrder: 1,
        categorySlug: 'outdoors',
        categoryName: 'Outdoors',
      },
    ],
  },
]
