import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { isMobilePerf, MOBILE_PERF_QUERY } from '../../lib/mobilePerf'

const MotionAnimatedCard = lazy(() => import('./AnimatedCardMotion'))

function PlainCard({ children, className = '', as = 'div', cardRef, ...props }) {
  const Tag = as === 'a' ? 'a' : as === 'article' ? 'article' : 'div'
  const {
    index: _index,
    gated: _gated,
    active: _active,
    motionEnabled: _motionEnabled,
    skipEntrance: _skipEntrance,
    ...rest
  } = props
  return (
    <Tag ref={cardRef} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * @param {object} props
 * @param {boolean} [props.motionEnabled=true] When false, skip Framer entirely (keeps scroll smooth during highlight).
 */
function AnimatedCard({ motionEnabled = true, ...props }) {
  const cardRef = useRef(null)
  const [useMotion, setUseMotion] = useState(false)

  useEffect(() => {
    if (isMobilePerf()) return undefined

    let idleId
    let timeoutId
    if (typeof requestIdleCallback !== 'undefined') {
      idleId = requestIdleCallback(() => import('./AnimatedCardMotion'))
    } else {
      timeoutId = setTimeout(() => import('./AnimatedCardMotion'), 1500)
    }
    return () => {
      if (idleId && typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!motionEnabled || isMobilePerf()) {
      setUseMotion(false)
      return undefined
    }

    const node = cardRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setUseMotion(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setUseMotion(true)
        observer.disconnect()
      },
      { rootMargin: '120px', threshold: 0.01 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [motionEnabled])

  useEffect(() => {
    const media = window.matchMedia(MOBILE_PERF_QUERY)
    const update = () => {
      if (media.matches) setUseMotion(false)
    }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const cardProps = { ...props, motionEnabled }

  if (!useMotion) {
    return <PlainCard {...cardProps} cardRef={cardRef} />
  }

  return (
    <Suspense fallback={<PlainCard {...cardProps} />}>
      <MotionAnimatedCard {...cardProps} />
    </Suspense>
  )
}

export default AnimatedCard
