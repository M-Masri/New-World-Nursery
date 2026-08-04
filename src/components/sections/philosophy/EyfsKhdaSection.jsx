import { useRef } from 'react'
import {
  BookOpen,
  Compass,
  Globe2,
  HeartHandshake,
  Landmark,
  Scale,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'

const ALIGNMENT_LEAD =
  'Exceptional education begins with a strong foundation. At New World Nursery, our curriculum is built upon the British Early Years Foundation Stage (EYFS) and fully aligned with the expectations of Dubai’s Knowledge and Human Development Authority (KHDA).'

const ALIGNMENT_POINTS = [
  {
    label: 'Balanced growth',
    title: 'More than academics',
    text: 'The EYFS framework is internationally recognised for supporting children’s development during the most important years of life. Rather than focusing only on academic achievement, it provides a balanced approach that nurtures communication, wellbeing, physical development, creativity, early literacy, mathematics and children’s understanding of the world.',
    Icon: Scale,
    accent: '#f5b942',
    soft: '#fff8e8',
  },
  {
    label: 'Proven practice',
    title: '16+ years of experience',
    text: 'Our educational practice combines this internationally respected framework with more than 16 years of European educational experience and a deep understanding of inclusive education. This enables us to deliver learning that is evidence-informed, developmentally appropriate and centred around the individual child.',
    Icon: Compass,
    accent: '#f4a0b0',
    soft: '#fff0f3',
  },
  {
    label: 'Locally relevant',
    title: 'Global & Dubai aligned',
    text: 'By aligning international best practice with the educational expectations of Dubai, we provide families with the confidence that their children are learning within a curriculum that is both globally recognised and locally relevant.',
    Icon: Globe2,
    accent: '#5bb5a2',
    soft: '#eef8f5',
  },
]

const FOUNDATIONS = [
  {
    short: 'EYFS',
    title: 'British Early Years Foundation Stage (EYFS)',
    text: 'An internationally recognised framework supporting children’s learning and development from birth through the early years.',
    Icon: BookOpen,
    accent: '#5bb5a2',
  },
  {
    short: 'KHDA',
    title: 'KHDA Early Childhood Framework',
    text: 'Ensuring our educational practice reflects the quality standards and expectations established for early childhood education in Dubai.',
    Icon: Landmark,
    accent: '#f4a0b0',
  },
  {
    short: 'Europe',
    title: 'European Educational Experience',
    text: 'Built on more than 16 years of practical experience across a well-established network of nurseries and schools.',
    Icon: Globe2,
    accent: '#f5b942',
  },
  {
    short: 'Inclusion',
    title: 'Inclusive Educational Practice',
    text: 'Drawing on extensive experience in inclusive education, we create learning environments where every child is supported to reach their full potential.',
    Icon: HeartHandshake,
    accent: '#a682b8',
  },
]

/**
 * EYFS + KHDA — lead copy, highlight points, foundation grid.
 */
function EyfsKhdaSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="eyfs-khda"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="eyfs-khda-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 w-28 -scale-x-100 opacity-70 sm:w-36"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-14 opacity-75 sm:w-18"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 grid gap-8 lg:mb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="section-eyebrow !mb-3 !text-left">
              EYFS + KHDA alignment
            </p>
            <h2
              id="eyfs-khda-heading"
              className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
            >
              A foundation families can{' '}
              <BrushHighlightText triggerRef={sectionRef}>
                trust
              </BrushHighlightText>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base lg:pb-1">
            {ALIGNMENT_LEAD}
          </p>
        </div>

        <div className="mb-12 grid gap-5 sm:mb-14 lg:grid-cols-3 lg:gap-6">
          {ALIGNMENT_POINTS.map(({ label, title, text, Icon, accent, soft }) => (
            <article
              key={title}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
              style={{ backgroundColor: soft }}
            >
              <span
                className="h-1.5 w-full shrink-0"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
                    style={{ color: accent }}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p
                      className="text-[10px] font-extrabold tracking-[0.18em] uppercase"
                      style={{ color: accent }}
                    >
                      {label}
                    </p>
                    <h3 className="text-base font-extrabold text-[#2d3a4a] sm:text-lg">
                      {title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#3d4a5c] sm:text-[15px]">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-[#5bb5a2]/15 sm:grid-cols-2">
          {FOUNDATIONS.map(({ short, title, text, Icon, accent }) => (
            <article
              key={title}
              className="bg-white p-6 transition hover:bg-[#faf7f2] sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${accent}22`, color: accent }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.16em] uppercase"
                  style={{ backgroundColor: `${accent}22`, color: accent }}
                >
                  {short}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-extrabold text-[#2d3a4a]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EyfsKhdaSection
