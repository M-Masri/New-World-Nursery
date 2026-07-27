import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchHome } from '../lib/api'

const HomeDataContext = createContext(null)

const EMPTY = {
  settings: null,
  features: [],
  locations: [],
  programs: [],
  gallery: [],
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
        const payload = await fetchHome()
        if (cancelled) return

        const home = payload?.data ?? payload ?? {}
        setData({
          settings: home.settings ?? null,
          features: Array.isArray(home.features) ? home.features : [],
          locations: Array.isArray(home.locations) ? home.locations : [],
          programs: Array.isArray(home.programs) ? home.programs : [],
          gallery: Array.isArray(home.gallery) ? home.gallery : [],
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
