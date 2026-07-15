import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useCloudScroll3D } from '../hooks/useCloudScroll3D'

/**
 * غيمة 3D ثابتة فوق الصفحة — تتحرك zigzag مع السكرول.
 * الـ canvas يُعرض عبر portal على body لتجنب مشاكل stacking context.
 */
function CloudScroll3D({
  sectionSelector = 'main > section',
  verticalPosition = 0.22,
  bobAmplitude = 14,
  bobSpeed = 1,
  scrubSmoothness = 3.2,
  cloudScale = 1.3,
}) {
  const canvasRef = useRef(null)
  const portalRef = useRef(null)

  if (!portalRef.current && typeof document !== 'undefined') {
    portalRef.current = document.createElement('div')
    portalRef.current.setAttribute('data-cloud-scroll-root', '')
  }

  useEffect(() => {
    const root = portalRef.current
    if (!root) return undefined

    document.body.appendChild(root)
    return () => {
      root.remove()
    }
  }, [])

  useCloudScroll3D(canvasRef, {
    sectionSelector,
    verticalPosition,
    bobAmplitude,
    bobSpeed,
    scrubSmoothness,
    cloudScale,
  })

  if (!portalRef.current) return null

  return createPortal(
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] block h-[100dvh] w-screen max-w-none"
      aria-hidden="true"
    />,
    portalRef.current,
  )
}

export default CloudScroll3D
