import { useRef } from 'react'
import { useSectionRevealGate } from '../../../hooks/useSectionRevealGate'
import { useLanguage } from '../../../i18n'
import AnimatedCard from '../../ui/AnimatedCard'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LazyImage from '../../ui/LazyImage'
import aboutKids from '../../../assets/about-kids.webp'
import heroKids from '../../../assets/hero-kids.webp'

const IMAGE_STAGGER_MS = 280

const AGE_META = [
  {
    id: 'little-explorers',
    icon_color: '#5bb5a2',
    color: '#eef8f5',
    icon: '🌱',
    image: aboutKids,
  },
  {
    id: 'growing-explorers',
    icon_color: '#f4a0b0',
    color: '#fff0f3',
    icon: '🎈',
    image: heroKids,
  },
  {
    id: 'young-explorers',
    icon_color: '#f5b942',
    color: '#fff8e8',
    icon: '🎨',
    image: aboutKids,
  },
  {
    id: 'future-explorers',
    icon_color: '#a682b8',
    color: '#f5eef8',
    icon: '📚',
    image: heroKids,
  },
  {
    id: 'school-ready',
    icon_color: '#7eb8d4',
    color: '#eef6fa',
    icon: '🚀',
    image: aboutKids,
  },
]

/**
 * Age groups / programmes — detailed journeys for each stage.
 */
function AgeGroupsProgramsSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const { cardsReady, allowImages, onHighlightComplete } =
    useSectionRevealGate(true)

  const agePrograms = t('programs.ageItems').map((item, i) => ({
    ...AGE_META[i],
    ...item,
  }))

  return (
    <section
      id="age-groups"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="age-groups-heading"
    >
      <ProgramsDecorations />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 text-center sm:mb-12">
          <p className="section-eyebrow">{t('programs.agesEyebrow')}</p>
          <h2
            id="age-groups-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('programs.agesTitleBefore')}{' '}
            <BrushHighlightText
              triggerRef={sectionRef}
              onComplete={onHighlightComplete}
            >
              {t('programs.agesTitleHighlight')}
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            {t('programs.agesLead')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agePrograms.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              cardsReady={cardsReady}
              allowImages={allowImages}
              gainHeading={t('programs.gainHeading')}
            />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[1.75rem] bg-[#eef8f5] px-6 py-8 text-center sm:mt-14 sm:rounded-[2rem] sm:px-10 sm:py-10">
          <h3 className="mb-3 text-xl font-extrabold text-[#2d3a4a] sm:text-2xl">
            {t('programs.closingTitle')}
          </h3>
          <p className="text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            {t('programs.closingBody')}
          </p>
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, index, cardsReady, allowImages, gainHeading }) {
  const accent = program.icon_color || '#5bb5a2'
  const lightBg = program.color || '#eef8f5'

  return (
    <AnimatedCard
      as="article"
      index={index}
      gated
      active={cardsReady}
      motionEnabled={false}
      className={`program-card group card-surface flex h-full flex-col transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(45,58,74,0.12)] ${
        cardsReady ? '' : 'opacity-0'
      }`}
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          <span aria-hidden="true">{program.icon}</span>
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
          <p className="mb-2 text-xs font-bold text-brand-ink">
            {program.age_range}
          </p>
          {program.tagline ? (
            <p className="mb-3 text-xs font-semibold italic leading-relaxed text-[#5bb5a2]">
              {program.tagline}
            </p>
          ) : null}
          {program.description ? (
            <p className="mb-4 text-xs leading-relaxed text-brand-muted">
              {program.description}
            </p>
          ) : null}
          {program.gains?.length ? (
            <div>
              <p className="mb-2 text-[11px] font-extrabold tracking-wide text-[#2d3a4a] uppercase">
                {gainHeading}
              </p>
              <ul className="m-0 list-disc space-y-1 pl-4 text-xs leading-relaxed text-brand-muted">
                {program.gains.map((gain) => (
                  <li key={gain}>{gain}</li>
                ))}
              </ul>
            </div>
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

export default AgeGroupsProgramsSection
