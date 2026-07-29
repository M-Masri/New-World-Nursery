import { createContext, useCallback, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactFormContext = createContext(null)

export function ContactFormProvider({ children }) {
  const navigate = useNavigate()

  const openContactForm = useCallback(() => {
    navigate('/contact')
  }, [navigate])

  // Kept for backward-compat with ContactFormPopup (now removed from Layout).
  const closeContactForm = useCallback(() => {}, [])

  const value = useMemo(
    () => ({
      isOpen: false,
      openContactForm,
      closeContactForm,
    }),
    [openContactForm, closeContactForm],
  )

  return (
    <ContactFormContext.Provider value={value}>
      {children}
    </ContactFormContext.Provider>
  )
}

export function useContactFormPopup() {
  const context = useContext(ContactFormContext)
  if (!context) {
    throw new Error(
      'useContactFormPopup must be used within ContactFormProvider',
    )
  }
  return context
}
