import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import aboutStoryExplore from '../../../assets/about-story-explore.webp'
import aboutStoryNurture from '../../../assets/about-story-nurture.webp'
import aboutStoryBelong from '../../../assets/about-story-belong.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useContactFormPopup } from '../../../context/ContactFormContext'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'
import Button from '../../ui/Button'

const STORY_IMAGE_META = [
  { src: aboutStoryExplore, tall: false },
  { src: aboutStoryNurture, tall: true },
  { src: aboutStoryBelong, tall: false },
]

/**
 * Our Story — centered title, copy + CTA left, triple rounded photos right.
 */
function OurStorySection() {
  const sectionRef = useRef(null)
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const { t } = useLanguage()
  const about = settings?.about
  const paragraphs = t('about.storyParagraphs')
  const alts = t('about.storyAlts')
  const storyImages = STORY_IMAGE_META.map((meta, i) => ({
    ...meta,
    alt: alts[i] || '',
  }))

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="our-story-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-85 sm:w-16 lg:w-20"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-36 -scale-x-100 opacity-80 sm:w-44 lg:w-52"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 text-center sm:mb-12">
          <p className="section-eyebrow">{t('about.storyEyebrow')}</p>
          <h2
            id="our-story-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('about.storyTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('about.storyTitleHighlight')}
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#3d4a5c] sm:text-lg">
            {t('about.storySubtitle')}
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl space-y-4">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
              >
                {paragraph}
              </p>
            ))}
            <div className="pt-4">
              <Button onClick={openContactForm} className="rounded-full px-9">
                {about?.cta?.trim() || t('about.storyCta')}
              </Button>
            </div>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-4">
            {storyImages.map((item) => (
              <div
                key={item.alt}
                className={`overflow-hidden rounded-[1.75rem] shadow-[0_12px_28px_rgba(45,58,74,0.1)] sm:rounded-[2rem] ${
                  item.tall
                    ? 'h-72 w-[30%] max-w-[9.5rem] sm:h-96 sm:max-w-[11rem] lg:h-[28rem]'
                    : 'h-60 w-[28%] max-w-[8.5rem] sm:h-80 sm:max-w-[9.5rem] lg:h-96'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={280}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
