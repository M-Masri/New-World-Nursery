import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

function AnimatedCard({ children, index = 0, className = '', as = 'div', ...props }) {
  const prefersReducedMotion = useReducedMotion()

  const motionProps = {
    className,
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: prefersReducedMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.55,
      delay: prefersReducedMotion ? 0 : index * 0.08,
      ease: EASE,
    },
    whileHover: prefersReducedMotion
      ? undefined
      : { y: -4, transition: { duration: 0.25, ease: EASE } },
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
