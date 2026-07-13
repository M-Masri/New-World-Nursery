import heroCloud from '../../assets/hero-cloud.png'
import heroRainbow from '../../assets/hero-rainbow.png'
import heroWave from '../../assets/hero-wave.svg'

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <img
        src={heroRainbow}
        alt=""
        className="pointer-events-none absolute right-0 bottom-0 z-30 h-auto w-52 object-contain object-bottom-right sm:w-64 lg:w-80"
      />

      <HeroDecorations />

      <div className="relative z-10 mx-auto grid max-w-page items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="text-center lg:text-left">
          <p className="mb-4 text-xs font-extrabold tracking-[0.25em] text-[#8cb83a] uppercase">
            Nurturing Young Minds
          </p>

          <h1 className="mb-6 text-[2.4rem] leading-[1.15] font-extrabold sm:text-5xl lg:text-[3.4rem]">
            <span className="text-[#8cb83a]">A </span>
            <span className="text-[#f07a7a]">Happy </span>
            <span className="text-[#f5b942]">Place</span>
            <br />
            <span className="text-[#a682b8]">to </span>
            <span className="text-[#5bb5a2]">Learn </span>
            <span className="text-[#5a5a5a]">& </span>
            <span className="text-[#f07a7a]">Grow</span>
          </h1>

          <p className="mx-auto mb-9 max-w-md text-[15px] leading-relaxed text-[#5a5a5a] lg:mx-0">
            At New World Nursery, we provide a safe, caring and stimulating
            environment where children learn, explore and grow with confidence.
          </p>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <button
              type="button"
              className="rounded-xl bg-[#f07a7a] px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-md shadow-[#f07a7a]/25 transition hover:bg-[#e86a6a]"
            >
              Enquire Now!
            </button>
            <button
              type="button"
              className="rounded-xl border-2 border-[#5bb5a2] bg-white px-8 py-3 text-sm font-extrabold tracking-wide text-[#5bb5a2] uppercase transition hover:bg-[#eef8f5]"
            >
              Our Programs
            </button>
          </div>
        </div>

        <div className="relative flex w-full max-w-[700px] justify-center px-6 py-2 lg:justify-self-end lg:px-4">
          <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
            <defs>
              <clipPath id="heroImageCloud" clipPathUnits="objectBoundingBox">
                <circle cx="0.5" cy="0.34" r="0.24" />
                <circle cx="0.22" cy="0.42" r="0.2" />
                <circle cx="0.78" cy="0.42" r="0.2" />
                <circle cx="0.15" cy="0.54" r="0.15" />
                <circle cx="0.85" cy="0.54" r="0.15" />
                <circle cx="0.5" cy="0.7" r="0.22" />
                <circle cx="0.24" cy="0.66" r="0.17" />
                <circle cx="0.76" cy="0.66" r="0.17" />
              </clipPath>
            </defs>
          </svg>

          <div className="absolute -top-2 right-8 z-10 sm:right-12">
            <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="9" fill="#f5c842" opacity="0.9" />
              <g stroke="#f5a623" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="2" x2="18" y2="7" />
                <line x1="18" y1="29" x2="18" y2="34" />
                <line x1="2" y1="18" x2="7" y2="18" />
                <line x1="29" y1="18" x2="34" y2="18" />
                <line x1="6" y1="6" x2="9.5" y2="9.5" />
                <line x1="26.5" y1="26.5" x2="30" y2="30" />
                <line x1="6" y1="30" x2="9.5" y2="26.5" />
                <line x1="26.5" y1="9.5" x2="30" y2="6" />
              </g>
            </svg>
          </div>

          <div
            className="relative h-[280px] w-full max-w-[520px] sm:h-[310px] sm:max-w-[560px] lg:h-[340px] lg:max-w-[600px]"
            style={{ clipPath: 'url(#heroImageCloud)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&h=750&fit=crop"
              alt="Children playing with colorful blocks"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5"
        aria-hidden="true"
      >
        <span className="h-3 w-3 rounded-full bg-[#f07a7a]" />
        <span className="h-3 w-3 rounded-full bg-[#b8d86a]" />
        <span className="h-3 w-3 rounded-full bg-[#5bb5a2]" />
      </div>

      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 z-10 h-5 w-full" aria-hidden="true">
        <img
          src={heroWave}
          alt=""
          className="h-full w-full -scale-y-100"
        />
      </div>
    </section>
  )
}

const heartPath =
  'M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z'

const heroHearts = [
  { className: 'absolute top-[28%] left-[42%] h-4 w-4 text-[#f4a0b0] opacity-60' },
  { className: 'absolute top-[18%] right-[32%] h-3.5 w-3.5 text-[#f07a7a] opacity-50' },
  { className: 'absolute top-[10%] left-[58%] h-3 w-3 text-[#5bb5a2] opacity-45' },
  { className: 'absolute bottom-[24%] left-[10%] h-3.5 w-3.5 text-[#f4a0b0] opacity-55' },
  { className: 'absolute top-[65%] right-[20%] h-3 w-3 text-[#f07a7a] opacity-50' },
]

const heroDots = [
  { className: 'absolute top-[12%] left-[18%] h-3 w-3 rounded-full bg-[#f5c842] opacity-45' },
  { className: 'absolute top-[55%] right-[12%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40' },
  { className: 'absolute top-[22%] left-[30%] h-2.5 w-2.5 rounded-full bg-[#5bb5a2] opacity-45' },
  { className: 'absolute top-[48%] left-[54%] h-2 w-2 rounded-full bg-[#f07a7a] opacity-40' },
  { className: 'absolute bottom-[20%] right-[36%] h-2.5 w-2.5 rounded-full bg-[#f5c842] opacity-50' },
  { className: 'absolute top-[72%] left-[36%] h-2 w-2 rounded-full bg-[#8cb83a] opacity-45' },
  { className: 'absolute top-[16%] right-[14%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40' },
]

function HeroDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <img
        src={heroCloud}
        alt=""
        className="absolute bottom-0 left-0 h-auto w-48 opacity-50 object-contain object-bottom-left sm:w-64 lg:w-80 "
      />

      <svg
        className="absolute top-6 right-[8%] h-10 w-14 text-[#d6e8f0] opacity-70"
        viewBox="0 0 56 40"
      >
        <ellipse cx="18" cy="24" rx="16" ry="12" fill="currentColor" />
        <ellipse cx="34" cy="20" rx="18" ry="14" fill="currentColor" />
        <ellipse cx="46" cy="26" rx="12" ry="10" fill="currentColor" />
      </svg>

      <svg
        className="absolute top-[38%] left-[4%] h-8 w-8 text-[#8cb83a] opacity-50"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 4 C10 12 6 14 4 20 C12 18 14 22 16 28 C18 22 20 18 28 20 C26 14 22 12 16 4Z"
        />
      </svg>

      {heroHearts.map((heart) => (
        <svg key={heart.className} className={heart.className} viewBox="0 0 24 24">
          <path fill="currentColor" d={heartPath} />
        </svg>
      ))}

      {heroDots.map((dot) => (
        <div key={dot.className} className={dot.className} />
      ))}

      <svg
        className="absolute right-[5%] bottom-[30%] h-12 w-16 text-[#e8f0f4] opacity-60"
        viewBox="0 0 64 48"
      >
        <ellipse cx="20" cy="30" rx="18" ry="14" fill="currentColor" />
        <ellipse cx="38" cy="26" rx="20" ry="16" fill="currentColor" />
        <ellipse cx="52" cy="32" rx="14" ry="11" fill="currentColor" />
      </svg>
    </div>
  )
}

export default HeroSection
