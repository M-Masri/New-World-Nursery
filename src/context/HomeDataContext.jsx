import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  fetchFeatures,
  fetchInstagram,
  fetchLocations,
  fetchPrograms,
  fetchSettings,
} from '../lib/api'
import { normalizeInstagramPosts } from '../data/gallery'
import { hintHeroImagePreload } from '../lib/preloadHomeImages'
import { useLanguage } from '../i18n'

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
  const { language } = useLanguage()
  const [data, setData] = useState(EMPTY)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState(null)
  const hasLoadedOnce = useRef(false)

  useEffect(() => {
    let cancelled = false
    let removePreload = () => {}

    async function load() {
      // Full-screen loader only on first visit; language switches keep UI visible.
      if (!hasLoadedOnce.current) {
        setStatus('loading')
      }
      setError(null)

      try {
        const settings = await fetchSettings(language)
        if (cancelled) return

        removePreload = hintHeroImagePreload({ settings })
        setData((prev) => ({ ...prev, settings: settings ?? null }))
        setStatus('ready')
        hasLoadedOnce.current = true

        const [features, locations, programs, instagramFeed] =
          await Promise.all([
            fetchFeatures(language),
            fetchLocations(language),
            fetchPrograms(language),
            fetchInstagram(language),
          ])
        if (cancelled) return

        setData({
          settings: settings ?? null,
          features: Array.isArray(features) ? features : [],
          locations: Array.isArray(locations) ? locations : [],
          programs: Array.isArray(programs) ? programs : [],
          gallery: [],
          instagramFeed: normalizeInstagramPosts(instagramFeed),
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
  }, [language])

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
