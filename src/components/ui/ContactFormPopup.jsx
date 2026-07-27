import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import ContactForm from './ContactForm'
import { useContactFormPopup } from '../../context/ContactFormContext'

function ContactFormPopup() {
  const { isOpen, closeContactForm } = useContactFormPopup()

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeContactForm()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeContactForm])

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2d3a4a]/50 backdrop-blur-[2px]"
        aria-label="Close enquiry form"
        onClick={closeContactForm}
      />

      <div className="relative z-10 max-h-[min(90dvh,720px)] w-full max-w-lg overflow-y-auto card-surface p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="section-eyebrow mb-1">Get in Touch</p>
            <h2
              id="contact-popup-title"
              className="text-2xl font-extrabold text-brand-ink"
            >
              Enquire Now
            </h2>
          </div>

          <button
            type="button"
            onClick={closeContactForm}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-ink transition hover:bg-[#ebebef]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ContactForm
          idPrefix="contact-popup"
          onSubmitSuccess={() => {
            window.setTimeout(closeContactForm, 1400)
          }}
        />
      </div>
    </div>,
    document.body,
  )
}

export default ContactFormPopup
