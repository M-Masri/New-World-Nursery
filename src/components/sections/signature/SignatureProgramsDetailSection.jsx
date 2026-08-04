import {
  Blocks,
  Compass,
  Heart,
  Lightbulb,
  Mountain,
  Users,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import signatureThink from '../../../assets/signature-think.webp'
import signatureExplore from '../../../assets/signature-explore.webp'
import signatureBelong from '../../../assets/signature-belong.webp'

const GROUPS = [
  {
    id: 'think',
    label: 'Think',
    title: 'Creating Curious Minds and Confident Problem Solvers',
    accent: '#5bb5a2',
    soft: '#eef8f5',
    Icon: Lightbulb,
    image: signatureThink,
    imageAlt: 'Children building and problem-solving with blocks',
    programmes: [
      {
        title: 'The Creator Mindset',
        paragraphs: [
          'The world needs people who can imagine new possibilities, solve meaningful problems and create innovative solutions. We believe these qualities begin to develop long before children learn to code or use technology.',
          'Our Creator Mindset programme encourages children to think logically, ask meaningful questions, test ideas and learn through experimentation. Construction, open-ended challenges and collaborative projects help children understand how things work while developing creativity, resilience and confidence in their own ideas.',
          'Whether they become engineers, architects, scientists, entrepreneurs or artists, our goal is the same: to help every child become someone who creates, not simply someone who follows.',
        ],
      },
      {
        title: 'Creative Builders Studio',
        Icon: Blocks,
        paragraphs: [
          'Inspired by the internationally recognised principles of Block Play, children explore engineering concepts, mathematical thinking and spatial awareness through purposeful construction. Every structure they build becomes an opportunity to plan, test, adapt and improve while working together with others.',
        ],
        gains: [
          'Logical thinking',
          'Creativity',
          'Engineering foundations',
          'Spatial awareness',
          'Problem-solving',
          'Collaboration',
        ],
      },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    title: 'Learning Beyond the Classroom',
    accent: '#f5b942',
    soft: '#fff8e8',
    Icon: Compass,
    image: signatureExplore,
    imageAlt: 'Children exploring nature and outdoor landscapes',
    reverse: true,
    programmes: [
      {
        title: 'Beach & Desert Explorers',
        Icon: Mountain,
        paragraphs: [
          'Some of the most valuable learning happens beyond four walls.',
          'Inspired by the unique landscapes of the UAE, children experience Dubai’s beaches, deserts and natural environments as places of exploration, discovery and wonder. These experiences encourage scientific thinking, environmental awareness and a deeper appreciation of the world they call home.',
          'By observing nature, asking questions and making real-life connections, children develop curiosity that extends far beyond the classroom.',
        ],
        gains: [
          'Scientific curiosity',
          'Observation skills',
          'Environmental awareness',
          'Cultural understanding',
          'Confidence through exploration',
        ],
      },
    ],
  },
  {
    id: 'belong',
    label: 'Belong',
    title: 'Growing Together Through Connection',
    accent: '#f4a0b0',
    soft: '#fff0f3',
    Icon: Heart,
    image: signatureBelong,
    imageAlt: 'Children connecting and belonging together',
    programmes: [
      {
        title: 'Naturally Inclusive',
        Icon: Heart,
        paragraphs: [
          'Belonging is one of the strongest foundations for learning.',
          'Our naturally inclusive approach creates an environment where every child feels recognised, respected and valued for who they are. Children learn alongside one another, building empathy, kindness and meaningful relationships while discovering that every individual brings something valuable to the community.',
        ],
      },
      {
        title: 'Families Together',
        Icon: Users,
        paragraphs: [
          'A child’s learning journey is strongest when families and educators work as partners.',
          'Through workshops, shared experiences, specialist guidance and regular communication, we create meaningful connections between home and nursery. These partnerships give children consistency, security and the confidence to thrive in every part of their lives.',
        ],
      },
    ],
  },
]

/**
 * Signature programme details — premium alternating chapters.
 */
function SignatureProgramsDetailSection() {
  return (
    <div aria-label="Signature programme details">
      {GROUPS.map((group, groupIndex) => {
        const onSoft = groupIndex % 2 === 0

        return (
          <section
            key={group.id}
            id={`signature-${group.id}`}
            className={`relative overflow-hidden scroll-mt-28 py-14 sm:py-20 ${
              onSoft ? 'bg-[#faf7f2]' : 'bg-white'
            }`}
            aria-labelledby={`${group.id}-heading`}
          >
            <img
              src={aboutLeaf}
              alt=""
              aria-hidden="true"
              className={`pointer-events-none absolute z-0 w-12 opacity-70 sm:w-16 ${
                onSoft
                  ? 'top-0 right-0'
                  : 'bottom-0 left-0 w-32 -scale-x-100 opacity-65 sm:w-40'
              }`}
            />

            <div className="relative z-10 mx-auto max-w-page page-gutter">
              <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: group.soft,
                        color: group.accent,
                      }}
                    >
                      <group.Icon
                        className="h-5 w-5"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <p
                      className="text-xs font-extrabold tracking-[0.22em] uppercase"
                      style={{ color: group.accent }}
                    >
                      {group.label}
                    </p>
                  </div>
                  <h2
                    id={`${group.id}-heading`}
                    className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
                  >
                    {group.title}
                  </h2>
                </div>
                <span
                  className="hidden h-1 w-24 rounded-full lg:block"
                  style={{ backgroundColor: group.accent }}
                  aria-hidden="true"
                />
              </div>

              <div
                className={`grid items-start gap-8 lg:gap-12 ${
                  group.reverse
                    ? 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'
                    : 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] ${
                    group.reverse ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={group.image}
                    alt={group.imageAlt}
                    width={800}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[5/4] w-full object-cover lg:min-h-[28rem]"
                  />
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background: `linear-gradient(160deg, transparent 45%, ${group.accent}99 100%)`,
                    }}
                    aria-hidden="true"
                  />
                  <p className="absolute right-6 bottom-6 text-2xl font-extrabold tracking-wide text-white sm:text-3xl">
                    {group.label}
                  </p>
                </div>

                <div
                  className={`space-y-6 ${group.reverse ? 'lg:order-1' : ''}`}
                >
                  {group.programmes.map((programme, index) => (
                    <div key={programme.title}>
                      {index > 0 ? (
                        <div
                          className="mb-6 h-px w-full"
                          style={{ backgroundColor: `${group.accent}33` }}
                          aria-hidden="true"
                        />
                      ) : null}

                      <div className="mb-3 flex items-center gap-2.5">
                        {programme.Icon ? (
                          <programme.Icon
                            className="h-5 w-5 shrink-0"
                            style={{ color: group.accent }}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        ) : null}
                        <h3 className="text-xl font-extrabold text-[#2d3a4a] sm:text-2xl">
                          {programme.title}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {programme.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 36)}
                            className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {programme.gains?.length ? (
                        <div
                          className="mt-6 rounded-[1.5rem] px-5 py-5 sm:rounded-[1.75rem] sm:px-6"
                          style={{ backgroundColor: group.soft }}
                        >
                          <p className="mb-3 text-[11px] font-extrabold tracking-[0.18em] text-[#2d3a4a] uppercase">
                            Children develop
                          </p>
                          <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
                            {programme.gains.map((gain) => (
                              <li
                                key={gain}
                                className="flex items-center gap-2.5 text-sm font-semibold text-[#2d3a4a]"
                              >
                                <span
                                  className="h-2 w-2 shrink-0 rounded-full"
                                  style={{ backgroundColor: group.accent }}
                                  aria-hidden="true"
                                />
                                {gain}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default SignatureProgramsDetailSection
