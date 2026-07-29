import aboutKids from '../../../assets/about-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Blog-specific copy + image.
 */
function BlogPageHero() {
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
          .getElementById('blog-posts')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Blog',
        title: 'New World\nNursery Stories\n& Little Moments',
        titlePyramid: true,
        subtitle:
          'Classroom moments, settling tips, and warm notes for families growing with us.',
        image,
        cta_primary: tourLabel,
        cta_secondary: 'Read Posts',
      }}
    />
  )
}

export default BlogPageHero
