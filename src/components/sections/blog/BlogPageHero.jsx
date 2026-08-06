import blogPageHero from '../../../assets/blog-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Blog-specific copy + image.
 */
function BlogPageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('blog-posts')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('blog.heroEyebrow'),
        title: t('blog.heroTitle'),
        titlePyramid: true,
        subtitle: t('blog.heroSubtitle'),
        image: blogPageHero,
        cta_primary: tourLabel,
        cta_secondary: t('blog.heroCtaSecondary'),
      }}
    />
  )
}

export default BlogPageHero
