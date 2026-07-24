import { useEffect, useRef, useState } from 'react'
import {
  Handshake,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react'
import LottieScroll from '../ui/LottieScroll'

const WIGGLE_INTERVAL_MS = 28_000
const WIGGLE_DURATION_MS = 1200

const features = [
  {
    animationImport: () => import('../../assets/lottie/shield.json'),
    Icon: ShieldCheck,
    title: 'Safe & Secure',
    description:
      'Supervised spaces and clear routines so families feel at ease every day.',
    iconBg: 'bg-[#c8e8d8]',
  },
  {
    animationImport: () => import('../../assets/lottie/teacher.json'),
    Icon: Users,
    title: 'Caring Educators',
    description:
      'Warm, experienced teachers who know each child by name and pace.',
    iconBg: 'bg-[#f5d5c0]',
  },
  {
    animationImport: () => import('../../assets/lottie/slide.json'),
    Icon: Sparkles,
    title: 'Play-based Learning',
    description:
      'Hands-on play that builds language, curiosity, and early skills.',
    iconBg: 'bg-[#f3e4a8]',
  },
  {
    animationImport: () => import('../../assets/lottie/success.json'),
    Icon: Sprout,
    title: 'Whole-Child Growth',
    description:
      'Social, emotional, cognitive, and physical development in balance.',
    iconBg: 'bg-[#ddd0ee]',
  },
  {
    animationImport: () => import('../../assets/lottie/handshake.json'),
    Icon: Handshake,
    title: 'Parent Partnership',
    description:
      'Open updates and shared goals so home and nursery stay aligned.',
    iconBg: 'bg-[#c8e3ee]',
  },
]

function FeaturesSection() {
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)
  const wiggleTimeoutRef = useRef(null)
  const [isWiggling, setIsWiggling] = useState(false)
  const [preferStaticIcons, setPreferStaticIcons] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setPreferStaticIcons(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion || preferStaticIcons) return undefined

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
  }, [preferStaticIcons])

  return (
    <section id="why-us" ref={sectionRef} className="bg-[#f3ebe0] py-8 sm:py-10">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-7 page-gutter sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
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
              className={`feature-icon-shell mb-3 flex h-16 w-16 items-center justify-center rounded-full ${feature.iconBg} ${
                isWiggling ? 'feature-icon-wiggle' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {preferStaticIcons ? (
                <feature.Icon className="h-7 w-7 text-[#2d3a4a]" strokeWidth={1.6} />
              ) : (
                <LottieScroll
                  animationImport={feature.animationImport}
                  triggerRef={sectionRef}
                  mode="playWhileInView"
                  speed={0.55}
                  className="h-10 w-10"
                />
              )}
            </div>
            <h3 className="mb-1.5 text-[15px] font-bold text-brand-ink">
              {feature.title}
            </h3>
            <p className="max-w-[200px] text-[13px] leading-snug text-brand-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
