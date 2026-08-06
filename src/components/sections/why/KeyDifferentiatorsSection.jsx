import { useRef } from 'react'
import {
  Accessibility,
  BedDouble,
  Building2,
  Dumbbell,
  Leaf,
  Sparkles,
  Trees,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

const DIFF_META = [
  { id: 'd1', icon_color: '#5bb5a2', soft: '#eef8f5', Icon: Building2 },
  { id: 'd2', icon_color: '#f4a0b0', soft: '#fff0f3', Icon: Trees },
  { id: 'd3', icon_color: '#f5b942', soft: '#fff8e8', Icon: Sparkles },
  { id: 'd4', icon_color: '#a682b8', soft: '#f5eef8', Icon: Dumbbell },
  { id: 'd5', icon_color: '#7eb8d4', soft: '#eef6fb', Icon: BedDouble },
  { id: 'd6', icon_color: '#6db89a', soft: '#e8f6f0', Icon: Leaf },
  { id: 'd7', icon_color: '#e07a8a', soft: '#fdf0f2', Icon: Accessibility },
]

/**
 * Key differentiators — editorial numbered rows.
 */
function KeyDifferentiatorsSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const differentiators = t('why.diffItems').map((item, i) => ({
    ...DIFF_META[i],
    ...item,
  }))

  return (
    <section
      id="key-differentiators"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="differentiators-heading"
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
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-32 -scale-x-100 opacity-75 sm:w-40 lg:w-48"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 max-w-2xl sm:mb-14">
          <p className="section-eyebrow !mb-3">{t('why.diffEyebrow')}</p>
          <h2
            id="differentiators-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('why.diffTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('why.diffTitleHighlight')}
            </BrushHighlightText>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            {t('why.diffLead')}
          </p>
        </div>

        <ol className="m-0 list-none space-y-4 p-0 sm:space-y-5">
          {differentiators.map((item, index) => {
            const Icon = item.Icon
            const n = String(index + 1).padStart(2, '0')
            const reverse = index % 2 === 1

            return (
              <li
                key={item.id}
                className={`grid items-center gap-5 rounded-[1.75rem] px-5 py-6 sm:gap-8 sm:rounded-[2rem] sm:px-8 sm:py-7 lg:grid-cols-[7rem_1fr_auto] ${
                  reverse ? 'lg:grid-cols-[auto_1fr_7rem]' : ''
                }`}
                style={{ backgroundColor: item.soft }}
              >
                <div
                  className={`flex items-center gap-4 ${
                    reverse ? 'lg:order-3 lg:justify-end' : ''
                  }`}
                >
                  <span
                    className="text-3xl font-extrabold tabular-nums sm:text-4xl"
                    style={{ color: item.icon_color }}
                  >
                    {n}
                  </span>
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-14 sm:w-14"
                    style={{ color: item.icon_color }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>

                <div className={reverse ? 'lg:order-2' : ''}>
                  <h3 className="mb-1.5 text-xl font-extrabold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`hidden h-16 w-1.5 rounded-full lg:block ${
                    reverse ? 'lg:order-1' : ''
                  }`}
                  style={{ backgroundColor: item.icon_color }}
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default KeyDifferentiatorsSection
