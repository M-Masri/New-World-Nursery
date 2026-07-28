import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { isMobilePerf, MOBILE_PERF_QUERY } from '../../lib/mobilePerf'

const MotionAnimatedCard = lazy(() => import('./AnimatedCardMotion'))

function PlainCard({ children, className = '', as = 'div', cardRef, ...props }) {
  const Tag = as === 'a' ? 'a' : as === 'article' ? 'article' : 'div'
  const {
    index: _index,
    gated: _gated,
    active: _active,
    ...rest
  } = props
  return (
    <Tag ref={cardRef} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * Mobile: plain DOM.
 * Desktop: plain until near viewport, then lazy-loads framer-motion.
 */
function AnimatedCard(props) {
  const cardRef = useRef(null)
  const [useMotion, setUseMotion] = useState(false)

  useEffect(() => {
    if (isMobilePerf()) return undefined

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
      { rootMargin: '80px', threshold: 0.01 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia(MOBILE_PERF_QUERY)
    const update = () => {
      if (media.matches) setUseMotion(false)
    }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (!useMotion) {
    return <PlainCard {...props} cardRef={cardRef} />
  }

  return (
    <Suspense fallback={<PlainCard {...props} />}>
      <MotionAnimatedCard {...props} />
    </Suspense>
  )
}

export default AnimatedCard
