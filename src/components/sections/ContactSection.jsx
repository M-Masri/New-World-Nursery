import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { Mail, Phone } from 'lucide-react'
import BrushHighlightText from '../ui/BrushHighlightText'
import ContactForm from '../ui/ContactForm'
import LottieScroll from '../ui/LottieScroll'
import { useHomeData } from '../../context/HomeDataContext'
import { useLanguage } from '../../i18n'
import { isMobilePerf } from '../../lib/mobilePerf'

const CloudScroll3D = lazy(() => import('../ui/CloudScroll3D'))

function ContactSection() {
  const sectionRef = useRef(null)
  const { settings, programs } = useHomeData()
  const { t, isRtl } = useLanguage()
  const contact = settings?.contact ?? null
  const [showCloud, setShowCloud] = useState(false)
  const programOptions = [
    t('common.selectPlaceholder'),
    ...programs.map((program) => program.title).filter(Boolean),
    t('common.generalEnquiry'),
  ]

  useEffect(() => {
    if (isMobilePerf()) return undefined

    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') {
      setShowCloud(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShowCloud(true)
        observer.disconnect()
      },
      { rootMargin: '120px', threshold: 0.01 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  if (!contact) return null

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 sm:py-12"
    >
      <div className="relative z-10 mx-auto grid max-w-page items-center gap-12 page-gutter lg:grid-cols-2 lg:gap-16">
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <div className="mb-3 flex flex-col items-start sm:mb-4">
            <div
              className={`relative h-28 w-52 -mr-10 sm:h-32 sm:w-60 ${
                isRtl ? '-me-20 sm:-me-30 lg:-me-38' : '-ms-10'
              }`}
            >
              {showCloud ? (
                <Suspense fallback={null}>
                  <CloudScroll3D
                    key={isRtl ? 'cloud-ar' : 'cloud-en'}
                    horizontalPosition={isRtl ? 0.92 : 0}
                    verticalPosition={0.7}
                    cloudScale={1.25}
                    driftAmplitude={0}
                    bobAmplitude={9}
                    bobSpeed={1.25}
                  />
                </Suspense>
              ) : null}
            </div>

            {contact.label ? (
              <p className="section-eyebrow mt-1">{contact.label}</p>
            ) : null}
          </div>

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
                    className={`pointer-events-none absolute top-1/2 h-28 w-32 -translate-y-1/2 shrink-0 sm:h-32 sm:w-36 lg:h-46 lg:w-45 ${
                      isRtl
                        ? 'right-full translate-x-8 scale-x-[-1] sm:translate-x-10 lg:translate-x-14'
                        : 'left-full -ms-3 sm:-ms-4 lg:-ms-13'
                    }`}
                  />
                </span>
              ) : null}
            </h2>
          ) : null}

          {contact.subtitle ? (
            <p
              className={`mb-10 max-w-md text-sm leading-relaxed text-brand-muted ${
                isRtl ? 'mr-0 ml-auto' : ''
              }`}
            >
              {contact.subtitle}
            </p>
          ) : null}

          <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
            {contact.email ? (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5bb5a2]">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="text-xs font-bold text-brand-muted">
                    {t('home.contactEmail')}
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-semibold text-brand-ink hover:text-[#5bb5a2]"
                    dir="ltr"
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
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="text-xs font-bold text-brand-muted">
                    {t('home.contactPhone')}
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold text-brand-ink hover:text-[#5bb5a2]"
                    dir="ltr"
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
