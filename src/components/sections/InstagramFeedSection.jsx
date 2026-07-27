import { useEffect, useRef } from 'react'
import { InstagramIcon } from '../ui/SocialIcons'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'
import LottieScroll from '../ui/LottieScroll'
import { useHomeData } from '../../context/HomeDataContext'

function InstagramFeedSection() {
  const sectionRef = useRef(null)
  const walkerRef = useRef(null)
  const { settings, gallery } = useHomeData()
  const copy = settings?.gallery ?? {}
  const instagramUrl = settings?.instagram_url

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
  }, [gallery.length])

  if (gallery.length === 0) return null

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 sm:py-12"
    >
      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-8 text-center">
          {copy.label ? <p className="section-eyebrow">{copy.label}</p> : null}
          {copy.title || copy.title_highlight ? (
            <h2 className="section-title">
              {copy.title ? <>{copy.title} </> : null}
              {copy.title_highlight ? (
                <BrushHighlightText triggerRef={sectionRef}>
                  {copy.title_highlight}
                </BrushHighlightText>
              ) : null}
            </h2>
          ) : null}
          {copy.subtitle ? <p className="section-lead">{copy.subtitle}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {gallery.map((post, index) => (
            <AnimatedCard
              key={post.id ?? index}
              as={instagramUrl ? 'a' : 'div'}
              href={instagramUrl || undefined}
              target={instagramUrl ? '_blank' : undefined}
              rel={instagramUrl ? 'noreferrer' : undefined}
              index={index}
              className="group card-surface relative aspect-square"
            >
              <img
                src={post.image}
                alt={post.alt || ''}
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

        {instagramUrl && copy.cta ? (
          <div className="mt-10 text-center">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-md transition hover:opacity-90"
            >
              <InstagramIcon className="h-5 w-5" />
              {copy.cta}
            </a>
          </div>
        ) : null}

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
