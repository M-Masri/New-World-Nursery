import { useEffect, useRef, useState } from 'react'

/**
 * Mounts children only when the placeholder nears the viewport.
 * Keeps heavy below-fold sections (Lottie, forms) off the main thread
 * while scrolling through Programs.
 */
function DeferredMount({ children, rootMargin = '160px', minHeight = 1 }) {
  const hostRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host || mounted) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setMounted(true)
        observer.disconnect()
      },
      { rootMargin, threshold: 0 },
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [mounted, rootMargin])

  return (
    <div ref={hostRef} style={mounted ? undefined : { minHeight }}>
      {mounted ? children : null}
    </div>
  )
}

export default DeferredMount
