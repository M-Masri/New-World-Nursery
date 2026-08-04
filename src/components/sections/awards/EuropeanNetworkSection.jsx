import { useRef } from 'react'
import {
  GraduationCap,
  HeartHandshake,
  School,
  Users,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import featuresIcon from '../../../assets/New_World_Icon00010-removebg-preview.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'

const NETWORK_STATS = [
  {
    value: '17+',
    label: 'Nurseries',
    detail:
      'Providing high-quality early years education across a well-established European network.',
    Icon: School,
    accent: '#5bb5a2',
    soft: '#eef8f5',
  },
  {
    value: '3+',
    label: 'Inclusive Primary Schools',
    detail:
      'Supporting children’s educational journey beyond the early years through inclusive, child-centred learning.',
    Icon: GraduationCap,
    accent: '#f4a0b0',
    soft: '#fff0f3',
  },
  {
    value: 'Leaders',
    label: 'Experienced Educational Leaders',
    detail:
      'A multidisciplinary team of educators, specialists and school leaders with many years of practical experience in early childhood and inclusive education.',
    Icon: Users,
    accent: '#f5b942',
    soft: '#fff8e8',
  },
  {
    value: 'One',
    label: 'Shared Educational Philosophy',
    detail:
      'Every nursery within our network is guided by the same commitment to quality, inclusion, child wellbeing and continuous educational development.',
    Icon: HeartHandshake,
    accent: '#a682b8',
    soft: '#f5eef8',
  },
]

/**
 * European Network — foundation story, network pillars, growth beyond borders.
 */
function EuropeanNetworkSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="european-network"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="european-network-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 w-28 -scale-x-100 opacity-70 sm:w-36"
      />
      <img
        src={featuresIcon}
        alt=""
        width={140}
        height={140}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-2 z-20 w-24 opacity-90 sm:right-4 sm:bottom-4 sm:w-28 lg:w-32"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <p className="section-eyebrow !mb-3">European Network</p>
          <h2
            id="european-network-heading"
            className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
          >
            A Strong Foundation.{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              A Shared Vision
            </BrushHighlightText>
            .
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-3">
            <p className="text-sm leading-relaxed text-[#3d4a5c] sm:text-[15px]">
              New World Nursery is part of a well-established European
              educational organisation that has been creating inspiring learning
              environments for children and families for more than 16 years.
            </p>
            <p className="text-sm leading-relaxed text-[#3d4a5c] sm:text-[15px]">
              Over the years, this network has grown into a community of
              nurseries, schools and educational specialists united by one shared
              belief: every child deserves an exceptional start in life.
            </p>
            <p className="text-sm leading-relaxed text-[#3d4a5c] sm:text-[15px]">
              Today, the same educational values, experience and commitment to
              quality continue to shape every New World Nursery, bringing trusted
              European expertise to families in Dubai.
            </p>
          </div>
        </div>

        <p className="mb-6 text-center text-[11px] font-extrabold tracking-[0.22em] text-[#5bb5a2] uppercase">
          Our Educational Network
        </p>

        <div className="mb-12 grid grid-cols-1 gap-3 sm:mb-14 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {NETWORK_STATS.map(({ value, label, detail, Icon, accent, soft }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-[1.5rem] px-5 py-7 sm:rounded-[1.75rem] sm:px-6 sm:py-8"
              style={{ backgroundColor: soft }}
            >
              <span
                className="absolute top-0 left-0 h-1 w-full"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
              <div className="mb-4 flex items-start justify-between gap-3">
                <p
                  className="text-3xl font-extrabold tabular-nums sm:text-4xl"
                  style={{ color: accent }}
                >
                  {value}
                </p>
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
              </div>
              <p className="mb-2 text-sm font-extrabold text-brand-ink sm:text-base">
                {label}
              </p>
              <p className="text-xs leading-relaxed text-brand-muted sm:text-sm">
                {detail}
              </p>
            </div>
          ))}
        </div>

        {/* Growing Beyond Borders — centered statement */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#eef8f5] px-6 py-10 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-14">
          <div className="mx-auto mb-6 flex max-w-xs items-center justify-center gap-3">
            <span className="h-px flex-1 bg-[#5bb5a2]/35" aria-hidden="true" />
            <span className="rounded-full bg-[#5bb5a2] px-4 py-1.5 text-[10px] font-extrabold tracking-[0.18em] text-white uppercase">
              From Europe to Dubai
            </span>
            <span className="h-px flex-1 bg-[#5bb5a2]/35" aria-hidden="true" />
          </div>

          <h3 className="text-2xl font-extrabold text-[#2d3a4a] sm:text-3xl">
            Growing Beyond Borders
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
            Our journey began in Europe. Today, we are proud to bring this
            experience to Dubai, creating a bridge between European educational
            heritage and the dynamic, multicultural spirit of the United Arab
            Emirates.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
            As our network continues to grow internationally, one thing remains
            unchanged: our commitment to placing children, families and
            exceptional education at the heart of everything we do.
          </p>
        </div>
      </div>
    </section>
  )
}

export default EuropeanNetworkSection
