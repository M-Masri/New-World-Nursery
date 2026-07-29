import aboutKids from '../../../assets/about-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Gallery-specific copy + image.
 */
function GalleryPageHero() {
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
          .getElementById('gallery-grid')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Gallery',
        title: 'New World\nLittle Moments\nWorth Remembering',
        titlePyramid: true,
        subtitle:
          'A peek into our classrooms, outdoor play, and the everyday joy that fills New World Nursery.',
        image,
        cta_primary: tourLabel,
        cta_secondary: 'Browse Photos',
      }}
    />
  )
}

export default GalleryPageHero
