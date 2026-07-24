import { useRef } from 'react'
import { useCloudScroll3D } from '../../hooks/useCloudScroll3D'

/**
 * غيمة 3D مثبتة داخل الهيرو — floating فقط، بتنزل مع الصفحة مع الهيرو.
 */
function CloudScroll3D({
  horizontalPosition = 0.88,
  verticalPosition = 0.08,
  bobAmplitude = 8,
  bobSpeed = 0.45,
  driftAmplitude = 10,
  driftSpeed = 0.35,
  cloudScale = 1.3,
}) {
  const canvasRef = useRef(null)

  useCloudScroll3D(canvasRef, {
    horizontalPosition,
    verticalPosition,
    bobAmplitude,
    bobSpeed,
    driftAmplitude,
    driftSpeed,
    cloudScale,
  })

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] block h-full w-full"
      aria-hidden="true"
    />
  )
}

export default CloudScroll3D
