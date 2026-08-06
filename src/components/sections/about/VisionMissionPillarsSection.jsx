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
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LottieScroll from '../../ui/LottieScroll'

const PILLAR_ICONS = [Compass, Lightbulb, Heart, Sprout, Sparkles]

/**
 * Vision, mission, and five pillars — Explore, Think, Belong, Grow, Thrive.
 */
function VisionMissionPillarsSection() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()
  const visionParagraphs = t('about.visionParagraphs')
  const missionParagraphs = t('about.missionParagraphs')
  const pillars = t('about.pillars').map((item, i) => ({
    ...item,
    Icon: PILLAR_ICONS[i],
  }))

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
            {t('about.visionEyebrow')}
          </p>
          <h2
            id="vision-mission-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('about.visionTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('about.visionTitleHighlight')}
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
                {t('about.visionLabel')}
              </h3>
            </div>
            <p className="mb-4 text-base font-bold leading-snug text-[#2d3a4a] sm:text-lg">
              {t('about.visionHeading')}
            </p>
            <div className="space-y-3">
              {visionParagraphs.map((paragraph) => (
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
                {t('about.missionLabel')}
              </h3>
            </div>
            <p className="mb-4 text-base font-bold leading-snug text-[#2d3a4a] sm:text-lg">
              {t('about.missionHeading')}
            </p>
            <div className="space-y-3">
              {missionParagraphs.map((paragraph) => (
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
            {t('about.pillarsLabel')}
          </h3>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {pillars.map(({ title, text, Icon }) => (
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
