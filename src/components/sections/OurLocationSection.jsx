import { startTransition, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import locationIcon from '../../assets/New_World_Icon00032-removebg-preview.webp'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import AnimatedCard from '../ui/AnimatedCard'
import BrushHighlightText from '../ui/BrushHighlightText'
import LazyImage from '../ui/LazyImage'

const HIGHLIGHT_PRIORITY_MS = 550
const IMAGE_STAGGER_MS = 220

function OurLocationSection() {
  const sectionRef = useRef(null)
  const { settings, locations } = useHomeData()
  const copy = settings?.locations ?? {}
  const hasHighlight = Boolean(copy.title_highlight)
  const [allowImages, setAllowImages] = useState(!hasHighlight)

  useEffect(() => {
    if (!hasHighlight) setAllowImages(true)
  }, [hasHighlight])

  const handleHighlightReveal = () => {
    window.setTimeout(() => {
      startTransition(() => setAllowImages(true))
    }, HIGHLIGHT_PRIORITY_MS)
  }

  if (locations.length === 0) return null

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fff8f2] pt-10 pb-10 sm:pt-12 sm:pb-10"
    >
      <img
        src={locationIcon}
        alt=""
        width={160}
        height={160}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-20 w-28 opacity-95 sm:w-32 lg:w-40"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-8 text-center">
          {copy.label ? <p className="section-eyebrow">{copy.label}</p> : null}
          {copy.title || copy.title_highlight ? (
            <h2 className="section-title">
              {copy.title ? <>{copy.title} </> : null}
              {copy.title_highlight ? (
                <BrushHighlightText
                  triggerRef={sectionRef}
                  onReveal={handleHighlightReveal}
                >
                  {copy.title_highlight}
                </BrushHighlightText>
              ) : null}
            </h2>
          ) : null}
          {copy.subtitle ? (
            <p className="section-lead max-w-2xl">{copy.subtitle}</p>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location, index) => (
            <LocationCard
              key={location.id ?? index}
              location={location}
              index={index}
              allowImages={allowImages}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationCard({ location, index, allowImages }) {
  const { openContactForm } = useContactFormPopup()
  const accent = location.badge_color || '#5bb5a2'

  const handleVisit = () => {
    if (location.visit_url?.startsWith('http')) {
      window.open(location.visit_url, '_blank', 'noopener,noreferrer')
      return
    }
    openContactForm()
  }

  return (
    <AnimatedCard
      as="article"
      index={index}
      className="location-card group card-surface transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(45,58,74,0.12)]"
    >
      <div className="relative h-44 overflow-hidden bg-[#eef8f5] sm:h-48">
        {location.image ? (
          <LazyImage
            src={location.image}
            alt={`${location.city}, ${location.country}`}
            enabled={allowImages}
            eager={false}
            staggerMs={index === 0 ? 0 : index * IMAGE_STAGGER_MS}
            rootMargin="80px"
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="absolute inset-0 h-full w-full"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/80 via-[#2d3a4a]/20 to-transparent" />

        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide text-white uppercase shadow-sm"
          style={{ backgroundColor: accent }}
        >
          {location.city}
        </span>

        <div className="absolute right-3 bottom-3 left-3">
          <p className="text-[10px] font-bold tracking-wide text-white/80 uppercase">
            {location.country}
          </p>
          <h3 className="text-lg font-extrabold text-white">{location.city}</h3>
        </div>
      </div>

      <div className="border-t-4 p-4" style={{ borderColor: accent }}>
        <ul className="space-y-3">
          {location.address ? (
            <LocationDetail icon={MapPin} text={location.address} />
          ) : null}
          {location.phone ? (
            <LocationDetail icon={Phone} text={location.phone} />
          ) : null}
          {location.email ? (
            <LocationDetail icon={Mail} text={location.email} />
          ) : null}
          {location.working_hours ? (
            <LocationDetail icon={Clock} text={location.working_hours} />
          ) : null}
        </ul>

        <button
          type="button"
          onClick={handleVisit}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#5bb5a2] transition group-hover:gap-2.5"
        >
          Plan a Visit
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </AnimatedCard>
  )
}

function LocationDetail({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-2 text-xs text-brand-muted">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-nursery-mint">
        <Icon className="h-3.5 w-3.5 text-[#5bb5a2]" />
      </span>
      <span className="pt-1 leading-relaxed">{text}</span>
    </li>
  )
}

export default OurLocationSection
