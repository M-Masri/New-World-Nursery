import signaturePageHero from '../../../assets/signature-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Signature Programs page hero.
 */
function SignaturePageHero() {
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
          .getElementById('signature-showcase')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Signature programmes',
        title: 'Nurturing the\nCreator Mindset',
        titlePyramid: true,
        subtitle:
          'Our Signature Programmes go beyond traditional early years education. They encourage children to ask questions, think logically, explore ideas, build with purpose and solve problems through meaningful experiences — nurturing the confidence and creativity that help children become future innovators, leaders and creators.',
        image: signaturePageHero,
        cta_primary: tourLabel,
        cta_secondary: 'See Programmes',
      }}
    />
  )
}

export default SignaturePageHero
