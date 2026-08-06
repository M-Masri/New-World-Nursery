import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import en from './locales/en'
import ar from './locales/ar'

const STORAGE_KEY = 'nwn-lang'
const dictionaries = { en, ar }

const LanguageContext = createContext(null)

function getByPath(obj, path) {
  if (!path) return undefined
  return path.split('.').reduce((value, key) => {
    if (value == null) return undefined
    return value[key]
  }, obj)
}

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage)

  const setLanguage = useCallback((next) => {
    const value = next === 'ar' ? 'ar' : 'en'
    setLanguageState(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }, [language, setLanguage])

  useEffect(() => {
    const root = document.documentElement
    const isRtl = language === 'ar'
    root.lang = language
    root.dir = isRtl ? 'rtl' : 'ltr'
    root.classList.toggle('lang-ar', isRtl)
  }, [language])

  const t = useCallback(
    (key, fallbackOrVars, maybeVars) => {
      const vars =
        fallbackOrVars &&
        typeof fallbackOrVars === 'object' &&
        !Array.isArray(fallbackOrVars)
          ? fallbackOrVars
          : maybeVars
      const fallback =
        typeof fallbackOrVars === 'string' ? fallbackOrVars : undefined

      let value = getByPath(dictionaries[language], key)
      if (value === undefined) value = getByPath(dictionaries.en, key)
      if (value === undefined) value = fallback !== undefined ? fallback : key

      if (typeof value === 'string' && vars) {
        return Object.entries(vars).reduce(
          (text, [name, next]) =>
            text.replaceAll(`{${name}}`, String(next ?? '')),
          value,
        )
      }
      return value
    },
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      isRtl: language === 'ar',
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, toggleLanguage, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}

export default LanguageProvider
