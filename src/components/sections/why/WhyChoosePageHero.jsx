import whyChoosePageHero from '../../../assets/why-choose-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Why Choose Us copy + image.
 */
function WhyChoosePageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('key-differentiators')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('why.heroEyebrow'),
        title: t('why.heroTitle'),
        titlePyramid: true,
        subtitle: t('why.heroSubtitle'),
        image: whyChoosePageHero,
        cta_primary: tourLabel,
        cta_secondary: t('why.heroCtaSecondary'),
      }}
    />
  )
}

export default WhyChoosePageHero
