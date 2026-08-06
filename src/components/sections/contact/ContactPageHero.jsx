import contactPageHero from '../../../assets/contact-page-hero.webp'
import { useLanguage } from '../../../i18n'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Contact-specific copy + image.
 */
function ContactPageHero() {
  const { t } = useLanguage()

  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('enquiry-form')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: t('contact.heroEyebrow'),
        title: t('contact.heroTitle'),
        titlePyramid: true,
        subtitle: t('contact.heroSubtitle'),
        image: contactPageHero,
        cta_primary: null,
        cta_secondary: null,
      }}
    />
  )
}

export default ContactPageHero
