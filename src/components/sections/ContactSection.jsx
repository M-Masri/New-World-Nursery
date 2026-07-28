import { lazy, Suspense, useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import BrushHighlightText from '../ui/BrushHighlightText'
import ContactForm from '../ui/ContactForm'
import LottieScroll from '../ui/LottieScroll'
import { useHomeData } from '../../context/HomeDataContext'

const CloudScroll3D = lazy(() => import('../ui/CloudScroll3D'))

function ContactSection() {
  const sectionRef = useRef(null)
  const { settings, programs } = useHomeData()
  const contact = settings?.contact ?? null
  const programOptions = [
    'Select...',
    ...programs.map((program) => program.title).filter(Boolean),
    'General Enquiry',
  ]

  if (!contact) return null

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 sm:py-12"
    >
      <div className="relative z-10 mx-auto grid max-w-page items-center gap-12 page-gutter lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative -ml-10 mb-3 h-28 w-52 sm:mb-4 sm:h-32 sm:w-60">
            <Suspense fallback={null}>
              <CloudScroll3D
                horizontalPosition={0}
                verticalPosition={0.7}
                cloudScale={1.25}
                driftAmplitude={0}
                bobAmplitude={9}
                bobSpeed={1.25}
              />
            </Suspense>
          </div>

          {contact.label ? (
            <p className="section-eyebrow mb-4">{contact.label}</p>
          ) : null}

          {contact.title || contact.title_highlight ? (
            <h2 className="section-title mb-5 lg:text-[2.75rem]">
              {contact.title ? <span className="block">{contact.title}</span> : null}
              {contact.title_highlight ? (
                <span className="relative inline-block">
                  <BrushHighlightText
                    triggerRef={sectionRef}
                    className="font-normal"
                  >
                    {contact.title_highlight}
                  </BrushHighlightText>
                  <LottieScroll
                    animationImport={() =>
                      import('../../assets/lottie/contact-needs.json')
                    }
                    triggerRef={sectionRef}
                    mode="playWhileInView"
                    speed={0.7}
                    className="pointer-events-none absolute top-1/2 left-full -ml-3 h-28 w-32 -translate-y-1/2 shrink-0 sm:-ml-4 sm:h-32 sm:w-36 lg:-ml-13 lg:h-46 lg:w-45"
                  />
                </span>
              ) : null}
            </h2>
          ) : null}

          {contact.subtitle ? (
            <p className="mb-10 max-w-md text-sm leading-relaxed text-brand-muted">
              {contact.subtitle}
            </p>
          ) : null}

          <div className="space-y-6">
            {contact.email ? (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5bb5a2]">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-muted">E-mail</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-semibold text-brand-ink hover:text-[#5bb5a2]"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            ) : null}

            {contact.phone ? (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5bb5a2]">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-muted">
                    Phone number
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold text-brand-ink hover:text-[#5bb5a2]"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="card-surface p-6 sm:p-8">
          <ContactForm idPrefix="contact" programOptions={programOptions} />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
