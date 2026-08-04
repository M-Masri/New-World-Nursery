import { useRef } from 'react'
import { Compass, Heart, Lightbulb } from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'

const VALUES = [
  {
    label: 'Think',
    text: 'With curiosity and confidence',
    Icon: Lightbulb,
    accent: '#5bb5a2',
  },
  {
    label: 'Explore',
    text: 'Across cultures and ideas',
    Icon: Compass,
    accent: '#f5b942',
  },
  {
    label: 'Belong',
    text: 'Wherever New World grows',
    Icon: Heart,
    accent: '#f4a0b0',
  },
]

/**
 * Closing statement — shared values across the network.
 */
function AwardsClosingSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="awards-closing"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-20"
      aria-labelledby="awards-closing-heading"
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
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-36 -scale-x-100 opacity-75 sm:w-44 lg:w-52"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="overflow-hidden rounded-[2rem] bg-[#eef8f5] sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
              <p className="section-eyebrow !mb-3 !text-left">
                Closing statement
              </p>
              <h2
                id="awards-closing-heading"
                className="max-w-md text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
              >
                The same heart,{' '}
                <BrushHighlightText triggerRef={sectionRef}>
                  everywhere
                </BrushHighlightText>
              </h2>

              <p className="mt-6 max-w-lg border-l-4 border-[#5bb5a2] pl-5 text-lg font-extrabold leading-snug text-[#2d3a4a] sm:text-xl">
                Wherever you find a New World Nursery, you will discover the same
                values, the same commitment to quality and the same belief that
                every child deserves a place where they can think, explore and
                belong.
              </p>
            </div>

            <div className="relative flex flex-col justify-center gap-4 bg-[#5bb5a2] px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
              <p className="mb-1 text-[11px] font-extrabold tracking-[0.22em] text-white/80 uppercase">
                Our shared promise
              </p>
              {VALUES.map(({ label, text, Icon, accent }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-[1.25rem] bg-white/95 px-4 py-4 sm:rounded-[1.5rem] sm:px-5"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${accent}22`, color: accent }}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p
                      className="text-base font-extrabold"
                      style={{ color: accent }}
                    >
                      {label}
                    </p>
                    <p className="text-sm leading-snug text-[#3d4a5c]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AwardsClosingSection
