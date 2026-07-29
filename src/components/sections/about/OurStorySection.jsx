import aboutLeaf from '../../../assets/about-leaf.webp'
import aboutKids from '../../../assets/about-kids.webp'
import heroKids from '../../../assets/hero-kids.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useContactFormPopup } from '../../../context/ContactFormContext'
import Button from '../../ui/Button'

const FALLBACK_STORY =
  'Born out of a love for little learners, New World Nursery connects caring educators with families in Al Barsha. We believe in play with purpose, warm trusted care, and a joyful start that helps every child grow with confidence, curiosity, and kindness.'

/**
 * Our Story — centered title, copy + CTA left, triple rounded photos right.
 */
function OurStorySection() {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const about = settings?.about
  const storyText = about?.content?.trim() || FALLBACK_STORY
  const primaryImage = about?.image || aboutKids
  const midImage = aboutKids
  const sideImage = heroKids

  const images = [
    { src: sideImage, alt: 'Children exploring at nursery', tall: false },
    { src: primaryImage, alt: 'Everyday moments at New World Nursery', tall: true },
    { src: midImage, alt: 'Learning through play', tall: false },
  ]

  return (
    <section
      id="our-story"
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
          <h2
            id="our-story-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Our{' '}
            <span className="relative inline-block">
              Story
              <span
                className="absolute right-0 -bottom-2 left-0 mx-auto h-[3px] w-14 rounded-full bg-[#5bb5a2]"
                aria-hidden="true"
              />
            </span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="mb-8 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
              {storyText}
            </p>
            <Button onClick={openContactForm} className="rounded-full px-9">
              {about?.cta?.trim() || 'Discover Our Nursery'}
            </Button>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-4">
            {images.map((item) => (
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
