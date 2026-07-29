import ContactForm from '../../ui/ContactForm'
import aboutLeaf from '../../../assets/about-leaf.webp'
import aboutIcon from '../../../assets/New_World_Icon00050-removebg-preview.webp'
import { useHomeData } from '../../../context/HomeDataContext'

/**
 * Enquiry form — white section softened with home leaves, icon, and accents.
 */
function EnquiryFormSection() {
  const { settings, programs } = useHomeData()
  const contact = settings?.contact ?? {}
  const programOptions = [
    'Select...',
    ...programs.map((program) => program.title).filter(Boolean),
    'General Enquiry',
  ]

  return (
    <section
      id="enquiry-form"
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="enquiry-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-80 sm:w-16 lg:w-20"
      />
      <img
        src={aboutIcon}
        alt=""
        width={140}
        height={140}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-2 z-0 w-24 opacity-90 sm:bottom-4 sm:left-4 sm:w-28 lg:w-32"
      />
      <svg
        className="pointer-events-none absolute top-20 left-8 z-0 h-7 w-7 text-[#f5c842] opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>
      <svg
        className="pointer-events-none absolute right-16 bottom-28 z-0 h-6 w-6 text-[#f4a0b0] opacity-35"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z" />
      </svg>

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-eyebrow">
            {contact.label || 'Get in touch'}
          </p>
          <h2 id="enquiry-heading" className="section-title">
            {contact.title || 'Send us an enquiry'}
            {contact.title_highlight ? (
              <>
                {' '}
                <span className="text-[#5bb5a2]">{contact.title_highlight}</span>
              </>
            ) : null}
          </h2>
          {contact.subtitle ? (
            <p className="section-lead mx-auto max-w-xl">{contact.subtitle}</p>
          ) : (
            <p className="section-lead mx-auto max-w-xl">
              Tell us a little about your family and we will help you find the
              right programme and branch.
            </p>
          )}
        </div>

        <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-[#5bb5a2]/15 bg-white p-6 shadow-[0_14px_40px_rgba(45,58,74,0.08)] sm:rounded-[2rem] sm:p-8 lg:p-10">
          <ContactForm
            idPrefix="contact-page"
            programOptions={programOptions}
          />
        </div>
      </div>
    </section>
  )
}

export default EnquiryFormSection
