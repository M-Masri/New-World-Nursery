import { useRef } from 'react'
import instagramIcon from '../../assets/New_World_Icon00010-removebg-preview.webp'
import { InstagramIcon } from '../ui/SocialIcons'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'

const instagramPosts = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop',
    alt: 'Children playing together',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
    alt: 'Nursery classroom activities',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=400&fit=crop',
    alt: 'Happy child at nursery',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
    alt: 'Learning through play',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=400&fit=crop',
    alt: 'Creative arts session',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop',
    alt: 'Outdoor play time',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
    alt: 'Playroom fun',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop',
    alt: 'Story time',
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
    alt: 'Group activities',
  },
  {
    id: 10,
    image:
      'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=400&fit=crop',
    alt: 'Music and movement',
  },
  {
    id: 11,
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
    alt: 'Sensory play',
  },
  {
    id: 12,
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop',
    alt: 'Smiles at nursery',
  },
]

function InstagramFeedSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fffbf5] py-16"
    >
      <img
        src={instagramIcon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-20 w-28 opacity-95 sm:w-32 lg:w-40"
      />

      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-extrabold tracking-[0.25em] text-[#5bb5a2] uppercase">
            Instagram
          </p>
          <h2 className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl">
            Follow{' '}
            <BrushHighlightText triggerRef={sectionRef}>Our Journey</BrushHighlightText>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {instagramPosts.map((post, index) => (
            <AnimatedCard
              key={post.id}
              as="a"
              href="#instagram"
              index={index}
              className="group relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <InstagramIcon className="h-8 w-8 scale-0 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-md transition hover:opacity-90"
          >
            <InstagramIcon className="h-5 w-5" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

export default InstagramFeedSection
