import { lazy, Suspense, useEffect, useState } from 'react'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import heroCloud from '../../assets/hero-cloud.png'
import heroHeart from '../../assets/hero-heart.webp'
import heroRainbow from '../../assets/hero-rainbow.webp'
import heroSun from '../../assets/hero-sun.webp'

const CloudScroll3D = lazy(() => import('../ui/CloudScroll3D'))

const TITLE_COLORS = ['#8cb83a', '#f4a0b0', '#f5b942', '#a682b8', '#5bb5a2', '#5a5a5a', '#f4a0b0']

function HeroCloudPhoto({ className = '', src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      width={600}
      height={340}
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 560px, 600px"
      fetchPriority="high"
      decoding="async"
      className={`hero-cloud-mask block object-cover ${className}`}
    />
  )
}

function HeroTitle({ title }) {
  const words = title.trim().split(/\s+/).filter(Boolean)
  const mid = Math.ceil(words.length / 2)
  const firstLine = words.slice(0, mid)
  const secondLine = words.slice(mid)

  const renderWord = (word, index, offset) => {
    const color = TITLE_COLORS[(offset + index) % TITLE_COLORS.length]
    const lower = word.toLowerCase()

    return (
      <span key={`${offset}-${word}-${index}`} className="relative inline-block" style={{ color }}>
        {lower === 'place' ? (
          <img
            src={heroHeart}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -top-7 left-1/2 h-8 w-8 -translate-x-1/2 object-contain sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            aria-hidden="true"
          />
        ) : null}
        {word}
        {index < (offset === 0 ? firstLine.length : secondLine.length) - 1 ? '\u00A0' : ''}
        {lower === 'grow' ? (
          <TitleLeafAccent
            variant="end"
            className="pointer-events-none absolute -right-11 -bottom-5 h-12 w-14 sm:-right-13 sm:-bottom-4 sm:h-14 sm:w-16 lg:-right-14 lg:-bottom-3"
          />
        ) : null}
      </span>
    )
  }

  return (
    <h1 className="text-[2.4rem] leading-[1.15] font-extrabold sm:text-5xl lg:text-[3.4rem]">
      {firstLine.map((word, i) => renderWord(word, i, 0))}
      {secondLine.length > 0 ? <br /> : null}
      {secondLine.map((word, i) => renderWord(word, i, firstLine.length))}
    </h1>
  )
}

function HeroSection() {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const hero = settings?.hero ?? null
  const [showCloud, setShowCloud] = useState(false)

  useEffect(() => {
    if (!hero) return undefined

    let idleId = 0
    let timer = 0

    const enable = () => setShowCloud(true)

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 1200 })
    } else {
      timer = window.setTimeout(enable, 400)
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timer) window.clearTimeout(timer)
    }
  }, [hero])

  if (!hero) return null

  return (
    <section className="relative overflow-hidden bg-white">
      {showCloud ? (
        <Suspense fallback={null}>
          <CloudScroll3D driftAmplitude={0} bobAmplitude={10} bobSpeed={0.65} />
        </Suspense>
      ) : null}

      <img
        src={heroRainbow}
        alt=""
        width={288}
        height={160}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -right-3 bottom-0 z-30 block w-48 sm:-right-4 sm:bottom-0 sm:w-60 lg:w-72"
      />

      <HeroDecorations />
      <HeroFlyingDecorations />

      <div className="relative z-10 mx-auto grid max-w-page items-center gap-10 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:py-14">
        <div className="text-center lg:text-left">
          {hero.eyebrow ? (
            <p className="mb-4 text-xs font-extrabold tracking-[0.25em] text-[#5bb5a2] uppercase">
              {hero.eyebrow}
            </p>
          ) : null}

          {hero.title ? (
            <div className="mb-6 text-center lg:text-left">
              <div className="relative inline-block">
                <TitleLeafAccent
                  variant="start"
                  className="pointer-events-none absolute -left-12 -top-6 h-12 w-14 sm:-left-14 sm:-top-5 sm:h-14 sm:w-16 lg:-left-16 lg:-top-4"
                />
                <HeroTitle title={hero.title} />
              </div>
            </div>
          ) : null}

          {hero.subtitle ? (
            <p className="mx-auto mb-9 max-w-md text-[15px] leading-relaxed text-[#5a5a5a] lg:mx-0">
              {hero.subtitle}
            </p>
          ) : null}

          {(hero.cta_primary || hero.cta_secondary) && (
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {hero.cta_primary ? (
                <button
                  type="button"
                  onClick={openContactForm}
                  className="rounded-xl bg-[#5bb5a2] px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-md shadow-[#5bb5a2]/25 transition hover:bg-[#4a9e8d]"
                >
                  {hero.cta_primary}
                </button>
              ) : null}
              {hero.cta_secondary ? (
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById('programs')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="rounded-xl border-2 border-[#5bb5a2] bg-white px-8 py-3 text-sm font-extrabold tracking-wide text-[#5bb5a2] uppercase transition hover:bg-[#eef8f5]"
                >
                  {hero.cta_secondary}
                </button>
              ) : null}
            </div>
          )}
        </div>

        {hero.image ? (
          <div className="relative flex w-full max-w-[700px] justify-center px-6 py-2 lg:justify-self-end lg:px-4">
            <img
              src={heroSun}
              alt=""
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -top-5 left-4 z-10 h-16 w-16 object-contain sm:-top-6 sm:left-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:-top-7 lg:left-8 lg:h-20 lg:w-20"
              aria-hidden="true"
            />

            <svg
              className="pointer-events-none absolute top-11 left-10 z-10 h-4 w-4 rotate-45 text-[#f4a0b0] sm:top-12 sm:left-12 sm:h-5 sm:w-5 lg:top-14 lg:left-14"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fill="currentColor" d={heartPath} />
            </svg>

            <HeroCloudPhoto
              className="h-[280px] w-full max-w-[520px] sm:h-[310px] sm:max-w-[560px] lg:h-[340px] lg:max-w-[600px]"
              src={hero.image}
              alt={hero.title || 'Nursery'}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

const heartPath =
  'M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z'

const heroHearts = [
  'absolute top-[28%] left-[42%] h-4 w-4 text-[#f4a0b0] opacity-60',
  'absolute top-[18%] right-[32%] h-3.5 w-3.5 text-[#f4a0b0] opacity-50',
  'absolute top-[10%] left-[58%] h-3 w-3 text-[#5bb5a2] opacity-45',
  'absolute bottom-[24%] left-[10%] h-3.5 w-3.5 text-[#f4a0b0] opacity-55',
  'absolute top-[65%] right-[20%] h-3 w-3 text-[#f4a0b0] opacity-50',
]

const heroDots = [
  'absolute top-[12%] left-[18%] h-3 w-3 rounded-full bg-[#f5c842] opacity-45',
  'absolute top-[55%] right-[12%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40',
  'absolute top-[22%] left-[30%] h-2.5 w-2.5 rounded-full bg-[#5bb5a2] opacity-45',
  'absolute top-[48%] left-[54%] h-2 w-2 rounded-full bg-[#f4a0b0] opacity-40',
  'absolute bottom-[20%] right-[36%] h-2.5 w-2.5 rounded-full bg-[#f5c842] opacity-50',
  'absolute top-[72%] left-[36%] h-2 w-2 rounded-full bg-[#8cb83a] opacity-45',
  'absolute top-[16%] right-[14%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40',
]

const flyingItems = [
  { id: 1, type: 'heart', top: '8%', duration: 36, delay: 0, size: 'h-4 w-4', color: 'text-[#f4a0b0]', opacity: 0.32 },
  { id: 2, type: 'dot', top: '18%', duration: 42, delay: 4, size: 'h-2.5 w-2.5', color: 'bg-[#f5c842]', opacity: 0.28 },
  { id: 3, type: 'heart', top: '28%', duration: 38, delay: 8, size: 'h-3 w-3', color: 'text-[#f4a0b0]', opacity: 0.3 },
  { id: 4, type: 'dot', top: '38%', duration: 44, delay: 2, size: 'h-3 w-3', color: 'bg-[#5bb5a2]', opacity: 0.26 },
  { id: 5, type: 'heart', top: '48%', duration: 40, delay: 12, size: 'h-3.5 w-3.5', color: 'text-[#a682b8]', opacity: 0.28 },
  { id: 6, type: 'dot', top: '58%', duration: 46, delay: 6, size: 'h-2 w-2', color: 'bg-[#f4a0b0]', opacity: 0.25 },
  { id: 7, type: 'heart', top: '68%', duration: 42, delay: 16, size: 'h-3 w-3', color: 'text-[#5bb5a2]', opacity: 0.28 },
  { id: 8, type: 'dot', top: '78%', duration: 48, delay: 10, size: 'h-2.5 w-2.5', color: 'bg-[#8cb83a]', opacity: 0.26 },
  { id: 9, type: 'heart', top: '22%', duration: 44, delay: 20, size: 'h-3 w-3', color: 'text-[#f4a0b0]', opacity: 0.26 },
  { id: 10, type: 'dot', top: '52%', duration: 50, delay: 14, size: 'h-2.5 w-2.5', color: 'bg-[#7eb8d4]', opacity: 0.24 },
  { id: 11, type: 'heart', top: '72%', duration: 46, delay: 24, size: 'h-3.5 w-3.5', color: 'text-[#8cb83a]', opacity: 0.26 },
  { id: 12, type: 'dot', top: '42%', duration: 52, delay: 18, size: 'h-2 w-2', color: 'bg-[#f5c842]', opacity: 0.24 },
]

const FLY_SPEED = 1.05

function HeroFlyingDecorations() {
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const update = () => setIsNarrow(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (isNarrow) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {flyingItems.map((item) => (
        <div
          key={item.id}
          className="hero-fly-item"
          style={{
            top: item.top,
            animationDuration: `${item.duration * FLY_SPEED}s`,
            animationDelay: `${item.delay * FLY_SPEED}s`,
            '--hero-fly-opacity': item.opacity,
          }}
        >
          {item.type === 'heart' ? (
            <svg className={`${item.size} ${item.color}`} viewBox="0 0 24 24">
              <path fill="currentColor" d={heartPath} />
            </svg>
          ) : (
            <span className={`block rounded-full ${item.size} ${item.color}`} />
          )}
        </div>
      ))}
    </div>
  )
}

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

      {heroHearts.map((className) => (
        <div key={className} className={className}>
          <svg className="h-full w-full" viewBox="0 0 24 24">
            <path fill="currentColor" d={heartPath} />
          </svg>
        </div>
      ))}

      {heroDots.map((className) => (
        <div key={className} className={className} />
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

function TitleLeafAccent({ className = '', variant = 'start' }) {
  if (variant === 'end') {
    return (
      <svg className={`text-[#9aab72] ${className}`} viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
        <ellipse cx="7.5" cy="10" rx="2" ry="7" transform="rotate(38 11 10)" opacity="0.9" />
        <ellipse cx="13.5" cy="12" rx="2" ry="7" transform="rotate(85 13 12.5)" opacity="0.9" />
      </svg>
    )
  }

  return (
    <svg className={`text-[#b8d86a] ${className}`} viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
      <ellipse cx="7.5" cy="12" rx="2" ry="7" transform="rotate(-68 10.5 15)" opacity="0.9" />
      <ellipse cx="13.5" cy="10" rx="2" ry="7" transform="rotate(-20 20.5 12)" opacity="0.9" />
    </svg>
  )
}

export default HeroSection
