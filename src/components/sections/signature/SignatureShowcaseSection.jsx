import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import signatureShowcase from '../../../assets/signature-showcase.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

/**
 * Signature programmes showcase — editorial split with photo.
 */
function SignatureShowcaseSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const intro = t('signature.showcaseIntro')
  const words = t('signature.words')

  return (
    <section
      id="signature-showcase"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-20"
      aria-labelledby="signature-showcase-heading"
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-eyebrow !mb-3 !text-left">
              {t('signature.showcaseEyebrow')}
            </p>
            <h2
              id="signature-showcase-heading"
              className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
            >
              {t('signature.showcaseTitleBefore')}{' '}
              <BrushHighlightText triggerRef={sectionRef}>
                {t('signature.showcaseTitleHighlight')}
              </BrushHighlightText>
            </h2>

            <div className="mt-8 space-y-4">
              {intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#5bb5a2]/20 pt-8">
              {words.map((item) => (
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

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-[2.5rem] bg-[#eef8f5] sm:-inset-4"
              aria-hidden="true"
            />
            <img
              src={signatureShowcase}
              alt=""
              width={720}
              height={860}
              loading="lazy"
              decoding="async"
              className="relative z-10 aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_22px_50px_rgba(45,58,74,0.14)] sm:rounded-[2.25rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignatureShowcaseSection
