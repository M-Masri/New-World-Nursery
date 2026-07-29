import { useRef } from 'react'
import { Heart, Leaf, Shield, Sparkles, Sun, Users } from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import BrushHighlightText from '../../ui/BrushHighlightText'

const FALLBACKS = [
  {
    id: 'f1',
    title: 'Play with purpose',
    description:
      'Every corner invites curiosity — blocks, stories, outdoor adventures, and joyful discovery woven through the day.',
    icon_color: '#5bb5a2',
    soft: '#eef8f5',
    Icon: Sparkles,
  },
  {
    id: 'f2',
    title: 'Warm trusted care',
    description:
      'Educators who know each child by name, rhythm, and smile — calm routines that feel like a second home.',
    icon_color: '#f4a0b0',
    soft: '#fff0f3',
    Icon: Heart,
  },
  {
    id: 'f3',
    title: 'Safe spaces to explore',
    description:
      'Thoughtful classrooms and outdoor areas designed so little explorers can move freely, boldly, and safely.',
    icon_color: '#f5b942',
    soft: '#fff8e8',
    Icon: Shield,
  },
  {
    id: 'f4',
    title: 'Parent partnership',
    description:
      'Open doors, honest updates, and settling support so home and nursery grow side by side.',
    icon_color: '#a682b8',
    soft: '#f5eef8',
    Icon: Users,
  },
  {
    id: 'f5',
    title: 'Outdoor joy',
    description:
      'Sunshine, garden play, and fresh air woven into every day so bodies and minds can stretch.',
    icon_color: '#7eb8d4',
    soft: '#eef6fb',
    Icon: Sun,
  },
  {
    id: 'f6',
    title: 'Growing kindness',
    description:
      'We nurture confidence, curiosity, and kindness — a joyful start that stays with them.',
    icon_color: '#6db89a',
    soft: '#e8f6f0',
    Icon: Leaf,
  },
]

/**
 * Key differentiators — editorial numbered rows (not generic cards).
 */
function KeyDifferentiatorsSection() {
  const sectionRef = useRef(null)
  const { features } = useHomeData()
  const items =
    features.length > 0
      ? features.map((feature, index) => {
          const fallback = FALLBACKS[index % FALLBACKS.length]
          return {
            ...fallback,
            id: feature.id ?? fallback.id,
            title: feature.title || fallback.title,
            description: feature.description || fallback.description,
            icon_image: feature.icon_image,
          }
        })
      : FALLBACKS

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
          <p className="section-eyebrow !mb-3">What sets us apart</p>
          <h2
            id="differentiators-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Why families{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              stay
            </BrushHighlightText>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            Small details that make a big difference for little learners — and
            for the parents who trust us with their day.
          </p>
        </div>

        <ol className="m-0 list-none space-y-4 p-0 sm:space-y-5">
          {items.map((item, index) => {
            const Icon = item.Icon || Sparkles
            const n = String(index + 1).padStart(2, '0')
            const reverse = index % 2 === 1

            return (
              <li
                key={item.id ?? item.title}
                className={`grid items-center gap-5 rounded-[1.75rem] px-5 py-6 sm:gap-8 sm:rounded-[2rem] sm:px-8 sm:py-7 lg:grid-cols-[7rem_1fr_auto] ${
                  reverse ? 'lg:grid-cols-[auto_1fr_7rem]' : ''
                }`}
                style={{ backgroundColor: item.soft || '#eef8f5' }}
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
                    {item.icon_image ? (
                      <img
                        src={item.icon_image}
                        alt=""
                        width={32}
                        height={32}
                        loading="lazy"
                        decoding="async"
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                    )}
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
