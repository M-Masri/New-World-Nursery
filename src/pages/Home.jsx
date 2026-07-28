import { lazy, Suspense, useEffect, useState } from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HomePageLoader from '../components/ui/HomePageLoader'
import { useHomeData } from '../context/HomeDataContext'

const AboutSection = lazy(() => import('../components/sections/AboutSection'))
const OurLocationSection = lazy(
  () => import('../components/sections/OurLocationSection'),
)
const ProgramsSection = lazy(
  () => import('../components/sections/ProgramsSection'),
)
const InstagramFeedSection = lazy(
  () => import('../components/sections/InstagramFeedSection'),
)
const ContactSection = lazy(() => import('../components/sections/ContactSection'))
const NewsletterSection = lazy(
  () => import('../components/sections/NewsletterSection'),
)

const LOADER_FADE_MS = 480

function Home() {
  const { isLoading } = useHomeData()
  const [showLoader, setShowLoader] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true)
      setFading(false)
      return undefined
    }

    setFading(true)
    const timer = window.setTimeout(() => {
      setShowLoader(false)
      setFading(false)
    }, LOADER_FADE_MS)

    return () => window.clearTimeout(timer)
  }, [isLoading])

  useEffect(() => {
    if (!showLoader) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [showLoader])

  return (
    <>
      {showLoader ? <HomePageLoader fading={fading} /> : null}

      {!isLoading ? (
        <>
          <HeroSection />
          <FeaturesSection />
          <Suspense fallback={null}>
            <AboutSection />
            <OurLocationSection />
            <ProgramsSection />
            <InstagramFeedSection />
            <ContactSection />
            <NewsletterSection />
          </Suspense>
        </>
      ) : null}
    </>
  )
}

export default Home
