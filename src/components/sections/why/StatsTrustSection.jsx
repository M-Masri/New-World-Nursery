import aboutLeaf from '../../../assets/about-leaf.webp'
import featuresIcon from '../../../assets/New_World_Icon00010-removebg-preview.webp'

const STATS = [
  {
    value: '15+',
    label: 'Years of warm care',
    accent: '#5bb5a2',
    soft: '#eef8f5',
  },
  {
    value: '200+',
    label: 'Families welcomed',
    accent: '#f4a0b0',
    soft: '#fff0f3',
  },
  {
    value: '1:6',
    label: 'Thoughtful care ratio',
    accent: '#f5b942',
    soft: '#fff8e8',
  },
  {
    value: '100%',
    label: 'Play-led learning days',
    accent: '#a682b8',
    soft: '#f5eef8',
  },
]

/**
 * Stats & trust — white section softened with home leaf + icon décor.
 */
function StatsTrustSection() {
  return (
    <section
      id="stats-trust"
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
        <div className="mb-10 grid items-end gap-6 lg:mb-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="section-eyebrow !mb-3">Stats & trust</p>
            <h2
              id="stats-trust-heading"
              className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
            >
              Trust you can{' '}
              <span className="relative inline-block">
                feel
                <span
                  className="absolute right-0 -bottom-2 left-0 h-[3px] w-full rounded-full bg-[#5bb5a2]"
                  aria-hidden="true"
                />
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-brand-muted sm:text-[15px] lg:justify-self-end lg:text-right">
            Numbers that reflect our care — and the families who grow with us
            every day in Al Barsha.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-[1.5rem] px-4 py-7 text-center sm:rounded-[1.75rem] sm:px-5 sm:py-9"
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
              <p className="mx-auto max-w-[9rem] text-[11px] font-bold leading-snug tracking-wide text-brand-muted uppercase sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsTrustSection
