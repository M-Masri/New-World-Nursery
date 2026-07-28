import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  fetchFeatures,
  fetchInstagramGallery,
  fetchLocations,
  fetchPrograms,
  fetchSettings,
} from '../lib/api'
import { hintHeroImagePreload } from '../lib/preloadHomeImages'

const HomeDataContext = createContext(null)

const EMPTY = {
  settings: null,
  features: [],
  locations: [],
  programs: [],
  gallery: [],
  instagramFeed: [],
}

export function HomeDataProvider({ children }) {
  const [data, setData] = useState(EMPTY)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    let removePreload = () => {}

    async function load() {
      setStatus('loading')
      setError(null)

      try {
        // Unlock UI as soon as settings arrive — don't wait for image decode (PSI LCP).
        const settings = await fetchSettings()
        if (cancelled) return

        removePreload = hintHeroImagePreload({ settings })
        setData((prev) => ({ ...prev, settings: settings ?? null }))
        setStatus('ready')

        const [features, locations, programs, instagramFeed] =
          await Promise.all([
            fetchFeatures(),
            fetchLocations(),
            fetchPrograms(),
            fetchInstagramGallery(),
          ])
        if (cancelled) return

        setData({
          settings: settings ?? null,
          features: Array.isArray(features) ? features : [],
          locations: Array.isArray(locations) ? locations : [],
          programs: Array.isArray(programs) ? programs : [],
          gallery: [],
          instagramFeed: Array.isArray(instagramFeed) ? instagramFeed : [],
        })
      } catch (err) {
        if (cancelled) return
        setError(err)
        setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
      removePreload()
    }
  }, [])

  const value = useMemo(
    () => ({
      ...data,
      status,
      error,
      isLoading: status === 'loading',
      isReady: status === 'ready',
      isError: status === 'error',
    }),
    [data, status, error],
  )

  return (
    <HomeDataContext.Provider value={value}>{children}</HomeDataContext.Provider>
  )
}

export function useHomeData() {
  const context = useContext(HomeDataContext)
  if (!context) {
    throw new Error('useHomeData must be used within HomeDataProvider')
  }
  return context
}
