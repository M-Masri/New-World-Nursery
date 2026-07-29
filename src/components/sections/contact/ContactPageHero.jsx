import aboutKids from '../../../assets/about-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import HeroSection from '../HeroSection'

/**
 * Same layout as the homepage hero — Contact-specific copy + image.
 */
function ContactPageHero() {
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
          .getElementById('enquiry-form')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      override={{
        eyebrow: 'Contact / Enquire',
        title: "New World Get In Touch\nWe'd Love To Meet You",
        titlePyramid: true,
        subtitle:
          'Ask about enrolment, tours, or our branches — our team will get back to you with a warm reply.',
        image,
        cta_primary: tourLabel,
        cta_secondary: 'Send a Message',
      }}
    />
  )
}

export default ContactPageHero
