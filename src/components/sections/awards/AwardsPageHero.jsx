import awardsHero from '../../../assets/awards-network-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Awards & Network page hero.
 */
function AwardsPageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('awards-accreditations')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('awards.heroEyebrow'),
        title: t('awards.heroTitle'),
        titlePyramid: true,
        subtitle: t('awards.heroSubtitle'),
        image: awardsHero,
        cta_primary: tourLabel,
        cta_secondary: t('awards.heroCtaSecondary'),
      }}
    />
  )
}

export default AwardsPageHero
