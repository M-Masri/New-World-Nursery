import { useEffect, useRef, useState } from 'react'

/**
 * Loads an image when enabled.
 * Host always keeps layout size (CLS-safe) even before src attaches.
 */
function LazyImage({
  src,
  alt = '',
  className = '',
  staggerMs = 0,
  rootMargin = '120px',
  enabled = true,
  eager = false,
  onLoad,
  onError,
  ...imgProps
}) {
  const hostRef = useRef(null)
  const [activeSrc, setActiveSrc] = useState(null)
  const onLoadRef = useRef(onLoad)
  const onErrorRef = useRef(onError)
  onLoadRef.current = onLoad
  onErrorRef.current = onError

  useEffect(() => {
    const host = hostRef.current
    if (!host || !src || !enabled) return undefined

    let timer = null
    let cancelled = false

    const start = () => {
      timer = window.setTimeout(() => {
        if (!cancelled) setActiveSrc(src)
      }, staggerMs)
    }

    if (eager) {
      start()
      return () => {
        cancelled = true
        if (timer) window.clearTimeout(timer)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        start()
      },
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(host)

    return () => {
      cancelled = true
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [src, staggerMs, rootMargin, enabled, eager])

  return (
    <div ref={hostRef} className={`relative overflow-hidden bg-[#f3ebe0]/50 ${className}`.trim()}>
      {activeSrc ? (
        <img
          src={activeSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'low'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onLoad={(event) => onLoadRef.current?.(event)}
          onError={(event) => onErrorRef.current?.(event)}
          {...imgProps}
        />
      ) : null}
    </div>
  )
}

export default LazyImage
