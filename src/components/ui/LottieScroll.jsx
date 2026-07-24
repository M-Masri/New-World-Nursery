import { useEffect, useState } from 'react'
import useLottieScroll from '../../hooks/useLottieScroll'

/**
 * Lottie مرتبط بالسكرول. يدعم animationData جاهز أو animationImport للـ lazy-load.
 */
function LottieScroll({
  animationData,
  animationImport,
  className = '',
  triggerRef,
  start,
  end,
  scrub,
  mode = 'scrub',
  speed = 1,
  repeatCount = 1,
  rendererSettings,
}) {
  const [resolvedData, setResolvedData] = useState(animationData ?? null)

  useEffect(() => {
    if (resolvedData || !animationImport) return undefined

    let cancelled = false

    animationImport()
      .then((mod) => {
        if (cancelled) return
        setResolvedData(mod.default ?? mod)
      })
      .catch(() => {
        // Keep empty placeholder if the asset fails to load.
      })

    return () => {
      cancelled = true
    }
  }, [animationImport, resolvedData])

  const containerRef = useLottieScroll({
    animationData: resolvedData,
    triggerRef,
    start,
    end,
    scrub,
    mode,
    speed,
    repeatCount,
    rendererSettings,
  })

  return <div ref={containerRef} className={className} aria-hidden="true" />
}

export default LottieScroll
