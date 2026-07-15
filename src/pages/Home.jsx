import CloudScroll3D from '../component/CloudScroll3D'
import {
  HeroSection,
  FeaturesSection,
  AboutSection,
  OurLocationSection,
  ProgramsSection,
  InstagramFeedSection,
  GalleryTestimonialsSection,
  ContactSection,
  NewsletterSection,
} from '../component/home'

function Home() {
  return (
    <>
      <CloudScroll3D />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <OurLocationSection />
      <ProgramsSection />
      <InstagramFeedSection />
      <GalleryTestimonialsSection />
      <ContactSection />
      <NewsletterSection />
    </>
  )
}

export default Home
