import { ArrowRight, Mail, Phone } from 'lucide-react'

const programs = [
  'Select...',
  'Toddlers',
  'Nursery',
  'Pre-Nursery',
  'KG',
  'General Enquiry',
]

function ContactSection() {
  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
            We&apos;re Here to Help You
          </p>
          <h2 className="mb-5 text-3xl leading-tight font-extrabold text-[#2d3a4a] sm:text-4xl lg:text-[2.75rem]">
            <span className="block">Discuss</span>
            <span className="font-normal">Your Nursery Needs</span>
          </h2>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-gray-500">
            Are you looking for a safe, nurturing environment for your child?
            Reach out to us and we&apos;ll be happy to answer your questions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5bb5a2]">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">E-mail</p>
                <a
                  href="mailto:info@newworldnursery.ae"
                  className="text-sm font-semibold text-[#2d3a4a] hover:text-[#5bb5a2]"
                >
                  info@newworldnursery.ae
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5bb5a2]">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Phone number</p>
                <a
                  href="tel:+971501234567"
                  className="text-sm font-semibold text-[#2d3a4a] hover:text-[#5bb5a2]"
                >
                  +971 50 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm text-gray-500"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Jane Smith"
                className="w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-sm text-[#2d3a4a] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5bb5a2]/30"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm text-gray-500"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="jane@example.com"
                className="w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-sm text-[#2d3a4a] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5bb5a2]/30"
              />
            </div>

            <div>
              <label
                htmlFor="contact-program"
                className="mb-2 block text-sm text-gray-500"
              >
                Program
              </label>
              <select
                id="contact-program"
                defaultValue=""
                className="w-full appearance-none rounded-xl bg-[#f5f5f7] px-4 py-3 text-sm text-[#2d3a4a] outline-none focus:ring-2 focus:ring-[#5bb5a2]/30"
              >
                {programs.map((program) => (
                  <option key={program} value={program === 'Select...' ? '' : program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm text-gray-500"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Type your message..."
                className="w-full resize-none rounded-xl bg-[#f5f5f7] px-4 py-3 text-sm text-[#2d3a4a] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5bb5a2]/30"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-3 rounded-full bg-[#5bb5a2] py-3 pr-6 pl-2 text-sm font-bold text-white transition hover:bg-[#4aab9f]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <ArrowRight className="h-4 w-4 text-[#5bb5a2]" />
              </span>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
