import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import featuresIcon from '../../../assets/New_World_Icon00010-removebg-preview.webp'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'

const STATS_META = [
  { accent: '#5bb5a2', soft: '#eef8f5' },
  { accent: '#f4a0b0', soft: '#fff0f3' },
  { accent: '#f5b942', soft: '#fff8e8' },
  { accent: '#a682b8', soft: '#f5eef8' },
  { accent: '#7eb8d4', soft: '#eef6fb' },
  { accent: '#6db89a', soft: '#e8f6f0' },
]

/**
 * Stats & trust — network experience and educational credentials.
 */
function StatsTrustSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const stats = t('why.statsItems').map((item, i) => ({
    ...STATS_META[i],
    ...item,
  }))

  return (
    <section
      id="stats-trust"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 pb-28 sm:py-16 sm:pb-16"
      aria-labelledby="stats-trust-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-75 sm:w-16"
      />
      <img
        src={featuresIcon}
        alt=""
        width={140}
        height={140}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-2 z-20 w-24 opacity-90 sm:bottom-4 sm:left-4 sm:w-28 lg:w-32"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <p className="section-eyebrow !mb-3">{t('why.statsEyebrow')}</p>
          <h2
            id="stats-trust-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('why.statsTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('why.statsTitleHighlight')}
            </BrushHighlightText>
            .
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            {t('why.statsLead')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-[1.5rem] px-5 py-7 sm:rounded-[1.75rem] sm:px-6 sm:py-8"
              style={{ backgroundColor: stat.soft }}
            >
              <span
                className="absolute top-0 left-0 h-1 w-full"
                style={{ backgroundColor: stat.accent }}
                aria-hidden="true"
              />
              <p
                className="mb-2 text-4xl font-extrabold tabular-nums sm:text-5xl"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </p>
              <p className="mb-2 text-sm font-extrabold text-brand-ink">
                {stat.label}
              </p>
              <p className="text-xs leading-relaxed text-brand-muted sm:text-sm">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-brand-muted sm:mt-12 sm:text-[15px]">
          {t('why.statsClosing')}
        </p>
      </div>
    </section>
  )
}

export default StatsTrustSection
