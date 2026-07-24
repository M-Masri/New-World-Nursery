import { useEffect, useRef, useState } from 'react'
import useLottieScroll from '../../hooks/useLottieScroll'

/**
 * Lottie مرتبط بالسكرول. يدعم animationData جاهز أو animationImport للـ lazy-load.
 * الـ JSON لا يُحمَّل إلا عند ظهور العنصر في الـ viewport.
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
  const hostRef = useRef(null)
  const [resolvedData, setResolvedData] = useState(animationData ?? null)
  const [shouldLoad, setShouldLoad] = useState(!animationImport || Boolean(animationData))

  useEffect(() => {
    if (!animationImport || animationData || shouldLoad) return undefined

    const node = hostRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px', threshold: 0.01 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [animationImport, animationData, shouldLoad])

  useEffect(() => {
    if (!shouldLoad || resolvedData || !animationImport) return undefined

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
  }, [animationImport, resolvedData, shouldLoad])

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

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}

export default LottieScroll
