import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchSiteContent } from '../lib/api'
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
        const next = await fetchSiteContent()
        if (cancelled) return

        // Only wait for hero (LCP) — not every CMS image
        await preloadCriticalImages(next)
        if (cancelled) return

        setData({
          settings: next.settings ?? null,
          features: Array.isArray(next.features) ? next.features : [],
          locations: Array.isArray(next.locations) ? next.locations : [],
          programs: Array.isArray(next.programs) ? next.programs : [],
          gallery: Array.isArray(next.gallery) ? next.gallery : [],
          instagramFeed: Array.isArray(next.instagramFeed)
            ? next.instagramFeed
            : [],
        })
        setStatus('ready')
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
