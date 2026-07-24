import { useEffect, useRef } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)
  const activeRef = useRef(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return undefined

    const cursor = cursorRef.current
    if (!cursor) return undefined

    const handleMove = (event) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!activeRef.current) {
          activeRef.current = true
          cursor.style.opacity = '1'
        }
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      })
    }

    const handleLeave = () => {
      activeRef.current = false
      cursor.style.opacity = '0'
    }

    const handleEnter = () => {
      activeRef.current = true
      cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    document.documentElement.addEventListener('mouseenter', handleEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: 0,
        top: 0,
        opacity: 0,
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}

export default CustomCursor
