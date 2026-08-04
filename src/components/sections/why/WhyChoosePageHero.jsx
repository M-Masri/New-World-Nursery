import whyChoosePageHero from '../../../assets/why-choose-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Why Choose Us copy + image.
 */
function WhyChoosePageHero() {
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
          .getElementById('key-differentiators')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Why Choose Us',
        title: 'Choosing the Right Nursery\nChanges Everything',
        titlePyramid: true,
        subtitle:
          'Every family wants more than excellent education. They want a place where their child feels safe, understood and inspired to grow. At New World Nursery, that confidence comes from years of experience, internationally recognised educational standards and a philosophy that always puts children first.',
        image: whyChoosePageHero,
        cta_primary: tourLabel,
        cta_secondary: 'See Why',
      }}
    />
  )
}

export default WhyChoosePageHero
