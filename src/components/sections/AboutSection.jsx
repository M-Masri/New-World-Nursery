import { useRef } from 'react'
import aboutLeaf from '../../assets/about-leaf.webp'
import aboutGradIcon from '../../assets/New_World_Icon00050-removebg-preview.webp'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import { useLanguage } from '../../i18n'
import BrushHighlightText from '../ui/BrushHighlightText'
import Button from '../ui/Button'
import LottieScroll from '../ui/LottieScroll'

function AboutSection() {
  const sectionRef = useRef(null)
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const { isRtl } = useLanguage()
  const about = settings?.about ?? null

  if (!about) return null

  const titleBefore = about.highlight
    ? (about.title || '').replace(about.highlight, '').trim()
    : about.title

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 pb-10 sm:py-12 sm:pb-10"
    >
      <AboutLeafDecoration sectionRef={sectionRef} isRtl={isRtl} />

      <div className="relative mx-auto grid max-w-page items-center gap-12 page-gutter lg:grid-cols-2 lg:gap-16">
        {about.image ? <AboutImageFrame image={about.image} /> : null}

        <div className={`relative ${isRtl ? 'text-right' : ''}`}>
          {about.label ? <p className="section-eyebrow">{about.label}</p> : null}

          {about.title || about.highlight ? (
            <h2 className="section-title mb-6">
              {titleBefore ? (
                <>
                  {titleBefore}
                  <br />
                </>
              ) : null}
              {about.highlight ? (
                <BrushHighlightText triggerRef={sectionRef}>
                  {about.highlight}
                </BrushHighlightText>
              ) : (
                about.title
              )}
            </h2>
          ) : null}

          {about.content ? (
            <p
              className={`mb-8 max-w-md text-[15px] leading-relaxed text-brand-muted ${
                isRtl ? 'mr-0 ml-auto' : ''
              }`}
            >
              {about.content}
            </p>
          ) : null}

          {about.cta ? (
            <Button variant="outlineCoral" onClick={openContactForm}>
              {about.cta}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function AboutImageFrame({ image }) {
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
            src={image}
            alt=""
            width={900}
            height={675}
            loading="lazy"
            decoding="async"
            className="h-[320px] w-full object-cover object-center sm:h-[380px] lg:h-[400px]"
          />
        </div>
      </div>
    </div>
  )
}

function AboutLeafDecoration({ sectionRef, isRtl = false }) {
  return (
    <>
      <img
        src={aboutGradIcon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-20 hidden w-28 opacity-95 sm:block sm:w-32 lg:w-40"
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
        className={`pointer-events-none absolute bottom-0 z-20 h-28 w-52 opacity-100 brightness-75 contrast-125 saturate-125 sm:h-40 sm:w-80 lg:h-48 lg:w-96 ${
          isRtl
            ? 'left-0 scale-x-[-1] sm:left-12 lg:left-16'
            : 'right-0 sm:right-12 lg:right-16'
        }`}
      />
    </>
  )
}

export default AboutSection
