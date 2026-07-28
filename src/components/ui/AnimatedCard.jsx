import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const EASE = [0.25, 0.1, 0.25, 1]

function useCanHover() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return canHover
}

/**
 * @param {boolean} active - When false, stays at initial (hidden). When true, plays enter animation.
 *   Defaults to true (whileInView) for sections that don't sequence motion.
 * @param {boolean} gated - If true, use controlled `active` instead of whileInView.
 */
function AnimatedCard({
  children,
  index = 0,
  className = '',
  as = 'div',
  gated = false,
  active = true,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()
  const canHover = useCanHover()
  const reduce = Boolean(prefersReducedMotion)

  const hover =
    reduce || !canHover
      ? undefined
      : { y: -2, transition: { duration: 0.3, ease: EASE } }

  const shared = {
    className,
    style: { willChange: 'transform, opacity' },
    whileHover: hover,
    ...props,
  }

  let motionProps

  if (gated) {
    motionProps = {
      ...shared,
      initial: reduce ? false : { opacity: 0, y: 12 },
      animate: reduce
        ? { opacity: 1, y: 0 }
        : active
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 },
      transition: {
        duration: reduce ? 0 : 0.5,
        delay: reduce || !active ? 0 : index * 0.07,
        ease: EASE,
      },
    }
  } else {
    motionProps = {
      ...shared,
      initial: reduce ? false : { opacity: 0, y: 12 },
      whileInView: reduce ? undefined : { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.15 },
      transition: {
        duration: reduce ? 0 : 0.75,
        delay: reduce ? 0 : index * 0.06,
        ease: EASE,
      },
    }
  }

  if (as === 'a') {
    return <motion.a {...motionProps}>{children}</motion.a>
  }

  if (as === 'article') {
    return <motion.article {...motionProps}>{children}</motion.article>
  }

  return <motion.div {...motionProps}>{children}</motion.div>
}

export default AnimatedCard
