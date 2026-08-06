import { lazy, Suspense, useEffect, useState } from 'react'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import { translateButtonLabel, useLanguage } from '../../i18n'
import { isMobilePerf } from '../../lib/mobilePerf'
import heroCloud from '../../assets/hero-cloud.png'
import heroHeart from '../../assets/hero-heart.webp'
import heroRainbow from '../../assets/hero-rainbow.webp'
import heroSun from '../../assets/hero-sun.webp'

const CloudScroll3D = lazy(() => import('../ui/CloudScroll3D'))

const TITLE_COLORS = ['#8cb83a', '#f4a0b0', '#f5b942', '#a682b8', '#5bb5a2', '#5a5a5a', '#f4a0b0']

function HeroCloudPhoto({ className = '', src, alt, fetchPriority = 'high' }) {
  return (
    <img
      src={src}
      alt={alt}
      width={600}
      height={340}
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 560px, 600px"
      fetchPriority={fetchPriority}
      decoding="async"
      className={`hero-cloud-mask block object-cover ${className}`}
    />
  )
}

function splitHeroTitleLines(title, pyramid = false) {
  const raw = String(title).trim()
  if (raw.includes('\n')) {
    return raw
      .split('\n')
      .map((line) => line.trim().split(/\s+/).filter(Boolean))
      .filter((line) => line.length > 0)
  }

  const words = raw.split(/\s+/).filter(Boolean)

  if (pyramid && words.length >= 5) {
    const short = Math.max(1, Math.floor(words.length / 4))
    const medium = Math.max(short + 1, Math.floor(words.length / 2) - short)
    const a = words.slice(0, short)
    const b = words.slice(short, short + medium)
    const c = words.slice(short + medium)
    if (c.length > 0) return [a, b, c]
  }

  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid), words.slice(mid)]
}

function HeroTitle({ title, pyramid = false, isRtl = false }) {
  const lines = splitHeroTitleLines(title, pyramid)
  const flatWords = lines.flat()
  const lastWordIndex = flatWords.length - 1
  const titleGreen = TITLE_COLORS[0]

  const renderWord = (word, index, offset, lineLength) => {
    const wordIndex = offset + index
    const color =
      pyramid && (wordIndex === 0 || wordIndex === lastWordIndex)
        ? titleGreen
        : TITLE_COLORS[wordIndex % TITLE_COLORS.length]
    const lower = word.toLowerCase()
    const isFirst = wordIndex === 0
    const isLast = wordIndex === lastWordIndex

    return (
      <span key={`${offset}-${word}-${index}`} className="relative inline-block" style={{ color }}>
        {isFirst ? (
          <TitleLeafAccent
            variant="start"
            className={`pointer-events-none absolute -top-5 h-9 w-10 sm:-top-5 sm:h-14 sm:w-16 lg:-top-4 ${
              isRtl
                ? '-right-11 scale-x-[-1] sm:-right-16 lg:-right-18'
                : '-left-11 sm:-left-16 lg:-left-18'
            }`}
          />
        ) : null}
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
        {index < lineLength - 1 ? '\u00A0' : ''}
        {isLast ? (
          <TitleLeafAccent
            variant="end"
            className={`pointer-events-none absolute -bottom-2 h-9 w-10 sm:-bottom-1 sm:h-14 sm:w-16 lg:bottom-0 ${
              isRtl
                ? '-left-11 scale-x-[-1] sm:-left-16 lg:-left-18'
                : '-right-11 sm:-right-16 lg:-right-18'
            }`}
          />
        ) : null}
      </span>
    )
  }

  let colorOffset = 0
  const titleSizeClass = pyramid
    ? 'max-w-full text-[1.55rem] leading-[1.3] font-extrabold break-words sm:text-4xl sm:leading-[1.2] lg:text-[2.75rem]'
    : 'max-w-full text-[1.75rem] leading-[1.25] font-extrabold break-words sm:text-5xl sm:leading-[1.15] lg:text-[3.4rem]'

  return (
    <h1 className={titleSizeClass}>
      {lines.map((line, lineIndex) => {
        const offset = colorOffset
        colorOffset += line.length
        return (
          <span key={`line-${lineIndex}`}>
            {lineIndex > 0 ? <br /> : null}
            <span className="inline-block max-w-full whitespace-normal sm:whitespace-nowrap">
              {line.map((word, i) => renderWord(word, i, offset, line.length))}
            </span>
          </span>
        )
      })}
    </h1>
  )
}

function HeroSection({
  override = null,
  onSecondaryClick = null,
  imageFetchPriority = 'high',
}) {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const { t, language, isRtl } = useLanguage()
  const hero = override ?? settings?.hero ?? null
  const [showCloud, setShowCloud] = useState(false)

  useEffect(() => {
    if (!hero) return undefined
    if (isMobilePerf()) return undefined

    let idleId = 0
    let delayId = 0
    const enable = () => setShowCloud(true)

    delayId = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(enable, { timeout: 2000 })
      } else {
        enable()
      }
    }, 2800)

    return () => {
      window.clearTimeout(delayId)
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [hero])

  if (!hero) return null

  const handleSecondary = () => {
    if (onSecondaryClick) {
      onSecondaryClick()
      return
    }
    document
      .getElementById('programs')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const primaryLabel = translateButtonLabel(hero.cta_primary, t, language)
  const secondaryLabel = translateButtonLabel(hero.cta_secondary, t, language)
  const buttonCaseClass = language === 'ar' ? 'normal-case' : 'uppercase'

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ direction: 'ltr' }}
    >
      {showCloud ? (
        <Suspense fallback={null}>
          <CloudScroll3D
            horizontalPosition={isRtl ? 0.12 : 0.88}
            driftAmplitude={0}
            bobAmplitude={10}
            bobSpeed={0.65}
          />
        </Suspense>
      ) : null}

      {/* Rainbow: LTR = right edge, RTL = left edge */}
      <img
        src={heroRainbow}
        alt=""
        width={288}
        height={160}
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute bottom-0 z-30 block w-48 sm:bottom-0 sm:w-60 lg:w-72 ${
          isRtl ? '-left-3 sm:-left-4' : '-right-3 sm:-right-4'
        }`}
      />

      <HeroDecorations isRtl={isRtl} />
      <HeroFlyingDecorations isRtl={isRtl} />

      <div className="relative z-10 mx-auto grid max-w-page items-center gap-10 page-gutter py-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-14">
        {/* Text column: LTR left / RTL right */}
        <div
          className={`text-center ${
            isRtl
              ? 'lg:order-2 lg:text-right'
              : 'lg:order-1 lg:text-left'
          }`}
        >
          {hero.eyebrow ? (
            <p
              className="mb-4 text-xs font-extrabold tracking-[0.25em] text-[#5bb5a2] uppercase"
              dir={isRtl ? 'rtl' : undefined}
            >
              {hero.eyebrow}
            </p>
          ) : null}

          {hero.title ? (
            <div
              className={`mb-6 text-center ${
                isRtl ? 'lg:text-right' : 'lg:text-left'
              }`}
              dir={isRtl ? 'rtl' : undefined}
            >
              <div className="relative inline-block max-w-full">
                <HeroTitle
                  title={hero.title}
                  pyramid={Boolean(hero.titlePyramid)}
                  isRtl={isRtl}
                />
              </div>
            </div>
          ) : null}

          {hero.subtitle ? (
            <p
              className={`mx-auto mb-9 max-w-md text-[15px] leading-relaxed text-[#5a5a5a] lg:mx-0 ${
                isRtl ? 'lg:ml-auto' : ''
              }`}
              dir={isRtl ? 'rtl' : undefined}
            >
              {hero.subtitle}
            </p>
          ) : null}

          {(primaryLabel || secondaryLabel) && (
            <div
              className={`flex flex-wrap justify-center gap-4 ${
                isRtl ? 'lg:justify-end' : 'lg:justify-start'
              }`}
            >
              {primaryLabel ? (
                <button
                  type="button"
                  onClick={openContactForm}
                  className={`rounded-xl bg-[#5bb5a2] px-8 py-3 text-sm font-extrabold tracking-wide text-white shadow-md shadow-[#5bb5a2]/25 transition hover:bg-[#4a9e8d] ${buttonCaseClass}`}
                >
                  {primaryLabel}
                </button>
              ) : null}
              {secondaryLabel ? (
                <button
                  type="button"
                  onClick={handleSecondary}
                  className={`rounded-xl border-2 border-[#5bb5a2] bg-white px-8 py-3 text-sm font-extrabold tracking-wide text-[#5bb5a2] transition hover:bg-[#eef8f5] ${buttonCaseClass}`}
                >
                  {secondaryLabel}
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Image column: LTR right / RTL left */}
        {hero.image ? (
          <div
            className={`relative flex w-full max-w-[700px] justify-center py-2 ${
              isRtl
                ? 'lg:order-1 lg:justify-self-start'
                : 'lg:order-2 lg:justify-self-end'
            }`}
          >
            <img
              src={heroSun}
              alt=""
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className={`pointer-events-none absolute -top-5 z-10 h-16 w-16 object-contain sm:-top-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:-top-7 lg:h-20 lg:w-20 ${
                isRtl
                  ? 'right-4 sm:right-6 lg:right-8'
                  : 'left-4 sm:left-6 lg:left-8'
              }`}
              aria-hidden="true"
            />

            <svg
              className={`pointer-events-none absolute top-11 z-10 h-4 w-4 rotate-45 text-[#f4a0b0] sm:top-12 sm:h-5 sm:w-5 lg:top-14 ${
                isRtl
                  ? 'right-10 sm:right-12 lg:right-14'
                  : 'left-10 sm:left-12 lg:left-14'
              }`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fill="currentColor" d={heartPath} />
            </svg>

            <HeroCloudPhoto
              className="h-[280px] w-full max-w-[520px] sm:h-[310px] sm:max-w-[560px] lg:h-[340px] lg:max-w-[600px]"
              src={hero.image}
              alt={hero.title || t('common.homeAria')}
              fetchPriority={imageFetchPriority}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

const heartPath =
  'M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z'

const heroHeartsLtr = [
  'absolute top-[28%] left-[42%] h-4 w-4 text-[#f4a0b0] opacity-60',
  'absolute top-[18%] right-[32%] h-3.5 w-3.5 text-[#f4a0b0] opacity-50',
  'absolute top-[10%] left-[58%] h-3 w-3 text-[#5bb5a2] opacity-45',
  'absolute bottom-[24%] left-[10%] h-3.5 w-3.5 text-[#f4a0b0] opacity-55',
  'absolute top-[65%] right-[20%] h-3 w-3 text-[#f4a0b0] opacity-50',
]

const heroHeartsRtl = [
  'absolute top-[28%] right-[42%] h-4 w-4 text-[#f4a0b0] opacity-60',
  'absolute top-[18%] left-[32%] h-3.5 w-3.5 text-[#f4a0b0] opacity-50',
  'absolute top-[10%] right-[58%] h-3 w-3 text-[#5bb5a2] opacity-45',
  'absolute bottom-[24%] right-[10%] h-3.5 w-3.5 text-[#f4a0b0] opacity-55',
  'absolute top-[65%] left-[20%] h-3 w-3 text-[#f4a0b0] opacity-50',
]

const heroDotsLtr = [
  'absolute top-[12%] left-[18%] h-3 w-3 rounded-full bg-[#f5c842] opacity-45',
  'absolute top-[55%] right-[12%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40',
  'absolute top-[22%] left-[30%] h-2.5 w-2.5 rounded-full bg-[#5bb5a2] opacity-45',
  'absolute top-[48%] left-[54%] h-2 w-2 rounded-full bg-[#f4a0b0] opacity-40',
  'absolute bottom-[20%] right-[36%] h-2.5 w-2.5 rounded-full bg-[#f5c842] opacity-50',
  'absolute top-[72%] left-[36%] h-2 w-2 rounded-full bg-[#8cb83a] opacity-45',
  'absolute top-[16%] right-[14%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40',
]

const heroDotsRtl = [
  'absolute top-[12%] right-[18%] h-3 w-3 rounded-full bg-[#f5c842] opacity-45',
  'absolute top-[55%] left-[12%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40',
  'absolute top-[22%] right-[30%] h-2.5 w-2.5 rounded-full bg-[#5bb5a2] opacity-45',
  'absolute top-[48%] right-[54%] h-2 w-2 rounded-full bg-[#f4a0b0] opacity-40',
  'absolute bottom-[20%] left-[36%] h-2.5 w-2.5 rounded-full bg-[#f5c842] opacity-50',
  'absolute top-[72%] right-[36%] h-2 w-2 rounded-full bg-[#8cb83a] opacity-45',
  'absolute top-[16%] left-[14%] h-2.5 w-2.5 rounded-full bg-[#a682b8] opacity-40',
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

function HeroFlyingDecorations({ isRtl = false }) {
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
      className={`pointer-events-none absolute inset-0 z-[5] overflow-hidden ${
        isRtl ? 'scale-x-[-1]' : ''
      }`}
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

function HeroDecorations({ isRtl = false }) {
  const hearts = isRtl ? heroHeartsRtl : heroHeartsLtr
  const dots = isRtl ? heroDotsRtl : heroDotsLtr

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <img
        src={heroCloud}
        alt=""
        className={`absolute bottom-0 z-[1] h-auto w-56 object-contain sm:w-72 lg:w-96 ${
          isRtl
            ? 'right-0 scale-x-[-1] opacity-70'
            : 'left-0 opacity-50'
        }`}
      />

      <svg
        className={`absolute top-6 h-10 w-14 text-[#d6e8f0] opacity-70 ${
          isRtl ? 'left-[8%]' : 'right-[8%]'
        }`}
        viewBox="0 0 56 40"
      >
        <ellipse cx="18" cy="24" rx="16" ry="12" fill="currentColor" />
        <ellipse cx="34" cy="20" rx="18" ry="14" fill="currentColor" />
        <ellipse cx="46" cy="26" rx="12" ry="10" fill="currentColor" />
      </svg>

      {hearts.map((className) => (
        <div key={className} className={className}>
          <svg className="h-full w-full" viewBox="0 0 24 24">
            <path fill="currentColor" d={heartPath} />
          </svg>
        </div>
      ))}

      {dots.map((className) => (
        <div key={className} className={className} />
      ))}

      <svg
        className={`absolute bottom-[30%] h-12 w-16 text-[#e8f0f4] opacity-60 ${
          isRtl ? 'left-[5%]' : 'right-[5%]'
        }`}
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
