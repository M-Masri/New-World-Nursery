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

function AnimatedCard({ children, index = 0, className = '', as = 'div', ...props }) {
  const prefersReducedMotion = useReducedMotion()
  const canHover = useCanHover()

  const motionProps = {
    className,
    initial: prefersReducedMotion ? false : { opacity: 0, y: 12 },
    whileInView: prefersReducedMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.75,
      delay: prefersReducedMotion ? 0 : index * 0.06,
      ease: EASE,
    },
    whileHover:
      prefersReducedMotion || !canHover
        ? undefined
        : { y: -2, transition: { duration: 0.4, ease: EASE } },
    ...props,
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
