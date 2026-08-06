import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useHomeData } from '../../context/HomeDataContext'
import { isMobilePerf } from '../../lib/mobilePerf'

const WIGGLE_INTERVAL_MS = 28_000
const WIGGLE_DURATION_MS = 1200

function FeaturesSection() {
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)
  const wiggleTimeoutRef = useRef(null)
  const [isWiggling, setIsWiggling] = useState(false)
  const { features } = useHomeData()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || features.length === 0) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return undefined

    // Skip wiggle timers on mobile — saves main-thread work for PSI.
    if (isMobilePerf()) {
      return undefined
    }

    const clearWiggleTimers = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      if (wiggleTimeoutRef.current) {
        clearTimeout(wiggleTimeoutRef.current)
        wiggleTimeoutRef.current = null
      }

      setIsWiggling(false)
    }

    const triggerWiggle = () => {
      setIsWiggling(false)

      requestAnimationFrame(() => {
        setIsWiggling(true)
        wiggleTimeoutRef.current = setTimeout(() => {
          setIsWiggling(false)
        }, WIGGLE_DURATION_MS)
      })
    }

    const startWiggleLoop = () => {
      clearWiggleTimers()
      triggerWiggle()
      intervalRef.current = setInterval(triggerWiggle, WIGGLE_INTERVAL_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startWiggleLoop()
        else clearWiggleTimers()
      },
      { rootMargin: '40px', threshold: 0.05 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      clearWiggleTimers()
    }
  }, [features.length])

  if (features.length === 0) {
    return (
      <section
        id="why-us"
        className="min-h-[11rem] bg-[#f3ebe0] py-8 sm:min-h-[12rem] sm:py-10"
        aria-hidden="true"
      />
    )
  }

  return (
    <section id="why-us" ref={sectionRef} className="bg-[#f3ebe0] py-8 sm:py-10">
      <div
        className={`mx-auto grid max-w-page grid-cols-2 gap-5 page-gutter sm:grid-cols-2 sm:gap-7 ${
          features.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } lg:gap-0`}
      >
        {features.map((feature, index) => (
          <div
            key={feature.id ?? feature.title}
            className={`flex flex-col items-center px-2 text-center sm:px-4 ${
              index < features.length - 1
                ? 'lg:border-r lg:border-[#e8e2d8]'
                : ''
            }`}
          >
            <div
              className={`feature-icon-shell mb-3 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16 ${
                isWiggling ? 'feature-icon-wiggle' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                backgroundColor: feature.icon_color || '#c8e8d8',
              }}
            >
              {feature.icon_image ? (
                <img
                  src={feature.icon_image}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                />
              ) : (
                <Sparkles className="h-7 w-7 text-[#2d3a4a]" strokeWidth={1.6} />
              )}
            </div>
            <h3 className="mb-1.5 text-[13px] font-bold text-brand-ink sm:text-[15px]">
              {feature.title}
            </h3>
            <p className="max-w-[200px] text-[12px] leading-snug text-brand-muted sm:text-[13px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
