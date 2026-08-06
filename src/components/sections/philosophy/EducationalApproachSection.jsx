import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import philosophyApproach from '../../../assets/philosophy-approach.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

/**
 * Educational approach — large photo left, stacked statement blocks right.
 */
function EducationalApproachSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const paragraphs = t('philosophy.approachParagraphs')

  return (
    <section
      id="educational-approach"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fff8f2] py-14 sm:py-16"
      aria-labelledby="educational-approach-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 w-28 -scale-x-100 opacity-70 sm:w-36"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-12 opacity-80 sm:w-16"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="section-eyebrow !mb-3 !text-left">
            {t('philosophy.approachEyebrow')}
          </p>
          <h2
            id="educational-approach-heading"
            className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
          >
            {t('philosophy.approachTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('philosophy.approachTitleHighlight')}
            </BrushHighlightText>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-[360px] sm:rounded-[2.25rem] lg:min-h-full">
            <img
              src={philosophyApproach}
              alt=""
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/70 via-[#2d3a4a]/10 to-transparent" />
            <p className="absolute right-5 bottom-5 left-5 text-lg font-extrabold leading-snug text-white sm:right-6 sm:bottom-6 sm:left-6 sm:text-xl">
              {t('philosophy.approachOverlay')}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <div
                key={paragraph.slice(0, 36)}
                className={`rounded-[1.5rem] px-5 py-5 sm:rounded-[1.75rem] sm:px-6 sm:py-6 ${
                  index === 0
                    ? 'bg-white'
                    : index === 1
                      ? 'bg-[#eef8f5]'
                      : 'bg-[#5bb5a2] text-white'
                }`}
              >
                <span
                  className={`mb-2 block text-[11px] font-extrabold tracking-[0.2em] uppercase ${
                    index === 2 ? 'text-white/80' : 'text-[#5bb5a2]'
                  }`}
                >
                  0{index + 1}
                </span>
                <p
                  className={`text-[15px] leading-relaxed sm:text-base ${
                    index === 2 ? 'text-white' : 'text-[#3d4a5c]'
                  }`}
                >
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationalApproachSection
