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
  'w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-sm text-[#2d3a4a] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5bb5a2]/30'

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
          className="mb-2 block text-sm text-gray-500"
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
          className="mb-2 block text-sm text-gray-500"
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
            className="mb-2 block text-sm text-gray-500"
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
            className="mb-2 block text-sm text-gray-500"
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
          className="mb-2 block text-sm text-gray-500"
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
        className="inline-flex items-center gap-3 rounded-full bg-[#f07a7a] py-3 pr-6 pl-2 text-sm font-bold text-white transition hover:bg-[#e86a6a]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
          <ArrowRight className="h-4 w-4 text-[#f07a7a]" />
        </span>
        Send Message
      </button>
    </form>
  )
}

export default ContactForm
