import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BrushHighlightText from '../ui/BrushHighlightText'
import LazyImage from '../ui/LazyImage'
import { fetchLatestBlogs } from '../../lib/api'
import { formatBlogDateShort, normalizeBlogPosts } from '../../data/blogPosts'
import { useLanguage } from '../../i18n'

function BlogTeaserCard({ post, index = 0 }) {
  const { t } = useLanguage()
  const href = `/blog/${post.slug}`
  const dateLabel = formatBlogDateShort(post.publishedAt)

  return (
    <Link
      to={href}
      className="group relative block overflow-hidden rounded-[1.5rem] bg-nursery-mint text-left shadow-[0_10px_30px_rgba(45,58,74,0.06)] transition hover:shadow-[0_16px_40px_rgba(45,58,74,0.1)]"
    >
      <div className="relative aspect-[16/9]">
        <LazyImage
          src={post.image}
          alt={post.title}
          eager={index === 0}
          enabled
          width={900}
          height={520}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="h-full w-full"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/35 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="p-5 sm:p-6">
        <p className="mb-2 text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#5bb5a2]">
          {t('home.latestBadge')}
        </p>
        <h3 className="mb-2 line-clamp-2 text-base font-extrabold text-brand-ink transition group-hover:text-[#5bb5a2]">
          {post.title}
        </h3>
        <p className="mb-3 text-xs font-bold text-brand-ink">
          {dateLabel}
          {dateLabel ? <span className="mx-1.5 text-[#5bb5a2]">·</span> : null}
          {t('home.latestMinRead', { n: post.readMinutes })}
        </p>
        {post.excerpt ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-brand-muted">
            {post.excerpt}
          </p>
        ) : null}

        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#5bb5a2]">
          {t('home.latestReadMore')} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

/**
 * Latest Blogs section for Home — displayed above Contact Form.
 */
function LatestBlogsSection({ limit = 3 }) {
  const sectionRef = useRef(null)
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  const safeLimit = useMemo(() => {
    const n = Number(limit)
    if (Number.isNaN(n) || n <= 0) return 3
    return Math.min(20, Math.max(1, n))
  }, [limit])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchLatestBlogs(safeLimit, language)
      .then((list) => {
        if (cancelled) return
        const normalized = normalizeBlogPosts(list)
        setPosts(normalized)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setPosts([])
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [safeLimit, language])

  if (status === 'error') return null
  if (status === 'ready' && posts.length === 0) return null

  return (
    <section
      id="latest-blogs"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 sm:py-12"
      aria-labelledby="latest-blogs-heading"
    >
      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-8 text-center">
          <p className="section-eyebrow">{t('home.latestEyebrow')}</p>
          <h2
            id="latest-blogs-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('home.latestTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('home.latestTitleHighlight')}
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-muted">
            {t('home.latestLead')}
          </p>
        </div>

        {status === 'loading' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: safeLimit }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-[1.5rem] bg-nursery-mint"
              >
                <div className="aspect-[16/9] bg-[#dfeee9]" />
                <div className="p-5">
                  <div className="mb-2 h-3 w-2/3 rounded bg-[#dfeee9]" />
                  <div className="mb-2 h-3 w-full rounded bg-[#dfeee9]" />
                  <div className="mb-2 h-3 w-3/4 rounded bg-[#dfeee9]" />
                  <div className="h-3 w-1/2 rounded bg-[#dfeee9]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlogTeaserCard
                  key={post.id ?? post.slug}
                  post={post}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5bb5a2] px-6 py-3 text-sm font-extrabold text-white uppercase shadow-md transition hover:opacity-90"
              >
                {t('home.latestViewAll')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default LatestBlogsSection
