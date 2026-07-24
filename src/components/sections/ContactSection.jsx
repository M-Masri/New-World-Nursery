import { useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import BrushHighlightText from '../ui/BrushHighlightText'
import CloudScroll3D from '../ui/CloudScroll3D'
import ContactForm from '../ui/ContactForm'
import LottieScroll from '../ui/LottieScroll'

function ContactSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 sm:py-12"
    >
      <div className="relative z-10 mx-auto grid max-w-page items-center gap-12 page-gutter lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative -ml-10 mb-3 h-28 w-52 sm:mb-4 sm:h-32 sm:w-60">
            <CloudScroll3D
              horizontalPosition={0}
              verticalPosition={0.7}
              cloudScale={1.25}
              driftAmplitude={0}
              bobAmplitude={9}
              bobSpeed={1.25}
            />
          </div>

          <p className="section-eyebrow mb-4">
            Plan a Visit
          </p>
          <h2 className="section-title mb-5 lg:text-[2.75rem]">
            <span className="block">Talk with</span>
            <span className="relative inline-block">
              <BrushHighlightText triggerRef={sectionRef} className="font-normal">
                Our Team
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
          </h2>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-brand-muted">
            Tell us your child&apos;s age and preferred program — we&apos;ll
            help you book a tour of our Al Barsha nursery and answer enrolment
            questions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5bb5a2]">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-muted">E-mail</p>
                <a
                  href="mailto:info@newworldnursery.ae"
                  className="text-sm font-semibold text-brand-ink hover:text-[#5bb5a2]"
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
                <p className="text-xs font-bold text-brand-muted">Phone number</p>
                <a
                  href="tel:+971501234567"
                  className="text-sm font-semibold text-brand-ink hover:text-[#5bb5a2]"
                >
                  +971 50 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="card-surface p-6 sm:p-8">
          <ContactForm idPrefix="contact" />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
