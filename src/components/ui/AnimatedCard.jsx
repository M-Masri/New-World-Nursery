import { lazy, Suspense, useEffect, useState } from 'react'
import { isMobilePerf, MOBILE_PERF_QUERY } from '../../lib/mobilePerf'

const MotionAnimatedCard = lazy(() => import('./AnimatedCardMotion'))

function PlainCard({ children, className = '', as = 'div', ...props }) {
  const Tag = as === 'a' ? 'a' : as === 'article' ? 'article' : 'div'
  // Strip motion-only props if any leaked through
  const {
    index: _index,
    gated: _gated,
    active: _active,
    ...rest
  } = props
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * Mobile: plain DOM (no framer-motion chunk).
 * Desktop: lazy-loads motion implementation.
 */
function AnimatedCard(props) {
  const [useMotion, setUseMotion] = useState(() => !isMobilePerf())

  useEffect(() => {
    const media = window.matchMedia(MOBILE_PERF_QUERY)
    const update = () => setUseMotion(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (!useMotion) {
    return <PlainCard {...props} />
  }

  return (
    <Suspense fallback={<PlainCard {...props} />}>
      <MotionAnimatedCard {...props} />
    </Suspense>
  )
}

export default AnimatedCard
