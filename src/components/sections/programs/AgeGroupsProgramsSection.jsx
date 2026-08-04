import { useRef } from 'react'
import { useSectionRevealGate } from '../../../hooks/useSectionRevealGate'
import AnimatedCard from '../../ui/AnimatedCard'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LazyImage from '../../ui/LazyImage'
import aboutKids from '../../../assets/about-kids.webp'
import heroKids from '../../../assets/hero-kids.webp'

const IMAGE_STAGGER_MS = 280

const AGE_PROGRAMS = [
  {
    id: 'little-explorers',
    title: 'Little Explorers',
    age_range: '45 Days – 12 Months',
    tagline: 'Where every journey begins with love, security and connection.',
    description:
      'Our youngest children are cared for in a calm and nurturing environment where strong relationships provide the foundation for healthy development. Through responsive care, sensory experiences and gentle exploration, babies begin discovering the world around them while developing trust, confidence and emotional security.',
    gains: [
      'Secure relationships and emotional wellbeing',
      'Sensory exploration and early discovery',
      'Physical development through movement',
      'Early communication skills',
      'Confidence to explore their environment',
    ],
    icon_color: '#5bb5a2',
    color: '#eef8f5',
    icon: '🌱',
    image: aboutKids,
  },
  {
    id: 'growing-explorers',
    title: 'Growing Explorers',
    age_range: '1 – 2 Years',
    tagline: 'Growing independence through curiosity and discovery.',
    description:
      'As toddlers become more confident, every day becomes an opportunity to explore, communicate and learn through experience. Carefully planned activities encourage movement, language, creativity and self-expression while helping children develop confidence in themselves and the world around them.',
    gains: [
      'Independence and self-confidence',
      'Language and communication skills',
      'Physical coordination',
      'Social awareness',
      'Curiosity and creativity',
    ],
    icon_color: '#f4a0b0',
    color: '#fff0f3',
    icon: '🎈',
    image: heroKids,
  },
  {
    id: 'young-explorers',
    title: 'Young Explorers',
    age_range: '2 – 3 Years',
    tagline: 'Curiosity becomes confidence.',
    description:
      'This is a remarkable stage of discovery as children begin asking questions, building friendships and making sense of the world around them. Through purposeful play, creative projects and collaborative learning, they develop imagination, communication and early problem-solving skills.',
    gains: [
      'Communication and language development',
      'Creativity and imagination',
      'Early reasoning and problem-solving',
      'Social confidence and friendships',
      'A growing love of learning',
    ],
    icon_color: '#f5b942',
    color: '#fff8e8',
    icon: '🎨',
    image: aboutKids,
  },
  {
    id: 'future-explorers',
    title: 'Future Explorers',
    age_range: '3 – 4 Years',
    tagline: 'Building strong foundations for lifelong learning.',
    description:
      'Children become increasingly confident learners as they investigate ideas, express themselves creatively and take on new challenges. Guided by the British EYFS curriculum, they develop independence, resilience and the confidence to think critically while strengthening the foundations for future academic success.',
    gains: [
      'Early literacy and numeracy foundations',
      'Critical and creative thinking',
      'Collaboration and teamwork',
      'Independence and resilience',
      'Confidence in expressing ideas',
    ],
    icon_color: '#a682b8',
    color: '#f5eef8',
    icon: '📚',
    image: heroKids,
  },
  {
    id: 'school-ready',
    title: 'School Ready Explorers',
    age_range: '4 – 5 Years',
    tagline: 'Confident learners. Ready for the next adventure.',
    description:
      'Our oldest children prepare for a successful transition to primary school through engaging projects, inquiry-based learning and meaningful real-world experiences. Alongside strong academic foundations, they develop leadership, emotional intelligence and the confidence to embrace new opportunities with curiosity and enthusiasm.',
    gains: [
      'School readiness',
      'Leadership and independence',
      'Communication and collaboration',
      'Critical thinking and problem-solving',
      'Emotional resilience',
      'Confidence for the transition to primary school',
    ],
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
          <p className="section-eyebrow">Age Groups & Programmes</p>
          <h2
            id="age-groups-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Every Stage Has a{' '}
            <BrushHighlightText
              triggerRef={sectionRef}
              onComplete={onHighlightComplete}
            >
              Purpose
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            Every child grows in their own unique way. Our programmes are
            thoughtfully designed to support each stage of early childhood,
            combining the British EYFS curriculum with inspiring experiences that
            nurture confidence, curiosity and a lifelong love of learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGE_PROGRAMS.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              cardsReady={cardsReady}
              allowImages={allowImages}
            />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[1.75rem] bg-[#eef8f5] px-6 py-8 text-center sm:mt-14 sm:rounded-[2rem] sm:px-10 sm:py-10">
          <h3 className="mb-3 text-xl font-extrabold text-[#2d3a4a] sm:text-2xl">
            Every Child’s Journey Is Unique
          </h3>
          <p className="text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            Age helps guide our programmes, but it never defines a child’s
            potential. At New World Nursery, we celebrate individuality and adapt
            learning experiences to support each child at their own pace. Because
            every journey is different, and every child deserves the opportunity
            to flourish.
          </p>
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
                What Your Child Will Gain
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
