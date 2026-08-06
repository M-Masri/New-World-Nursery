import programsPageHero from '../../../assets/programs-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Programs-specific copy + image.
 */
function ProgramsPageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('age-groups')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('programs.heroEyebrow'),
        title: t('programs.heroTitle'),
        titlePyramid: true,
        subtitle: t('programs.heroSubtitle'),
        image: programsPageHero,
        cta_primary: tourLabel,
        cta_secondary: t('programs.heroCtaSecondary'),
      }}
    />
  )
}

export default ProgramsPageHero
