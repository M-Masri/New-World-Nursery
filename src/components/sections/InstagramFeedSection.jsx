import { useRef } from 'react'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'
import { InstagramIcon } from '../ui/SocialIcons'
import { useHomeData } from '../../context/HomeDataContext'

function InstagramFeedSection() {
  const sectionRef = useRef(null)
  const { settings, instagramFeed } = useHomeData()
  const copy = settings?.gallery ?? {}
  const instagramUrl = settings?.instagram_url
  const items = instagramFeed

  if (items.length === 0) return null

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
          {items.map((post, index) => {
            const label =
              (typeof post.alt === 'string' && post.alt.trim()) ||
              `Instagram post ${index + 1}`
            const href = post.permalink || instagramUrl

            return (
              <AnimatedCard
                key={post.id ?? index}
                as={href ? 'a' : 'div'}
                href={href || undefined}
                target={href ? '_blank' : undefined}
                rel={href ? 'noreferrer' : undefined}
                aria-label={href ? label : undefined}
                index={index}
                className="group card-surface relative aspect-square"
              >
                <img
                  src={post.image}
                  alt={label}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-[#5bb5a2]/35"
                  aria-hidden="true"
                >
                  <InstagramIcon className="h-8 w-8 scale-0 text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
                </div>
              </AnimatedCard>
            )
          })}
        </div>

        {instagramUrl && copy.cta ? (
          <div className="mt-10 text-center">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-8 py-3 text-sm font-extrabold tracking-wide text-white uppercase shadow-md transition hover:opacity-90"
            >
              <InstagramIcon className="h-5 w-5" aria-hidden="true" />
              {copy.cta}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default InstagramFeedSection
