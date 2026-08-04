import { useRef } from 'react'
import {
  Accessibility,
  BedDouble,
  Building2,
  Dumbbell,
  Leaf,
  Sparkles,
  Trees,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'

const DIFFERENTIATORS = [
  {
    id: 'd1',
    title: 'Purposefully Designed Learning Environments',
    description:
      'Every nursery is carefully planned to encourage independence, exploration and meaningful learning. Bright, flexible classrooms are designed to evolve with children’s interests and developmental needs.',
    icon_color: '#5bb5a2',
    soft: '#eef8f5',
    Icon: Building2,
  },
  {
    id: 'd2',
    title: 'Indoor & Outdoor Spaces for Every Day',
    description:
      'We believe children need the freedom to move, explore and play in every season. Every New World Nursery provides dedicated indoor play areas alongside outdoor environments that encourage active play, discovery and a connection with nature.',
    icon_color: '#f4a0b0',
    soft: '#fff0f3',
    Icon: Trees,
  },
  {
    id: 'd3',
    title: 'Dedicated Sensory Integration Spaces',
    description:
      'Each nursery includes a dedicated sensory environment designed to support sensory development, emotional regulation, focus and wellbeing through carefully planned experiences and specialist resources.',
    icon_color: '#f5b942',
    soft: '#fff8e8',
    Icon: Sparkles,
  },
  {
    id: 'd4',
    title: 'Movement & Physical Development',
    description:
      'Children need movement to learn. Our nurseries include dedicated spaces that encourage climbing, balancing, coordination and active play, helping children build confidence while supporting healthy physical development.',
    icon_color: '#a682b8',
    soft: '#f5eef8',
    Icon: Dumbbell,
  },
  {
    id: 'd5',
    title: 'Peaceful Sleep & Rest Rooms',
    description:
      'Younger children benefit from dedicated sleep and rest rooms that provide a calm, comfortable environment, supporting healthy routines and ensuring they have the rest they need to grow and thrive.',
    icon_color: '#7eb8d4',
    soft: '#eef6fb',
    Icon: BedDouble,
  },
  {
    id: 'd6',
    title: 'Exclusive Signature Programmes',
    description:
      'Every New World Nursery delivers our exclusive Signature Programmes, enriching the British EYFS curriculum through experiences that develop logical thinking, creativity, environmental awareness and real-world problem-solving.',
    icon_color: '#6db89a',
    soft: '#e8f6f0',
    Icon: Leaf,
  },
  {
    id: 'd7',
    title: 'Naturally Inclusive by Design',
    description:
      'Our environments are intentionally created so children of different backgrounds, abilities and learning styles learn together every day. Inclusion is not a separate programme; it is part of the culture, the environment and every learning experience we provide.',
    icon_color: '#e07a8a',
    soft: '#fdf0f2',
    Icon: Accessibility,
  },
]

/**
 * Key differentiators — editorial numbered rows.
 */
function KeyDifferentiatorsSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="key-differentiators"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="differentiators-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-80 sm:w-16 lg:w-20"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-32 -scale-x-100 opacity-75 sm:w-40 lg:w-48"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 max-w-2xl sm:mb-14">
          <p className="section-eyebrow !mb-3">Key differentiators</p>
          <h2
            id="differentiators-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            What makes us{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              different
            </BrushHighlightText>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            Thoughtfully designed spaces, exclusive programmes and a naturally
            inclusive culture — built so every child can feel safe, understood
            and inspired to grow.
          </p>
        </div>

        <ol className="m-0 list-none space-y-4 p-0 sm:space-y-5">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = item.Icon
            const n = String(index + 1).padStart(2, '0')
            const reverse = index % 2 === 1

            return (
              <li
                key={item.id}
                className={`grid items-center gap-5 rounded-[1.75rem] px-5 py-6 sm:gap-8 sm:rounded-[2rem] sm:px-8 sm:py-7 lg:grid-cols-[7rem_1fr_auto] ${
                  reverse ? 'lg:grid-cols-[auto_1fr_7rem]' : ''
                }`}
                style={{ backgroundColor: item.soft }}
              >
                <div
                  className={`flex items-center gap-4 ${
                    reverse ? 'lg:order-3 lg:justify-end' : ''
                  }`}
                >
                  <span
                    className="text-3xl font-extrabold tabular-nums sm:text-4xl"
                    style={{ color: item.icon_color }}
                  >
                    {n}
                  </span>
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-14 sm:w-14"
                    style={{ color: item.icon_color }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>

                <div className={reverse ? 'lg:order-2' : ''}>
                  <h3 className="mb-1.5 text-xl font-extrabold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`hidden h-16 w-1.5 rounded-full lg:block ${
                    reverse ? 'lg:order-1' : ''
                  }`}
                  style={{ backgroundColor: item.icon_color }}
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default KeyDifferentiatorsSection
