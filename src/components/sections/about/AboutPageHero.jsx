import aboutPageHero from '../../../assets/about-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — About-specific copy + image.
 */
function AboutPageHero() {
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
          .getElementById('our-story')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'About Us',
        title: 'Every Great Journey\nHas a Beginning',
        titlePyramid: true,
        subtitle:
          'New World Nursery was created with one purpose: to give children the strongest possible start in life. Drawing on over 16 years of educational experience and a well-established European network of nurseries and schools, we have brought our philosophy of child-centred, inclusive education to Dubai. Here, children are encouraged to explore, think, create and grow in an environment where they feel safe, respected and inspired every day.',
        image: aboutPageHero,
        cta_primary: tourLabel,
        cta_secondary: 'Our Story',
      }}
    />
  )
}

export default AboutPageHero
