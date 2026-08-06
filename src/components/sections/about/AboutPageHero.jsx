import aboutPageHero from '../../../assets/about-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — About-specific copy + image.
 */
function AboutPageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('our-story')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('about.heroEyebrow'),
        title: t('about.heroTitle'),
        titlePyramid: true,
        subtitle: t('about.heroSubtitle'),
        image: aboutPageHero,
        cta_primary: tourLabel,
        cta_secondary: t('about.heroCtaSecondary'),
      }}
    />
  )
}

export default AboutPageHero
