import { useRef } from 'react'
import programsIcon from '../../assets/New_World_Icon00018-removebg-preview.webp'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import { useSectionRevealGate } from '../../hooks/useSectionRevealGate'
import { useLanguage } from '../../i18n'
import AnimatedCard from '../ui/AnimatedCard'
import BrushHighlightText from '../ui/BrushHighlightText'
import Button from '../ui/Button'
import LazyImage from '../ui/LazyImage'

const IMAGE_STAGGER_MS = 280

function ProgramsSection() {
  const sectionRef = useRef(null)
  const { openContactForm } = useContactFormPopup()
  const { settings, programs } = useHomeData()
  const { t } = useLanguage()
  const copy = settings?.programs ?? {}
  const hasHighlight = Boolean(copy.title_highlight)
  const { cardsReady, allowImages, onHighlightComplete, skipEntrance } =
    useSectionRevealGate(hasHighlight, 'home-programs')

  if (programs.length === 0) return null

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-white pt-10 pb-10 sm:pt-12 sm:pb-10"
    >
      <ProgramsDecorations />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-8 text-center">
          {copy.label ? <p className="section-eyebrow">{copy.label}</p> : null}
          {copy.title || copy.title_highlight ? (
            <h2 className="section-title">
              {copy.title ? <>{copy.title} </> : null}
              {copy.title_highlight ? (
                <BrushHighlightText
                  triggerRef={sectionRef}
                  onceKey="home-programs-highlight"
                  onComplete={onHighlightComplete}
                >
                  {copy.title_highlight}
                </BrushHighlightText>
              ) : null}
            </h2>
          ) : null}
          {copy.subtitle ? <p className="section-lead">{copy.subtitle}</p> : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.id ?? program.title}
              program={program}
              index={index}
              cardsReady={cardsReady}
              allowImages={allowImages}
              skipEntrance={skipEntrance}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <Button variant="outlineCoral" onClick={openContactForm}>
            {t('home.programsEnquire')}
          </Button>
          <img
            src={programsIcon}
            alt=""
            width={144}
            height={144}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="pointer-events-none w-28 sm:w-32 lg:w-36"
          />
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, index, cardsReady, allowImages, skipEntrance }) {
  const accent = program.icon_color || '#5bb5a2'
  const lightBg = program.color || '#eef8f5'

  return (
    <AnimatedCard
      as="article"
      index={index}
      motionEnabled={false}
      className="program-card group card-surface flex h-full flex-col transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(45,58,74,0.12)]"
    >
      <div
        className="relative h-44 overflow-visible sm:h-48"
        style={{ backgroundColor: lightBg }}
      >
        {program.image ? (
          <LazyImage
            src={program.image}
            alt={program.title}
            enabled={allowImages}
            eager={false}
            staggerMs={index === 0 ? 0 : index * IMAGE_STAGGER_MS}
            rootMargin="80px"
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="absolute inset-0 z-0 h-full w-full"
          />
        ) : null}

        <svg
          className="absolute bottom-0 left-0 z-0 h-[28px] w-full"
          viewBox="0 0 400 28"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,18 C60,4 140,26 200,14 C260,2 340,24 400,12 L400,28 L0,28 Z"
            fill={lightBg}
          />
        </svg>

        <div
          className="absolute -bottom-5 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-md"
          style={{ backgroundColor: accent }}
        >
          {program.icon ? (
            <span aria-hidden="true">{program.icon}</span>
          ) : (
            <span className="text-sm font-bold text-white">
              {(program.title || '?').slice(0, 1)}
            </span>
          )}
        </div>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col"
        style={{
          backgroundColor: lightBg,
          borderBottom: `5px solid ${accent}`,
        }}
      >
        <div className="flex-1 px-5 pt-7 pb-6">
          <h3 className="mb-1 text-base font-extrabold text-brand-ink">
            {program.title}
          </h3>
          {program.age_range ? (
            <p className="mb-3 text-xs font-bold text-brand-ink">
              {program.age_range}
            </p>
          ) : null}
          {program.description ? (
            <p className="text-xs leading-relaxed text-brand-muted">
              {program.description}
            </p>
          ) : null}
        </div>
      </div>
    </AnimatedCard>
  )
}

function ProgramsDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg
        className="absolute top-16 left-8 h-8 w-8 text-[#f5c842] opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>
      <svg
        className="absolute right-10 bottom-24 h-6 w-6 text-[#f4a0b0] opacity-35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z" />
      </svg>
    </div>
  )
}

export default ProgramsSection
