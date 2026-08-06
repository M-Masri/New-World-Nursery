import { useRef } from 'react'
import {
  BookOpen,
  Compass,
  Globe2,
  HeartHandshake,
  Landmark,
  Scale,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

const POINT_META = [
  { Icon: Scale, accent: '#f5b942', soft: '#fff8e8' },
  { Icon: Compass, accent: '#f4a0b0', soft: '#fff0f3' },
  { Icon: Globe2, accent: '#5bb5a2', soft: '#eef8f5' },
]

const FOUNDATION_META = [
  { Icon: BookOpen, accent: '#5bb5a2' },
  { Icon: Landmark, accent: '#f4a0b0' },
  { Icon: Globe2, accent: '#f5b942' },
  { Icon: HeartHandshake, accent: '#a682b8' },
]

/**
 * EYFS + KHDA — lead copy, highlight points, foundation grid.
 */
function EyfsKhdaSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const points = t('philosophy.eyfsPoints').map((item, i) => ({
    ...POINT_META[i],
    ...item,
  }))
  const foundations = t('philosophy.foundations').map((item, i) => ({
    ...FOUNDATION_META[i],
    ...item,
  }))

  return (
    <section
      id="eyfs-khda"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="eyfs-khda-heading"
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
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-14 opacity-75 sm:w-18"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 grid gap-8 lg:mb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="section-eyebrow !mb-3 !text-left">
              {t('philosophy.eyfsEyebrow')}
            </p>
            <h2
              id="eyfs-khda-heading"
              className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
            >
              {t('philosophy.eyfsTitleBefore')}{' '}
              <BrushHighlightText triggerRef={sectionRef}>
                {t('philosophy.eyfsTitleHighlight')}
              </BrushHighlightText>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base lg:pb-1">
            {t('philosophy.eyfsLead')}
          </p>
        </div>

        <div className="mb-12 grid gap-5 sm:mb-14 lg:grid-cols-3 lg:gap-6">
          {points.map(({ label, title, text, Icon, accent, soft }) => (
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

        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-[#5bb5a2]/15 sm:grid-cols-2">
          {foundations.map(({ short, title, text, Icon, accent }) => (
            <article
              key={title}
              className="bg-white p-6 transition hover:bg-[#faf7f2] sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${accent}22`, color: accent }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.16em] uppercase"
                  style={{ backgroundColor: `${accent}22`, color: accent }}
                >
                  {short}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-extrabold text-[#2d3a4a]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EyfsKhdaSection
