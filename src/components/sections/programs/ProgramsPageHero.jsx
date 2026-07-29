import aboutKids from '../../../assets/about-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Our Programs copy + image.
 */
function ProgramsPageHero() {
  const { settings } = useHomeData()
  const image = settings?.about?.image || aboutKids
  const tourLabel =
    settings?.hero?.cta_primary?.trim() ||
    settings?.about?.cta?.trim() ||
    'Book a Tour'

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('age-groups')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Our Programs',
        title: 'New World\nLearning Paths\nFor Every Little Age',
        titlePyramid: true,
        subtitle:
          'From first steps to school readiness — warm, play-based programmes shaped for how young children grow.',
        image,
        cta_primary: tourLabel,
        cta_secondary: 'View Ages',
      }}
    />
  )
}

export default ProgramsPageHero
