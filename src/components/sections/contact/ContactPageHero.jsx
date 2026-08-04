import contactPageHero from '../../../assets/contact-page-hero.webp'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Contact-specific copy + image.
 */
function ContactPageHero() {
  return (
    <HeroSection
      imageFetchPriority="high"
      onSecondaryClick={() => {
        document
          .getElementById('enquiry-form')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Contact / Enquire',
        title: "New World Get In Touch\nWe'd Love To Meet You",
        titlePyramid: true,
        subtitle:
          'Ask about enrolment, tours, or our branches — our team will get back to you with a warm reply.',
        image: contactPageHero,
        cta_primary: null,
        cta_secondary: null,
      }}
    />
  )
}

export default ContactPageHero
