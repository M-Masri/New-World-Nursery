import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import awardsIntro from '../../../assets/awards-network-intro.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

/**
 * Hero follow-up — bridging heritage with Dubai.
 */
function AwardsIntroSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const introParagraphs = t('awards.introParagraphs')
  const introWords = t('awards.introWords')

  return (
    <section
      id="awards-intro"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fff8f2] py-14 sm:py-16"
      aria-labelledby="awards-intro-heading"
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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] sm:min-h-[340px] sm:rounded-[2.25rem]">
            <img
              src={awardsIntro}
              alt={t('awards.introAlt')}
              width={640}
              height={720}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/65 via-[#2d3a4a]/10 to-transparent" />
            <p className="absolute right-5 bottom-5 left-5 text-lg font-extrabold leading-snug text-white sm:right-6 sm:bottom-6 sm:left-6 sm:text-xl">
              {t('awards.introOverlay')}
            </p>
          </div>

          <div>
            <p className="section-eyebrow !mb-3 !text-left">
              {t('awards.introEyebrow')}
            </p>
            <h2
              id="awards-intro-heading"
              className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
            >
              {t('awards.introTitleBefore')}{' '}
              <BrushHighlightText triggerRef={sectionRef}>
                {t('awards.introTitleHighlight')}
              </BrushHighlightText>
            </h2>

            <div className="mt-8 space-y-5">
              {introParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#5bb5a2]/20 pt-8">
              {introWords.map((item) => (
                <div key={item.word}>
                  <span
                    className="mb-2 block h-1 w-8 rounded-full"
                    style={{ backgroundColor: item.accent }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-lg font-extrabold sm:text-xl"
                    style={{ color: item.accent }}
                  >
                    {item.word}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AwardsIntroSection
