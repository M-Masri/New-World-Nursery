import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ContactFormContext = createContext(null)

export function ContactFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openContactForm = useCallback(() => setIsOpen(true), [])
  const closeContactForm = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      isOpen,
      openContactForm,
      closeContactForm,
    }),
    [isOpen, openContactForm, closeContactForm],
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
