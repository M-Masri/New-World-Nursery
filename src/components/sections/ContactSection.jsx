import { useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import contactNeedsLottie from '../../assets/lottie/contact-needs.json'
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
      className="relative overflow-hidden bg-white py-16 sm:py-20"
    >
      <div className="relative z-10 mx-auto grid max-w-page items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative -ml-10 mb-3 h-28 w-52 sm:mb-4 sm:h-32 sm:w-60">
            <CloudScroll3D
              horizontalPosition={0}
              verticalPosition={0.7}
              cloudScale={1.25}
              driftAmplitude={0}
            />
          </div>

          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
            We&apos;re Here to Help You
          </p>
          <h2 className="mb-5 text-3xl leading-tight font-extrabold text-[#2d3a4a] sm:text-4xl lg:text-[2.75rem]">
            <span className="block">Discuss</span>
            <span className="relative inline-block">
              <BrushHighlightText triggerRef={sectionRef} className="font-normal">
                Your Nursery Needs
              </BrushHighlightText>
              <LottieScroll
                animationData={contactNeedsLottie}
                triggerRef={sectionRef}
                mode="playWhileInView"
                speed={0.85}
                className="pointer-events-none absolute top-1/2 left-full -ml-3 h-28 w-32 -translate-y-1/2 shrink-0 sm:-ml-4 sm:h-32 sm:w-36 lg:-ml-13 lg:h-46 lg:w-45"
              />
            </span>
          </h2>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-gray-500">
            Are you looking for a safe, nurturing environment for your child?
            Reach out to us and we&apos;ll be happy to answer your questions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f07a7a]">
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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f07a7a]">
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
          <ContactForm idPrefix="contact" />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
