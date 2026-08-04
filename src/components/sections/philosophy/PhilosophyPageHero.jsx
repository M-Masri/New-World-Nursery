import philosophyPageHero from '../../../assets/philosophy-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Learning Philosophy page hero.
 */
function PhilosophyPageHero() {
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
          .getElementById('educational-approach')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Learning philosophy',
        title: 'Protecting Curiosity.\nInspiring Growth.',
        titlePyramid: true,
        subtitle:
          'Children are naturally curious. They learn by asking questions, exploring, experimenting and making sense of the world around them. At New World Nursery, our role is not to rush childhood, but to nurture each child’s natural desire to discover, understand and grow with confidence, joy and purpose.',
        image: philosophyPageHero,
        cta_primary: tourLabel,
        cta_secondary: 'Our Approach',
      }}
    />
  )
}

export default PhilosophyPageHero
