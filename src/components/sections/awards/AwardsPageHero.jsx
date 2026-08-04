import awardsHero from '../../../assets/awards-network-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Awards & Network page hero.
 */
function AwardsPageHero() {
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
          .getElementById('awards-accreditations')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Awards & Network',
        title: 'Built on Trust.\nGrowing Together.',
        titlePyramid: true,
        subtitle:
          'For more than 16 years, our educational journey has been shaped by experience, innovation and a commitment to excellence in early childhood education. Today, we are proud to bring this European heritage to Dubai, where it meets the values, culture and aspirations of the United Arab Emirates.',
        image: awardsHero,
        cta_primary: tourLabel,
        cta_secondary: 'Explore Awards',
      }}
    />
  )
}

export default AwardsPageHero
