import { useRef } from 'react'
import aboutLeaf from '../../assets/about-leaf.webp'
import aboutGradIcon from '../../assets/New_World_Icon00050-removebg-preview.webp'
import aboutRoom from '../../assets/about-room.png'
import { useContactFormPopup } from '../../context/ContactFormContext'
import BrushHighlightText from '../ui/BrushHighlightText'
import Button from '../ui/Button'
import LottieScroll from '../ui/LottieScroll'

function AboutSection() {
  const sectionRef = useRef(null)
  const { openContactForm } = useContactFormPopup()

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-10 pb-10 sm:py-12 sm:pb-10">
      <AboutLeafDecoration sectionRef={sectionRef} />

      <div className="relative mx-auto grid max-w-page items-center gap-12 page-gutter lg:grid-cols-2 lg:gap-16">
        <AboutImageFrame />

        <div className="relative">
          <p className="section-eyebrow">
            About Us
          </p>

          <h2 className="section-title mb-6">
            Welcome to
            <br />
            <BrushHighlightText triggerRef={sectionRef}>
              New World Nursery
            </BrushHighlightText>
          </h2>

          <p className="mb-8 max-w-md text-[15px] leading-relaxed text-brand-muted">
            Based in Dubai, we welcome children into bright classrooms and
            thoughtful routines built around curiosity, creativity, and care.
            From toddlers to kindergarten, every day balances play, early
            skills, and the confidence to take the next step.
          </p>

          <Button variant="outlineCoral" onClick={openContactForm}>
            Book a Visit
          </Button>
        </div>
      </div>
    </section>
  )
}

function AboutImageFrame() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <svg
        className="absolute -top-12 -left-12 z-20"
        width="208"
        height="208"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 34 C6 14 14 6 34 6"
          stroke="#f4b8c8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute -right-12 -bottom-12 z-20"
        width="208"
        height="208"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M42 14 C42 34 34 42 14 42"
          stroke="#f4b8c8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative rounded-[var(--radius-feature)] p-3 sm:rounded-[3rem] sm:p-4">
        <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <img
            src={aboutRoom}
            alt="Bright nursery playroom with a teepee and soft floor cushions"
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[400px]"
          />
        </div>
      </div>
    </div>
  )
}

function AboutLeafDecoration({ sectionRef }) {
  return (
    <>
      <img
        src={aboutGradIcon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-28 opacity-95 sm:block sm:w-32 lg:w-40"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-90 sm:w-14 lg:w-16"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-40 opacity-90 sm:w-44 lg:w-48"
      />
      <LottieScroll
        animationImport={() => import('../../assets/lottie/plane-heart.json')}
        triggerRef={sectionRef}
        mode="playWhileInView"
        speed={0.55}
        className="pointer-events-none absolute right-0 bottom-0 z-20 h-28 w-52 opacity-100 brightness-75 contrast-125 saturate-125 sm:right-12 sm:h-40 sm:w-80 lg:right-16 lg:h-48 lg:w-96"
      />
    </>
  )
}


export default AboutSection
