import { useEffect, useMemo, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import {
  FALLBACK_GALLERY_CATEGORIES,
  flattenGalleryCategories,
  normalizeGalleryCategories,
} from '../../../data/gallery'
import { fetchGalleryCategories } from '../../../lib/api'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LazyImage from '../../ui/LazyImage'

/**
 * Category filters + photo grid from /api/gallery/categories.
 */
function GalleryFiltersGridSection() {
  const sectionRef = useRef(null)
  const { t, language } = useLanguage()
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading')
  const [active, setActive] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  useEffect(() => {
    let cancelled = false

    fetchGalleryCategories(language)
      .then((list) => {
        if (cancelled) return
        const next = normalizeGalleryCategories(list)
        setCategories(next.length > 0 ? next : FALLBACK_GALLERY_CATEGORIES)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setCategories(FALLBACK_GALLERY_CATEGORIES)
        setStatus('ready')
      })

    return () => {
      cancelled = true
    }
  }, [language])

  useEffect(() => {
    setActive('all')
  }, [language])

  const tabs = useMemo(() => {
    const withItems = categories.filter((cat) => cat.items.length > 0)
    return [{ slug: 'all', name: t('gallery.all') }, ...withItems]
  }, [categories, t])

  const filtered = useMemo(() => {
    if (active === 'all') return flattenGalleryCategories(categories)
    const match = categories.find((cat) => cat.slug === active)
    return match?.items ?? []
  }, [categories, active])

  const slides = useMemo(
    () =>
      filtered.map((item, index) => ({
        src: item.image,
        alt:
          item.alt ||
          `Gallery ${item.categoryName || 'photo'} ${index + 1}`,
      })),
    [filtered],
  )

  useEffect(() => {
    setLightboxIndex(-1)
  }, [active])

  return (
    <section
      id="gallery-grid"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="gallery-grid-heading"
    >
      <svg
        className="pointer-events-none absolute top-14 left-8 h-7 w-7 text-[#f5c842] opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>
      <svg
        className="pointer-events-none absolute right-10 bottom-24 h-6 w-6 text-[#f4a0b0] opacity-35"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z" />
      </svg>

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-8 text-center sm:mb-10">
          <p className="section-eyebrow">{t('gallery.gridEyebrow')}</p>
          <h2
            id="gallery-grid-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('gallery.gridTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('gallery.gridTitleHighlight')}
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-muted">
            {t('gallery.gridLead')}
          </p>
        </div>

        {tabs.length > 1 ? (
          <div
            className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            role="tablist"
            aria-label={t('gallery.categoriesAria')}
          >
            {tabs.map((cat) => {
              const isActive = active === cat.slug
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat.slug)}
                  className={`rounded-full px-4 py-2 text-xs font-extrabold tracking-wide uppercase transition sm:px-5 sm:text-[13px] ${
                    isActive
                      ? 'bg-[#5bb5a2] text-white shadow-md shadow-[#5bb5a2]/25'
                      : 'bg-[#faf7f2] text-brand-muted hover:bg-[#eef8f5] hover:text-[#5bb5a2]'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        ) : null}

        {status === 'loading' ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] animate-pulse rounded-[1.25rem] bg-[#eef8f5] sm:rounded-[1.5rem]"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-brand-muted">
            {t('gallery.empty')}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {filtered.map((item, index) => {
              const label =
                item.alt ||
                `Gallery ${item.categoryName || 'photo'} ${index + 1}`

              return (
                <button
                  key={item.id ?? `${item.image}-${index}`}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative overflow-hidden rounded-[1.25rem] bg-[#eef8f5] text-left shadow-[0_8px_24px_rgba(45,58,74,0.06)] outline-none transition hover:shadow-[0_14px_32px_rgba(45,58,74,0.1)] focus-visible:ring-2 focus-visible:ring-[#5bb5a2]/40 sm:rounded-[1.5rem]"
                >
                  <LazyImage
                    src={item.image}
                    alt={label}
                    eager={index < 4}
                    width={600}
                    height={450}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="aspect-[4/3] w-full"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="pointer-events-none absolute right-3 bottom-3 left-3 translate-y-2 text-xs font-bold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {item.categoryName}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'rgba(45, 58, 74, 0.88)' },
        }}
      />
    </section>
  )
}

export default GalleryFiltersGridSection
