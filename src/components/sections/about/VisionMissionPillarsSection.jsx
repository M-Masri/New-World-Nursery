import { useRef } from 'react'
import { Eye, Handshake, Heart, Lightbulb, Sparkles, Target } from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import aboutGradIcon from '../../../assets/New_World_Icon00050-removebg-preview.webp'
import LottieScroll from '../../ui/LottieScroll'

const VISION =
  'To nurture curious, confident children who love learning and treat others with kindness — ready for school and for life.'

const MISSION =
  'To create a safe, play-rich nursery where caring educators guide every child through joyful discovery, with integrity, warmth, and heart.'

const PILLARS = [
  { title: 'Play with purpose', Icon: Sparkles },
  { title: 'Warm care', Icon: Heart },
  { title: 'Trust & partnership', Icon: Handshake },
  { title: 'Growing minds', Icon: Lightbulb },
]

/** Evenly space 4 pillars along a downward semicircle (sides higher, center lower). */
function pillarArcStyle(index, total) {
  const start = Math.PI * 0.92
  const end = Math.PI * 0.08
  const t = total === 1 ? 0.5 : index / (total - 1)
  const angle = start + (end - start) * t
  const x = 50 + Math.cos(angle) * 42
  const y = 30 + Math.sin(angle) * 48

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
  }
}

/**
 * Pillars on a semicircle arc, overlapping Vision | Mission card.
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
        <div className="mb-4 text-center sm:mb-5">
          <p className="mb-3 text-xs font-extrabold tracking-[0.28em] text-[#5bb5a2] uppercase">
            About Us
          </p>
          <h2
            id="vision-mission-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Our Identity, Vision and Values
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl pt-3 sm:pt-4">
          <div
            className="relative z-20 mx-auto h-[11.5rem] w-[min(100%,38rem)] sm:h-[13rem] sm:w-[92%] lg:w-[88%]"
            style={{ marginBottom: '-3.25rem' }}
          >
            <div className="absolute inset-x-0 bottom-0 top-4 rounded-[1.35rem] bg-[#5bb5a2] shadow-[0_10px_24px_rgba(91,181,162,0.35)] sm:top-5 sm:rounded-[1.5rem]" />

            <ul className="absolute inset-0 m-0 list-none p-0" role="list">
              {PILLARS.map(({ title, Icon }, index) => (
                <li
                  key={title}
                  role="listitem"
                  className="absolute flex w-[6.5rem] flex-col items-center gap-1.5 text-center sm:w-[7.75rem]"
                  style={pillarArcStyle(index, PILLARS.length)}
                >
                  <Icon
                    className="h-8 w-8 text-white sm:h-9 sm:w-9"
                    strokeWidth={1.55}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold leading-snug text-white sm:text-sm">
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-5xl rounded-[1.75rem] bg-white px-7 pb-12 pt-[5.25rem] shadow-[0_14px_40px_rgba(45,58,74,0.1)] sm:rounded-[2rem] sm:px-12 sm:pb-14 sm:pt-[6rem] lg:px-14">
            <div className="grid min-h-[11rem] gap-8 sm:min-h-[12.5rem] sm:grid-cols-2 sm:gap-0">
              <div className="sm:pr-10">
                <div className="mb-4 flex items-center gap-2.5">
                  <Eye
                    className="h-6 w-6 shrink-0 text-[#5bb5a2]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-extrabold text-[#5bb5a2] sm:text-2xl">
                    Vision
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#3d4a5c] sm:text-lg">
                  {VISION}
                </p>
              </div>

              <div className="border-t border-[#e5e5e5] pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-10">
                <div className="mb-4 flex items-center gap-2.5">
                  <Target
                    className="h-6 w-6 shrink-0 text-[#5bb5a2]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-extrabold text-[#5bb5a2] sm:text-2xl">
                    Mission
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#3d4a5c] sm:text-lg">
                  {MISSION}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionPillarsSection
