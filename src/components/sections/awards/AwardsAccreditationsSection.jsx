import { useRef } from 'react'
import { Award, BookOpen, Landmark, RefreshCw } from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

const CREDENTIALS_META = [
  { Icon: BookOpen, accent: '#5bb5a2', soft: '#eef8f5' },
  { Icon: Landmark, accent: '#f4a0b0', soft: '#fff0f3' },
  { Icon: RefreshCw, accent: '#f5b942', soft: '#fff8e8' },
]

/**
 * Awards & Accreditations — featured award + credential foundations.
 */
function AwardsAccreditationsSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const accredLead = t('awards.accredLead')
  const eaglesParagraphs = t('awards.eaglesParagraphs')
  const credentials = t('awards.credentials').map((item, i) => ({
    ...CREDENTIALS_META[i],
    ...item,
  }))

  return (
    <section
      id="awards-accreditations"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="awards-accreditations-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-80 sm:w-16 lg:w-20"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-36 -scale-x-100 opacity-75 sm:w-44 lg:w-52"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 max-w-3xl sm:mb-14">
          <p className="section-eyebrow !mb-3 !text-left">
            {t('awards.accredEyebrow')}
          </p>
          <h2
            id="awards-accreditations-heading"
            className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
          >
            {t('awards.accredTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('awards.accredTitleHighlight')}
            </BrushHighlightText>
          </h2>
          {accredLead.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 48)}
              className={
                index === 0
                  ? 'mt-5 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base'
                  : 'mt-4 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Featured award — Eagles of Education */}
        <article className="mb-10 overflow-hidden rounded-[2rem] bg-[#eef8f5] sm:mb-12 sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="flex flex-col justify-center bg-[#5bb5a2] px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Award className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mb-3 text-[11px] font-extrabold tracking-[0.22em] text-white/80 uppercase">
                {t('awards.eaglesBadge')}
              </p>
              <h3 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {t('awards.eaglesTitle')}
              </h3>
              <p className="mt-2 text-sm font-semibold text-white/90 sm:text-[15px]">
                {t('awards.eaglesSubtitle')}
              </p>
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
              {eaglesParagraphs.map((paragraph, index) => {
                const isLast = index === eaglesParagraphs.length - 1
                if (isLast) {
                  return (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="mt-6 border-l-4 border-[#5bb5a2] pl-5 text-base font-extrabold leading-snug text-[#2d3a4a] sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  )
                }
                return (
                  <p
                    key={paragraph.slice(0, 48)}
                    className={
                      index === 0
                        ? 'text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base'
                        : 'mt-4 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base'
                    }
                  >
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        </article>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {credentials.map(({ label, title, text, Icon, accent, soft }) => (
            <article
              key={title}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
              style={{ backgroundColor: soft }}
            >
              <span
                className="h-1.5 w-full shrink-0"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
                    style={{ color: accent }}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p
                      className="text-[10px] font-extrabold tracking-[0.18em] uppercase"
                      style={{ color: accent }}
                    >
                      {label}
                    </p>
                    <h3 className="text-base font-extrabold text-[#2d3a4a] sm:text-lg">
                      {title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#3d4a5c] sm:text-[15px]">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AwardsAccreditationsSection
