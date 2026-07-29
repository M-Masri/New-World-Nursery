import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { lockBodyScroll } from '../../lib/bodyScrollLock'
import HomePageLoader from '../ui/HomePageLoader'

const LOADER_MIN_MS = 420
const LOADER_FADE_MS = 400

/**
 * Shows the same HomePageLoader on client-side route changes (skips first paint).
 */
function RouteTransitionLoader() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)
  const [showLoader, setShowLoader] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return undefined
    }

    setShowLoader(true)
    setFading(false)

    const fadeTimer = window.setTimeout(() => {
      setFading(true)
    }, LOADER_MIN_MS)

    const hideTimer = window.setTimeout(() => {
      setShowLoader(false)
      setFading(false)
    }, LOADER_MIN_MS + LOADER_FADE_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [pathname])

  useEffect(() => {
    if (!showLoader) return undefined
    return lockBodyScroll()
  }, [showLoader])

  if (!showLoader) return null

  return <HomePageLoader fading={fading} />
}

export default RouteTransitionLoader
