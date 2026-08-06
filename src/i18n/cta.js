import { useLanguage } from './LanguageContext'

const BUTTON_KEY_BY_EN = {
  'book a tour': 'common.bookTour',
  'enquire now': 'common.enquireNow',
  'enquire about a place': 'common.enquireAboutPlace',
  'discover our nursery': 'common.discoverNursery',
  'plan a visit': 'common.planAVisit',
  'send message': 'common.sendMessage',
  'view all blogs': 'common.viewAllBlogs',
  'read more': 'common.readMore',
  'our story': 'about.heroCtaSecondary',
  'view ages': 'programs.heroCtaSecondary',
  'see why': 'why.heroCtaSecondary',
  'read posts': 'blog.heroCtaSecondary',
  'browse photos': 'gallery.heroCtaSecondary',
  'our approach': 'philosophy.heroCtaSecondary',
  'see programmes': 'signature.heroCtaSecondary',
  'see programs': 'signature.heroCtaSecondary',
  'explore awards': 'awards.heroCtaSecondary',
  'explore programmes': 'signature.heroCtaSecondary',
}

/**
 * Prefer translated CTA in Arabic; otherwise API label, then locale fallback.
 */
export function useTourCtaLabel(...apiCandidates) {
  const { t, language } = useLanguage()
  if (language === 'ar') return t('common.bookTour')
  for (const value of apiCandidates) {
    const trimmed = typeof value === 'string' ? value.trim() : ''
    if (trimmed) return trimmed
  }
  return t('common.bookTour')
}

/**
 * Translate a known English button label when language is Arabic.
 */
export function translateButtonLabel(label, t, language) {
  if (!label) return label
  if (language !== 'ar') return label
  const key = BUTTON_KEY_BY_EN[String(label).trim().toLowerCase()]
  return key ? t(key) : label
}
