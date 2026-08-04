import programsPageHero from '../../../assets/programs-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Programs-specific copy + image.
 */
function ProgramsPageHero() {
  const { settings } = useHomeData()
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
        title: 'Where Every Day\nBecomes a New Discovery',
        titlePyramid: true,
        subtitle:
          'Children understand the world by exploring it. At New World Nursery, every experience is thoughtfully designed to spark curiosity, inspire creativity and build the confidence to keep discovering — through the British EYFS curriculum and enriching learning experiences.',
        image: programsPageHero,
        cta_primary: tourLabel,
        cta_secondary: 'View Ages',
      }}
    />
  )
}

export default ProgramsPageHero
