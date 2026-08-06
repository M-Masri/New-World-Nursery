import signaturePageHero from '../../../assets/signature-page-hero.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useLanguage, useTourCtaLabel } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Signature Programs page hero.
 */
function SignaturePageHero() {
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const tourLabel = useTourCtaLabel(settings?.hero?.cta_primary, settings?.about?.cta)

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('signature-showcase')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('signature.heroEyebrow'),
        title: t('signature.heroTitle'),
        titlePyramid: true,
        subtitle: t('signature.heroSubtitle'),
        image: signaturePageHero,
        cta_primary: tourLabel,
        cta_secondary: t('signature.heroCtaSecondary'),
      }}
    />
  )
}

export default SignaturePageHero
