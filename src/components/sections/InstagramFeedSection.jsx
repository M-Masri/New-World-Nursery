import { useEffect, useRef } from 'react'
import { InstagramIcon } from '../ui/SocialIcons'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'
import LottieScroll from '../ui/LottieScroll'

const instagramPosts = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=400&fit=crop&fm=webp&q=70',
    alt: 'Happy child smiling at New World Nursery',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&fm=webp&q=70',
    alt: 'Story time circle with young learners',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=400&fit=crop&fm=webp&q=70',
    alt: 'Creative arts and crafts in class',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&fm=webp&q=70',
    alt: 'Hands-on learning through play',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop&fm=webp&q=70',
    alt: 'Sensory play table for toddlers',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&fm=webp&q=70',
    alt: 'Children enjoying outdoor play time',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=400&fit=crop&fm=webp&q=70&sat=-20',
    alt: 'Friends collaborating on a group activity',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&fm=webp&q=70&sat=-30',
    alt: 'Music and movement session',
  },
]

function InstagramFeedSection() {
  const sectionRef = useRef(null)
  const walkerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const walker = walkerRef.current
    if (!section || !walker) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        walker.style.animationPlayState = entry.isIntersecting
          ? 'running'
          : 'paused'
      },
      { rootMargin: '40px', threshold: 0.05 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 sm:py-12"
    >
      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-8 text-center">
          <p className="section-eyebrow">Instagram</p>
          <h2 className="section-title">
            Follow{' '}
            <BrushHighlightText triggerRef={sectionRef}>Our Journey</BrushHighlightText>
          </h2>
          <p className="section-lead">
            Peek into classroom moments, outdoor play, and the everyday joy of
            New World Nursery life.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {instagramPosts.map((post, index) => (
            <AnimatedCard
              key={post.id}
              as="a"
              href="#instagram"
              index={index}
              className="group card-surface relative aspect-square"
            >
              <img
                src={post.image}
                alt={post.alt}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-[#5bb5a2]/35">
                <InstagramIcon className="h-8 w-8 scale-0 text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-md transition hover:opacity-90"
          >
            <InstagramIcon className="h-5 w-5" />
            Follow Us on Instagram
          </a>
        </div>

        <div className="instagram-walker-track mx-auto mt-6" aria-hidden="true">
          <div ref={walkerRef} className="instagram-walker">
            <LottieScroll
              animationImport={() =>
                import('../../assets/lottie/loading-walk.json')
              }
              triggerRef={sectionRef}
              mode="playWhileInView"
              speed={0.65}
              className="instagram-walk-lottie h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstagramFeedSection
