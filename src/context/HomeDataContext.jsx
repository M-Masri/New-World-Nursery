import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  fetchFeatures,
  fetchInstagramGallery,
  fetchLocations,
  fetchPrograms,
  fetchSettings,
} from '../lib/api'
import { preloadCriticalImages } from '../lib/preloadHomeImages'

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

    async function load() {
      setStatus('loading')
      setError(null)

      try {
        // 1) Settings first → unlock hero / chrome ASAP (mobile FCP/LCP)
        const settings = await fetchSettings()
        if (cancelled) return

        await preloadCriticalImages({ settings })
        if (cancelled) return

        setData((prev) => ({ ...prev, settings: settings ?? null }))
        setStatus('ready')

        // 2) Rest of homepage data in the background
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
