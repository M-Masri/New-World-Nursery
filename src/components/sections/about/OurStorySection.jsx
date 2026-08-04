import { useRef } from 'react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import aboutStoryExplore from '../../../assets/about-story-explore.webp'
import aboutStoryNurture from '../../../assets/about-story-nurture.webp'
import aboutStoryBelong from '../../../assets/about-story-belong.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useContactFormPopup } from '../../../context/ContactFormContext'
import BrushHighlightText from '../../ui/BrushHighlightText'
import Button from '../../ui/Button'

const STORY_TITLE = 'Inspired by Experience. Created for the Future.'

const STORY_PARAGRAPHS = [
  'New World Nursery was born from a simple yet powerful belief: every child deserves an exceptional start in life.',
  'Our story began in Europe, where for more than 16 years we have been building trusted educational communities through a well-established network of nurseries and schools. Along the way, we have supported thousands of children and families, continually learning, evolving and shaping an approach that places every child at the centre of everything we do.',
  'Bringing this experience to Dubai was a natural next step. We wanted to create more than a nursery. We wanted to build a place where children from different cultures grow together, where families feel connected and where education prepares children not only for school, but for life.',
  'Today, New World Nursery brings together the best of European educational values, the British EYFS curriculum and an international outlook, creating a nurturing environment where curiosity is encouraged, individuality is celebrated and every child is inspired to explore, discover and thrive.',
]

const STORY_IMAGES = [
  {
    src: aboutStoryExplore,
    alt: 'Children exploring outdoors at nursery',
    tall: false,
  },
  {
    src: aboutStoryNurture,
    alt: 'Everyday moments of learning at New World Nursery',
    tall: true,
  },
  {
    src: aboutStoryBelong,
    alt: 'Children sharing stories and belonging together',
    tall: false,
  },
]

/**
 * Our Story — centered title, copy + CTA left, triple rounded photos right.
 */
function OurStorySection() {
  const sectionRef = useRef(null)
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const about = settings?.about

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="our-story-heading"
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
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-36 -scale-x-100 opacity-80 sm:w-44 lg:w-52"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 text-center sm:mb-12">
          <p className="section-eyebrow">Our story</p>
          <h2
            id="our-story-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Our{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              Story
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#3d4a5c] sm:text-lg">
            {STORY_TITLE}
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl space-y-4">
            {STORY_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base"
              >
                {paragraph}
              </p>
            ))}
            <div className="pt-4">
              <Button onClick={openContactForm} className="rounded-full px-9">
                {about?.cta?.trim() || 'Discover Our Nursery'}
              </Button>
            </div>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-4">
            {STORY_IMAGES.map((item) => (
              <div
                key={item.alt}
                className={`overflow-hidden rounded-[1.75rem] shadow-[0_12px_28px_rgba(45,58,74,0.1)] sm:rounded-[2rem] ${
                  item.tall
                    ? 'h-56 w-[30%] max-w-[9.5rem] sm:h-72 sm:max-w-[11rem] lg:h-80'
                    : 'h-44 w-[28%] max-w-[8.5rem] sm:h-56 sm:max-w-[9.5rem] lg:h-64'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={280}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
