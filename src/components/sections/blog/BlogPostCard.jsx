import { Link } from 'react-router-dom'
import { formatBlogDate } from '../../../data/blogPosts'
import LazyImage from '../../ui/LazyImage'

const ACCENTS = [
  { accent: '#5bb5a2', bg: '#eef8f5' },
  { accent: '#f4a0b0', bg: '#fff0f3' },
  { accent: '#f5b942', bg: '#fff8e8' },
  { accent: '#a682b8', bg: '#f5eef8' },
]

/**
 * Small blog card — same look as Our Programs cards (no icon).
 */
function BlogPostCard({ post, index = 0 }) {
  const { accent, bg: lightBg } = ACCENTS[index % ACCENTS.length]

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="program-card card-surface flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#5bb5a2]/40"
    >
      <div className="relative shrink-0" style={{ backgroundColor: lightBg }}>
        <LazyImage
          src={post.image}
          alt=""
          eager={false}
          width={400}
          height={176}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-44 w-full"
        />

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 400 28"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,18 C60,4 140,26 200,14 C260,2 340,24 400,12 L400,28 L0,28 Z"
            fill={lightBg}
          />
        </svg>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col"
        style={{
          backgroundColor: lightBg,
          borderBottom: `5px solid ${accent}`,
        }}
      >
        <div className="flex-1 px-5 pt-5 pb-6">
          <p
            className="mb-1 text-[11px] font-extrabold tracking-[0.18em] uppercase"
            style={{ color: accent }}
          >
            {post.category}
          </p>
          <h3 className="mb-1 text-base font-extrabold text-brand-ink">
            {post.title}
          </h3>
          <p className="mb-3 text-xs font-bold text-brand-ink">
            {formatBlogDate(post.publishedAt)}
            <span className="mx-1.5" style={{ color: accent }}>
              ·
            </span>
            {post.readMinutes} min read
          </p>
          <p className="line-clamp-3 text-xs leading-relaxed text-brand-muted">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostCard
