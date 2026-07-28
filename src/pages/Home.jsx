import { lazy, Suspense, useEffect, useRef, useState } from 'react'
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

const LOADER_FADE_MS = 160

/**
 * Mount heavy below-fold chunks only when near the viewport.
 * Reserve height so mounting doesn't shove the footer (CLS).
 */
function DeferredSection({ children, rootMargin = '280px', minHeight = '24rem' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || active) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setActive(true)
        observer.disconnect()
      },
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [active, rootMargin])

  return (
    <div ref={ref} style={active ? undefined : { minHeight }}>
      {active ? children : null}
    </div>
  )
}

function HeroShell() {
  return (
    <section
      className="relative min-h-[28rem] overflow-hidden bg-white sm:min-h-[32rem] lg:min-h-[36rem]"
      aria-hidden="true"
    />
  )
}

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

      {isLoading ? (
        <HeroShell />
      ) : (
        <>
          <HeroSection />
          <FeaturesSection />
          <DeferredSection minHeight="28rem">
            <Suspense fallback={null}>
              <AboutSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection minHeight="32rem">
            <Suspense fallback={null}>
              <OurLocationSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection minHeight="36rem">
            <Suspense fallback={null}>
              <ProgramsSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection minHeight="28rem">
            <Suspense fallback={null}>
              <InstagramFeedSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection minHeight="36rem">
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection minHeight="16rem">
            <Suspense fallback={null}>
              <NewsletterSection />
            </Suspense>
          </DeferredSection>
        </>
      )}
    </>
  )
}

export default Home
