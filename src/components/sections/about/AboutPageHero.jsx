import aboutKids from '../../../assets/about-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — About-specific copy + image.
 */
function AboutPageHero() {
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
          .getElementById('our-story')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'About Us',
        title: 'New World Nursery \nWhere Little Hearts Grow',
        titlePyramid: true,
        subtitle:
          'Meet the warm, play-based nursery in Al Barsha where curious minds feel safe to explore, laugh, and learn.',
        image,
        cta_primary: tourLabel,
        cta_secondary: 'Our Story',
      }}
    />
  )
}

export default AboutPageHero
