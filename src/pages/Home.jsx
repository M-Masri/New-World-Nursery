import { lazy, Suspense } from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'

const AboutSection = lazy(() => import('../components/sections/AboutSection'))
const OurLocationSection = lazy(
  () => import('../components/sections/OurLocationSection'),
)
const ProgramsSection = lazy(
  () => import('../components/sections/ProgramsSection'),
)
const GalleryTestimonialsSection = lazy(
  () => import('../components/sections/GalleryTestimonialsSection'),
)
const InstagramFeedSection = lazy(
  () => import('../components/sections/InstagramFeedSection'),
)
const ContactSection = lazy(() => import('../components/sections/ContactSection'))
const NewsletterSection = lazy(
  () => import('../components/sections/NewsletterSection'),
)

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Suspense fallback={null}>
        <AboutSection />
        <OurLocationSection />
        <ProgramsSection />
        <GalleryTestimonialsSection />
        <InstagramFeedSection />
        <ContactSection />
        <NewsletterSection />
      </Suspense>
    </>
  )
}

export default Home
