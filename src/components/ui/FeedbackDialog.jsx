import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, X, XCircle } from 'lucide-react'

function FeedbackDialog({
  open,
  variant = 'success',
  title,
  message,
  onClose,
}) {
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  const isSuccess = variant === 'success'
  const heading =
    title || (isSuccess ? 'Message sent' : 'Something went wrong')

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="contact-feedback-title"
      aria-describedby="contact-feedback-message"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2d3a4a]/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm card-surface p-6 text-center sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-ink transition hover:bg-[#ebebef]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
            isSuccess ? 'bg-[#eef8f5] text-[#5bb5a2]' : 'bg-red-50 text-red-500'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} />
          ) : (
            <XCircle className="h-7 w-7" strokeWidth={1.75} />
          )}
        </div>

        <h2
          id="contact-feedback-title"
          className="mb-2 text-xl font-extrabold text-brand-ink"
        >
          {heading}
        </h2>
        {message ? (
          <p
            id="contact-feedback-message"
            className="mb-6 text-sm leading-relaxed text-brand-muted"
          >
            {message}
          </p>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className={`inline-flex min-w-[8rem] items-center justify-center rounded-xl px-6 py-2.5 text-sm font-extrabold tracking-wide uppercase transition ${
            isSuccess
              ? 'bg-[#5bb5a2] text-white hover:bg-[#4a9e8d]'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          OK
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default FeedbackDialog
