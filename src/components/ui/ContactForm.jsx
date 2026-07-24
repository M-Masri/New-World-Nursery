import { ArrowRight } from 'lucide-react'

export const CONTACT_PROGRAMS = [
  'Select...',
  'Toddlers',
  'Nursery',
  'Pre-Nursery',
  'KG',
  'General Enquiry',
]

const fieldClassName =
  'w-full rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-ink outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5bb5a2]/30'

/**
 * نموذج التواصل المشترك (سكشن + popup).
 */
function ContactForm({ idPrefix = 'contact', onSubmitSuccess }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmitSuccess?.()
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
          placeholder="Jane Smith"
          className={fieldClassName}
        />
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
          placeholder="jane@example.com"
          className={fieldClassName}
        />
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
            className={`${fieldClassName} appearance-none`}
          >
            {CONTACT_PROGRAMS.map((program) => (
              <option
                key={program}
                value={program === 'Select...' ? '' : program}
              >
                {program}
              </option>
            ))}
          </select>
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
            name="childAge"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 3 years"
            className={fieldClassName}
          />
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
          placeholder="Type your message..."
          className={`${fieldClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-3 rounded-full bg-[#5bb5a2] py-3 pr-6 pl-2 text-sm font-bold text-white transition hover:bg-[#4a9e8d]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
          <ArrowRight className="h-4 w-4 text-[#5bb5a2]" />
        </span>
        Send Message
      </button>
    </form>
  )
}

export default ContactForm
