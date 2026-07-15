import { CloudScroll3D } from '../components/ui'
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
} from '../components/sections'

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
