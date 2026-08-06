import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { fetchBlogs } from '../../../lib/api'
import { formatBlogDate, normalizeBlogPosts } from '../../../data/blogPosts'
import { useLanguage } from '../../../i18n'
import BrushHighlightText from '../../ui/BrushHighlightText'
import LazyImage from '../../ui/LazyImage'
import BlogPostCard from './BlogPostCard'

/**
 * Editorial blog grid — featured story + remaining posts (from API).
 */
function BlogPostsGrid() {
  const sectionRef = useRef(null)
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    fetchBlogs(language)
      .then((list) => {
        if (cancelled) return
        setPosts(normalizeBlogPosts(list))
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
  }, [language])

  const [featured, ...rest] = posts

  return (
    <section
      id="blog-posts"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="blog-posts-heading"
    >
      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 text-center sm:mb-14">
          <p className="section-eyebrow">{t('blog.gridEyebrow')}</p>
          <h2
            id="blog-posts-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            {t('blog.gridTitleBefore')}{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              {t('blog.gridTitleHighlight')}
            </BrushHighlightText>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-muted">
            {t('blog.gridLead')}
          </p>
        </div>

        {status === 'loading' ? (
          <div className="space-y-8">
            <div className="grid animate-pulse overflow-hidden rounded-media bg-nursery-mint lg:grid-cols-2 lg:rounded-[2rem]">
              <div className="aspect-[16/11] bg-[#dfeee9] lg:min-h-[22rem]" />
              <div className="space-y-4 px-6 py-8 sm:px-8 sm:py-10">
                <div className="h-3 w-28 rounded bg-[#dfeee9]" />
                <div className="h-8 w-4/5 rounded bg-[#dfeee9]" />
                <div className="h-4 w-full rounded bg-[#dfeee9]" />
                <div className="h-4 w-3/4 rounded bg-[#dfeee9]" />
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-[1.5rem] bg-nursery-mint"
                />
              ))}
            </div>
          </div>
        ) : status === 'error' ? (
          <p className="py-16 text-center text-sm text-brand-muted">
            {t('blog.loadError')}
          </p>
        ) : posts.length === 0 ? (
          <p className="py-16 text-center text-sm text-brand-muted">
            {t('blog.empty')}
          </p>
        ) : (
          <>
            {featured ? (
              <Link
                to={`/blog/${featured.slug}`}
                className="group mb-10 grid overflow-hidden rounded-media bg-nursery-mint lg:mb-12 lg:grid-cols-2 lg:rounded-[2rem]"
              >
                <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                  <LazyImage
                    src={featured.image}
                    alt=""
                    eager
                    width={900}
                    height={620}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="absolute inset-0 h-full w-full"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#eef8f5]/40"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                  <p className="mb-3 text-[11px] font-extrabold tracking-[0.22em] text-[#5bb5a2] uppercase">
                    {t('blog.featured')}
                  </p>
                  <h3 className="mb-4 text-2xl font-extrabold leading-snug text-brand-ink transition group-hover:text-[#5bb5a2] sm:text-3xl">
                    {featured.title}
                  </h3>
                  {featured.excerpt ? (
                    <p className="mb-5 max-w-md text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                      {featured.excerpt}
                    </p>
                  ) : null}
                  <p className="mb-6 text-xs font-bold text-brand-muted">
                    {formatBlogDate(featured.publishedAt)}
                    {featured.publishedAt ? (
                      <span className="mx-1.5 text-[#5bb5a2]">·</span>
                    ) : null}
                    {t('blog.minRead', { n: featured.readMinutes })}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#5bb5a2] transition group-hover:gap-2.5">
                    {t('blog.readStory')}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <BlogPostCard key={post.id ?? post.slug} post={post} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default BlogPostsGrid
