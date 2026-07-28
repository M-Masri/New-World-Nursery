import { useEffect, useRef } from 'react'
import { isMobilePerf } from '../../lib/mobilePerf'

export const BRAND_HIGHLIGHT = '#5bb5a2'

const BRUSH_HIGHLIGHT_PATH =
  'M 2 49 C 24 52, 46 44, 70 49 C 94 54, 116 45, 140 50 C 164 55, 186 46, 210 51 C 234 56, 256 47, 280 52 C 296 54, 305 50, 310 48 L 308 5 C 286 2, 264 9, 240 4 C 216 -1, 194 8, 170 3 C 146 -2, 124 7, 100 2 C 76 -3, 54 6, 30 2 C 16 0, 6 3, 2 5 Z'

/**
 * Same brush wipe for every section (Locations, Programs, …).
 * Uses IntersectionObserver so scroll timing stays consistent.
 * Mobile: instant reveal (no GSAP chunk).
 */
function BrushHighlightText({
  children,
  triggerRef,
  className = '',
  textColor = '#2d3a4a',
  onReveal,
  onComplete,
}) {
  const brushFillRef = useRef(null)
  const titleTextRef = useRef(null)
  const hasDrawnRef = useRef(false)
  const onRevealRef = useRef(onReveal)
  const onCompleteRef = useRef(onComplete)
  onRevealRef.current = onReveal
  onCompleteRef.current = onComplete

  useEffect(() => {
    const section = triggerRef?.current
    const brushFill = brushFillRef.current
    const titleText = titleTextRef.current
    if (!section || !brushFill || !titleText) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const skipAnim = prefersReducedMotion || isMobilePerf()

    let cancelled = false
    let gsap = null

    const finish = () => {
      brushFill.style.willChange = 'auto'
      titleText.style.willChange = 'auto'
      onCompleteRef.current?.()
    }

    const revealInstant = () => {
      if (hasDrawnRef.current) return
      hasDrawnRef.current = true
      onRevealRef.current?.()
      brushFill.style.clipPath = 'inset(0% 0 0 0)'
      titleText.style.color = '#ffffff'
      finish()
    }

    const revealBrush = async () => {
      if (hasDrawnRef.current) return

      if (skipAnim) {
        revealInstant()
        return
      }

      hasDrawnRef.current = true
      onRevealRef.current?.()

      try {
        const mod = await import('../../lib/gsap')
        if (cancelled) return
        gsap = mod.gsap
      } catch {
        brushFill.style.clipPath = 'inset(0% 0 0 0)'
        titleText.style.color = '#ffffff'
        finish()
        return
      }

      brushFill.style.willChange = 'clip-path'
      titleText.style.willChange = 'color'
      gsap.set(titleText, { color: textColor })

      gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: finish,
        })
        .fromTo(
          brushFill,
          { clipPath: 'inset(90% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.8 },
        )
        .fromTo(
          titleText,
          { color: textColor },
          { color: '#ffffff', duration: 0.8, ease: 'power2.out' },
          0.7,
        )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        requestAnimationFrame(() => {
          void revealBrush()
        })
      },
      { root: null, rootMargin: '0px 0px -30% 0px', threshold: 0 },
    )

    observer.observe(section)

    return () => {
      cancelled = true
      observer.disconnect()
      if (gsap) gsap.killTweensOf([brushFill, titleText])
      brushFill.style.willChange = 'auto'
      titleText.style.willChange = 'auto'
      hasDrawnRef.current = false
    }
  }, [triggerRef, textColor])

  return (
    <span className="about-title-highlight">
      <span ref={brushFillRef} className="about-title-brush-fill" aria-hidden="true">
        <svg className="about-title-brush" viewBox="0 0 312 52" preserveAspectRatio="none">
          <path d={BRUSH_HIGHLIGHT_PATH} fill={BRAND_HIGHLIGHT} />
        </svg>
      </span>
      <span ref={titleTextRef} className={`about-title-highlight__text ${className}`.trim()}>
        {children}
      </span>
    </span>
  )
}

export default BrushHighlightText
