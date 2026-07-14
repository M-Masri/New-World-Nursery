import { useEffect, useState } from 'react'

export default function useMouseParallax(containerRef) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return undefined

    const handleMove = (event) => {
      const rect = container.getBoundingClientRect()
      setOffset({
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      })
    }

    const handleLeave = () => setOffset({ x: 0, y: 0 })

    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseleave', handleLeave)

    return () => {
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseleave', handleLeave)
    }
  }, [containerRef])

  return offset
}
