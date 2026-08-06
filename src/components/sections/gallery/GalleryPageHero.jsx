import galleryPageHero from '../../../assets/gallery-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Gallery-specific copy + image.
 */
function GalleryPageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('gallery-grid')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('gallery.heroEyebrow'),
        title: t('gallery.heroTitle'),
        titlePyramid: true,
        subtitle: t('gallery.heroSubtitle'),
        image: galleryPageHero,
        cta_primary: tourLabel,
        cta_secondary: t('gallery.heroCtaSecondary'),
      }}
    />
  )
}

export default GalleryPageHero
