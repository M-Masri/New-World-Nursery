import { useRef } from 'react'
import { useHomeData } from '../../../context/HomeDataContext'
import { useSectionRevealGate } from '../../../hooks/useSectionRevealGate'
import AnimatedCard from '../../ui/AnimatedCard'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LazyImage from '../../ui/LazyImage'

const IMAGE_STAGGER_MS = 280

const FALLBACK_PROGRAMS = [
  {
    id: 'p1',
    title: 'Infants',
    age_range: '2 – 12 months',
    description:
      'Gentle settling, sensory play, and close bonding with educators who follow each baby’s rhythm.',
    icon_color: '#5bb5a2',
    color: '#eef8f5',
    icon: '🌱',
  },
  {
    id: 'p2',
    title: 'Toddlers',
    age_range: '1 – 2 years',
    description:
      'Curious explorers discovering language, movement, and friendship in a safe, joyful room.',
    icon_color: '#f4a0b0',
    color: '#fff0f3',
    icon: '🎈',
  },
  {
    id: 'p3',
    title: 'Preschool',
    age_range: '2 – 3 years',
    description:
      'Stories, outdoor play, and early skills woven through play with purpose every day.',
    icon_color: '#f5b942',
    color: '#fff8e8',
    icon: '🎨',
  },
  {
    id: 'p4',
    title: 'Reception',
    age_range: '3 – 5 years',
    description:
      'School-ready confidence — literacy, numeracy, and kindness grown through guided discovery.',
    icon_color: '#a682b8',
    color: '#f5eef8',
    icon: '📚',
  },
]

/**
 * Age groups / programmes grid — same reveal gate as Home programs.
 */
function AgeGroupsProgramsSection() {
  const sectionRef = useRef(null)
  const { settings, programs } = useHomeData()
  const copy = settings?.programs ?? {}
  const items = programs.length > 0 ? programs : FALLBACK_PROGRAMS
  const { cardsReady, allowImages, onHighlightComplete } =
    useSectionRevealGate(true)

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
          <p className="section-eyebrow">
            {copy.label || 'Signature programmes'}
          </p>
          <h2
            id="age-groups-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Age{' '}
            <BrushHighlightText
              triggerRef={sectionRef}
              onComplete={onHighlightComplete}
            >
              groups
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-brand-muted">
            {copy.subtitle ||
              'Each room is tailored to age, energy, and curiosity — with educators who know how little learners thrive.'}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((program, index) => (
            <ProgramCard
              key={program.id ?? program.title}
              program={program}
              index={index}
              cardsReady={cardsReady}
              allowImages={allowImages}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, index, cardsReady, allowImages }) {
  const accent = program.icon_color || '#5bb5a2'
  const lightBg = program.color || '#eef8f5'

  return (
    <AnimatedCard
      as="article"
      index={index}
      gated
      active={cardsReady}
      motionEnabled={cardsReady}
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

export default AgeGroupsProgramsSection
