import philosophyPageHero from '../../../assets/philosophy-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Learning Philosophy page hero.
 */
function PhilosophyPageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('educational-approach')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('philosophy.heroEyebrow'),
        title: t('philosophy.heroTitle'),
        titlePyramid: true,
        subtitle: t('philosophy.heroSubtitle'),
        image: philosophyPageHero,
        cta_primary: tourLabel,
        cta_secondary: t('philosophy.heroCtaSecondary'),
      }}
    />
  )
}

export default PhilosophyPageHero
