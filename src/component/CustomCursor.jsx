import { useEffect, useState } from 'react'

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return undefined

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setActive(true)
    }

    const handleLeave = () => setActive(false)
    const handleEnter = () => setActive(true)

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    document.documentElement.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  if (!active) return null

  return (
    <div
      className="custom-cursor"
      style={{ left: position.x, top: position.y }}
      aria-hidden="true"
    />
  )
}

export default CustomCursor
