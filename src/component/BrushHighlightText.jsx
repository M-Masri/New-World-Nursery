import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export const ENQUIRE_CORAL = '#f07a7a'

const BRUSH_HIGHLIGHT_PATH =
  'M 2 49 C 24 52, 46 44, 70 49 C 94 54, 116 45, 140 50 C 164 55, 186 46, 210 51 C 234 56, 256 47, 280 52 C 296 54, 305 50, 310 48 L 308 5 C 286 2, 264 9, 240 4 C 216 -1, 194 8, 170 3 C 146 -2, 124 7, 100 2 C 76 -3, 54 6, 30 2 C 16 0, 6 3, 2 5 Z'

function BrushHighlightText({ children, triggerRef, className = '', textColor = '#2d3a4a' }) {
  const brushFillRef = useRef(null)
  const titleTextRef = useRef(null)
  const hasDrawnRef = useRef(false)

  useEffect(() => {
    const section = triggerRef?.current
    const brushFill = brushFillRef.current
    const titleText = titleTextRef.current
    if (!section || !brushFill || !titleText) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealBrush = () => {
      if (hasDrawnRef.current) return
      hasDrawnRef.current = true

      if (prefersReducedMotion) {
        gsap.set(brushFill, { clipPath: 'inset(0% 0 0 0)' })
        gsap.set(titleText, { color: '#ffffff' })
        return
      }

      gsap.set(titleText, { color: textColor })

      gsap
        .timeline({ defaults: { ease: 'power2.inOut' } })
        .fromTo(
          brushFill,
          { clipPath: 'inset(90% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.4 },
        )
        .fromTo(
          titleText,
          { color: textColor },
          { color: '#ffffff', duration: 0.6, ease: 'power2.out' },
          0.55,
        )
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: revealBrush,
    })

    ScrollTrigger.refresh()

    if (scrollTrigger.isActive) {
      revealBrush()
    }

    return () => {
      scrollTrigger.kill()
      gsap.killTweensOf([brushFill, titleText])
      hasDrawnRef.current = false
    }
  }, [triggerRef, textColor])

  return (
    <span className="about-title-highlight">
      <span ref={brushFillRef} className="about-title-brush-fill" aria-hidden="true">
        <svg className="about-title-brush" viewBox="0 0 312 52" preserveAspectRatio="none">
          <path d={BRUSH_HIGHLIGHT_PATH} fill={ENQUIRE_CORAL} />
        </svg>
      </span>
      <span ref={titleTextRef} className={`about-title-highlight__text ${className}`.trim()}>
        {children}
      </span>
    </span>
  )
}

export default BrushHighlightText
