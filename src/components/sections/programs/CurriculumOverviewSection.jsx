import { useRef } from 'react'
import { BookOpen, Compass, Lightbulb, Puzzle } from 'lucide-react'
import BrushHighlightText from '../../ui/BrushHighlightText'

const PHILOSOPHY = [
  {
    title: 'Play with purpose',
    text: 'Children learn best when curiosity leads. We design days around discovery, not drills — so joy and growth travel together.',
    Icon: Lightbulb,
    accent: '#5bb5a2',
  },
  {
    title: 'Whole-child growth',
    text: 'Language, movement, friendship, and confidence are woven through every room — not treated as separate subjects.',
    Icon: Compass,
    accent: '#f4a0b0',
  },
]

const SIGNATURE = [
  {
    title: 'Story-rich days',
    text: 'Songs, books, and conversation build vocabulary and belonging from the earliest ages.',
    Icon: BookOpen,
    accent: '#f5b942',
  },
  {
    title: 'Hands-on discovery',
    text: 'Blocks, art, outdoor play, and problem-solving invite little minds to invent and try again.',
    Icon: Puzzle,
    accent: '#a682b8',
  },
]

/**
 * Curriculum overview — Learning Philosophy + Signature Programmes.
 */
function CurriculumOverviewSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="curriculum"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="curriculum-heading"
    >
      <svg
        className="pointer-events-none absolute top-14 right-8 h-7 w-7 text-[#f5c842] opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-20 left-8 h-6 w-6 text-[#f4a0b0] opacity-35"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z" />
      </svg>

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 max-w-2xl sm:mb-14">
          <p className="section-eyebrow !mb-3">Learning philosophy</p>
          <h2
            id="curriculum-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Curriculum{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              overview
            </BrushHighlightText>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            How we teach, and what makes our programmes feel unmistakably New
            World — warm, playful, and ready for real life.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-5 text-xs font-extrabold tracking-[0.2em] text-[#5bb5a2] uppercase">
              Learning philosophy
            </p>
            <ul className="m-0 list-none space-y-4 p-0">
              {PHILOSOPHY.map(({ title, text, Icon, accent }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-[1.25rem] bg-[#faf7f2] p-5 sm:p-6"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white"
                    style={{ color: accent }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-lg font-extrabold text-brand-ink">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-extrabold tracking-[0.2em] text-[#5bb5a2] uppercase">
              Signature programmes
            </p>
            <ul className="m-0 list-none space-y-4 p-0">
              {SIGNATURE.map(({ title, text, Icon, accent }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-[1.25rem] bg-[#eef8f5] p-5 sm:p-6"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white"
                    style={{ color: accent }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-lg font-extrabold text-brand-ink">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurriculumOverviewSection
