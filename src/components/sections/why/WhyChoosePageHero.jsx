import aboutKids from '../../../assets/about-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Why Choose Us copy + image.
 */
function WhyChoosePageHero() {
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
          .getElementById('key-differentiators')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Why Choose Us',
        title: 'New World\nWhy Families\nChoose Us Daily',
        titlePyramid: true,
        subtitle:
          'Warm care, play with purpose, and a close parent partnership — right here in Al Barsha.',
        image,
        cta_primary: tourLabel,
        cta_secondary: 'See Why',
      }}
    />
  )
}

export default WhyChoosePageHero
