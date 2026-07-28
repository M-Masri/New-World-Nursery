import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ApiError, submitContact } from '../../lib/api'
import { useHomeData } from '../../context/HomeDataContext'
import FeedbackDialog from './FeedbackDialog'

const fieldClassName =
  'w-full rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-ink outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5bb5a2]/30'

function fieldErrorClass(hasError) {
  return hasError
    ? `${fieldClassName} ring-2 ring-red-300 focus:ring-red-300`
    : fieldClassName
}

/**
 * Shared contact form (section + popup). Submits to POST /api/contact.
 */
function ContactForm({
  idPrefix = 'contact',
  onSubmitSuccess,
  programOptions,
}) {
  const { programs } = useHomeData()
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [dialog, setDialog] = useState(null)

  const options =
    programOptions ??
    [
      'Select...',
      ...programs.map((program) => program.title).filter(Boolean),
      'General Enquiry',
    ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      program: String(formData.get('program') || '').trim() || undefined,
      child_age: String(formData.get('child_age') || '').trim() || undefined,
      phone: String(formData.get('phone') || '').trim() || undefined,
    }

    setStatus('submitting')
    setErrors({})
    setDialog(null)

    try {
      const result = await submitContact(payload)
      setStatus('success')
      form.reset()
      setDialog({
        variant: 'success',
        title: 'Message sent',
        message:
          result?.message ||
          'Thank you! Your message has been sent successfully.',
      })
    } catch (err) {
      setStatus('error')
      if (err instanceof ApiError && err.errors) {
        setErrors(err.errors)
      }
      setDialog({
        variant: 'error',
        title: 'Send failed',
        message:
          err?.message || 'Something went wrong. Please try again later.',
      })
    }
  }

  const closeDialog = () => {
    const wasSuccess = dialog?.variant === 'success'
    setDialog(null)
    if (wasSuccess) onSubmitSuccess?.()
  }

  const firstError = (field) => {
    const value = errors?.[field]
    if (!value) return null
    return Array.isArray(value) ? value[0] : String(value)
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="mb-2 block text-xs font-bold text-brand-muted"
          >
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className={fieldErrorClass(Boolean(firstError('name')))}
            aria-invalid={Boolean(firstError('name'))}
          />
          {firstError('name') ? (
            <p className="mt-1 text-xs text-red-500">{firstError('name')}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="mb-2 block text-xs font-bold text-brand-muted"
          >
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className={fieldErrorClass(Boolean(firstError('email')))}
            aria-invalid={Boolean(firstError('email'))}
          />
          {firstError('email') ? (
            <p className="mt-1 text-xs text-red-500">{firstError('email')}</p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${idPrefix}-program`}
              className="mb-2 block text-xs font-bold text-brand-muted"
            >
              Program
            </label>
            <select
              id={`${idPrefix}-program`}
              name="program"
              defaultValue=""
              className={`${fieldErrorClass(Boolean(firstError('program')))} appearance-none`}
              aria-invalid={Boolean(firstError('program'))}
            >
              {options.map((program) => (
                <option
                  key={program}
                  value={program === 'Select...' ? '' : program}
                >
                  {program}
                </option>
              ))}
            </select>
            {firstError('program') ? (
              <p className="mt-1 text-xs text-red-500">
                {firstError('program')}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-child-age`}
              className="mb-2 block text-xs font-bold text-brand-muted"
            >
              Child&apos;s Age
            </label>
            <input
              id={`${idPrefix}-child-age`}
              name="child_age"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 3 years"
              className={fieldErrorClass(Boolean(firstError('child_age')))}
              aria-invalid={Boolean(firstError('child_age'))}
            />
            {firstError('child_age') ? (
              <p className="mt-1 text-xs text-red-500">
                {firstError('child_age')}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-message`}
            className="mb-2 block text-xs font-bold text-brand-muted"
          >
            Message
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={4}
            required
            placeholder="Type your message..."
            className={`${fieldErrorClass(Boolean(firstError('message')))} resize-none`}
            aria-invalid={Boolean(firstError('message'))}
          />
          {firstError('message') ? (
            <p className="mt-1 text-xs text-red-500">{firstError('message')}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-3 rounded-full bg-[#5bb5a2] py-3 pr-6 pl-2 text-sm font-bold text-white transition hover:bg-[#4a9e8d] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <ArrowRight className="h-4 w-4 text-[#5bb5a2]" />
          </span>
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <FeedbackDialog
        open={Boolean(dialog)}
        variant={dialog?.variant}
        title={dialog?.title}
        message={dialog?.message}
        onClose={closeDialog}
      />
    </>
  )
}

export default ContactForm
