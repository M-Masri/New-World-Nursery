import { useEffect, useRef, useState } from 'react'
import handshakeLottie from '../../assets/lottie/handshake.json'
import shieldLottie from '../../assets/lottie/shield.json'
import slideLottie from '../../assets/lottie/slide.json'
import successLottie from '../../assets/lottie/success.json'
import teacherLottie from '../../assets/lottie/teacher.json'
import { ScrollTrigger } from '../../lib/gsap'
import LottieScroll from '../ui/LottieScroll'

const WIGGLE_INTERVAL_MS = 20_000
const WIGGLE_DURATION_MS = 900

const features = [
  {
    lottie: shieldLottie,
    title: 'Safe & Secure',
    description: "Your child's safety and well-being is our top priority.",
    iconBg: 'bg-[#c8e8d8]',
  },
  {
    lottie: teacherLottie,
    title: 'Qualified Educators',
    description: 'Experienced and passionate teachers who care.',
    iconBg: 'bg-[#f5d5c0]',
  },
  {
    lottie: slideLottie,
    title: 'Play-based Learning',
    description: 'Learning through play, exploration and discovery.',
    iconBg: 'bg-[#f3e4a8]',
  },
  {
    lottie: successLottie,
    title: 'Holistic Development',
    description:
      'Focusing on social, emotional, cognitive and physical growth.',
    iconBg: 'bg-[#ddd0ee]',
  },
  {
    lottie: handshakeLottie,
    title: 'Strong Parent Partnership',
    description: "Working together for your child's bright future.",
    iconBg: 'bg-[#c8e3ee]',
  },
]

function FeaturesSection() {
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)
  const wiggleTimeoutRef = useRef(null)
  const [isWiggling, setIsWiggling] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

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

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: ({ isActive }) => {
        if (isActive) startWiggleLoop()
        else clearWiggleTimers()
      },
    })

    if (scrollTrigger.isActive) {
      startWiggleLoop()
    }

    return () => {
      scrollTrigger.kill()
      clearWiggleTimers()
    }
  }, [])

  return (
    <section id="why-us" ref={sectionRef} className="bg-[#f3ebe0] py-12">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col items-center px-4 text-center ${
              index < features.length - 1
                ? 'lg:border-r lg:border-[#e8e2d8]'
                : ''
            }`}
          >
            <div
              className={`feature-icon-shell mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full ${feature.iconBg} ${
                isWiggling ? 'feature-icon-wiggle' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {feature.lottie ? (
                <LottieScroll
                  animationData={feature.lottie}
                  triggerRef={sectionRef}
                  mode="playWhileInView"
                  speed={0.85}
                  className="h-12 w-12"
                />
              ) : (
                <feature.icon
                  className="h-8 w-8 text-[#2d3a4a]"
                  strokeWidth={1.6}
                />
              )}
            </div>
            <h3 className="mb-2 text-[15px] font-bold text-[#2d3a4a]">
              {feature.title}
            </h3>
            <p className="max-w-[200px] text-[13px] leading-relaxed text-[#4a5568]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
