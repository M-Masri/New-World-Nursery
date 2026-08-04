import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import featuresIcon from '../../../assets/New_World_Icon00010-removebg-preview.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'

const STATS = [
  {
    value: '16+',
    label: 'Years of Educational Experience',
    detail:
      'Supporting children and families through more than a decade of continuous educational development.',
    accent: '#5bb5a2',
    soft: '#eef8f5',
  },
  {
    value: '17+',
    label: 'Nurseries Across Europe',
    detail:
      'A well-established network delivering high-quality early years education across multiple locations.',
    accent: '#f4a0b0',
    soft: '#fff0f3',
  },
  {
    value: '3+',
    label: 'Inclusive Primary Schools',
    detail:
      'Extending our educational journey beyond the early years with specialist experience in inclusive education.',
    accent: '#f5b942',
    soft: '#fff8e8',
  },
  {
    value: '1000s',
    label: 'Children & Families Supported',
    detail:
      'Years of practical experience working in partnership with families and helping children thrive.',
    accent: '#a682b8',
    soft: '#f5eef8',
  },
  {
    value: 'EYFS',
    label: 'British International Curriculum',
    detail:
      'Delivering a globally recognised framework for early childhood education, fully aligned with KHDA requirements.',
    accent: '#7eb8d4',
    soft: '#eef6fb',
  },
  {
    value: 'UAE',
    label: 'A Growing International Network',
    detail:
      'Bringing trusted European educational expertise to families in Dubai, with a long-term vision for international growth.',
    accent: '#6db89a',
    soft: '#e8f6f0',
  },
]

/**
 * Stats & trust — network experience and educational credentials.
 */
function StatsTrustSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="stats-trust"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
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
        className="pointer-events-none absolute bottom-2 left-2 z-20 w-24 opacity-90 sm:bottom-4 sm:left-4 sm:w-28 lg:w-32"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <p className="section-eyebrow !mb-3">Stats & trust</p>
          <h2
            id="stats-trust-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Trusted by Experience.{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              Built for the Future
            </BrushHighlightText>
            .
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            The trust of families is earned through consistency, experience and a
            long-term commitment to excellence in early childhood education. Every
            New World Nursery is built on proven educational expertise and
            internationally recognised standards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {STATS.map((stat) => (
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
          Every number tells part of our story. Behind each one are children who
          have grown with confidence, families who have placed their trust in us
          and educators who share our commitment to exceptional early years
          education.
        </p>
      </div>
    </section>
  )
}

export default StatsTrustSection
