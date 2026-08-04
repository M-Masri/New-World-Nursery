import { useRef } from 'react'
import {
  Compass,
  Eye,
  Heart,
  Lightbulb,
  Sparkles,
  Sprout,
  Target,
} from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import aboutGradIcon from '../../../assets/New_World_Icon00050-removebg-preview.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LottieScroll from '../../ui/LottieScroll'

const VISION_TITLE = 'A World Where Every Child Discovers Their Own Path'

const VISION = [
  'We envision a world where every child grows with confidence, curiosity and compassion. A world where differences are celebrated, questions are encouraged and learning becomes a lifelong journey of discovery.',
  'Inspired by our European educational heritage and shaped by the diversity of Dubai, we are building a community where children develop not only the knowledge they need for school, but also the character, resilience and creativity they need for life.',
]

const MISSION_TITLE = 'Guiding Every Child on Their Journey'

const MISSION = [
  'Our mission is to create an inspiring early years environment where children feel safe to explore, confident to ask questions and empowered to discover their unique potential.',
  'By combining the British EYFS curriculum, inclusive education and innovative learning experiences, we help children build strong foundations for a future filled with opportunity.',
]

const PILLARS = [
  {
    title: 'Explore',
    text: 'We inspire children to stay curious, discover the world around them and develop a lifelong love of learning.',
    Icon: Compass,
  },
  {
    title: 'Think',
    text: 'We encourage independent thinking, creativity, problem-solving and the confidence to ask meaningful questions.',
    Icon: Lightbulb,
  },
  {
    title: 'Belong',
    text: 'We create a naturally inclusive community where every child feels valued, respected and connected.',
    Icon: Heart,
  },
  {
    title: 'Grow',
    text: 'We nurture each child’s individual strengths, supporting their emotional, social, physical and cognitive development.',
    Icon: Sprout,
  },
  {
    title: 'Thrive',
    text: 'We prepare children to embrace the future with confidence, resilience and the skills to flourish in a changing world.',
    Icon: Sparkles,
  },
]

/**
 * Vision, mission, and five pillars — Explore, Think, Belong, Grow, Thrive.
 */
function VisionMissionPillarsSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="vision-mission"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="vision-mission-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-85 sm:w-16 lg:w-20"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-32 -scale-x-100 opacity-75 sm:w-40 lg:w-48"
      />
      <img
        src={aboutGradIcon}
        alt=""
        width={140}
        height={140}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-4 z-20 hidden w-24 opacity-95 sm:block sm:w-28 lg:w-32"
      />
      <LottieScroll
        animationImport={() =>
          import('../../../assets/lottie/plane-heart.json')
        }
        triggerRef={sectionRef}
        mode="playWhileInView"
        speed={0.55}
        className="pointer-events-none absolute top-8 left-0 z-20 h-20 w-40 opacity-90 brightness-75 contrast-125 saturate-125 sm:top-10 sm:h-28 sm:w-56 lg:h-32 lg:w-64"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs font-extrabold tracking-[0.28em] text-[#5bb5a2] uppercase">
            Vision, mission & pillars
          </p>
          <h2
            id="vision-mission-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Our Identity, Vision and{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              Values
            </BrushHighlightText>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] bg-white p-7 shadow-[0_14px_40px_rgba(45,58,74,0.08)] sm:rounded-[2rem] sm:p-9">
            <div className="mb-4 flex items-center gap-2.5">
              <Eye
                className="h-6 w-6 shrink-0 text-[#5bb5a2]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <h3 className="text-xl font-extrabold text-[#5bb5a2] sm:text-2xl">
                Our Vision
              </h3>
            </div>
            <p className="mb-4 text-base font-bold leading-snug text-[#2d3a4a] sm:text-lg">
              {VISION_TITLE}
            </p>
            <div className="space-y-3">
              {VISION.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] bg-white p-7 shadow-[0_14px_40px_rgba(45,58,74,0.08)] sm:rounded-[2rem] sm:p-9">
            <div className="mb-4 flex items-center gap-2.5">
              <Target
                className="h-6 w-6 shrink-0 text-[#5bb5a2]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <h3 className="text-xl font-extrabold text-[#5bb5a2] sm:text-2xl">
                Our Mission
              </h3>
            </div>
            <p className="mb-4 text-base font-bold leading-snug text-[#2d3a4a] sm:text-lg">
              {MISSION_TITLE}
            </p>
            <div className="space-y-3">
              {MISSION.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-14">
          <h3 className="mb-8 text-center text-2xl font-extrabold text-[#2d3a4a] sm:text-3xl">
            Our{' '}
            <span className="text-[#5bb5a2]">Pillars</span>
          </h3>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {PILLARS.map(({ title, text, Icon }) => (
              <li
                key={title}
                className="rounded-[1.5rem] bg-[#eef8f5] px-5 py-6 text-center sm:px-4 sm:py-7"
              >
                <Icon
                  className="mx-auto mb-3 h-8 w-8 text-[#5bb5a2]"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="mb-2 text-base font-extrabold text-[#2d3a4a]">
                  {title}
                </p>
                <p className="text-xs leading-relaxed text-brand-muted sm:text-[13px]">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionPillarsSection
