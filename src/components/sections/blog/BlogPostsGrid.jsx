import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { blogPosts, formatBlogDate } from '../../../data/blogPosts'
import LazyImage from '../../ui/LazyImage'
import BlogPostCard from './BlogPostCard'

/**
 * Editorial blog grid — featured story + remaining posts.
 */
function BlogPostsGrid() {
  const [featured, ...rest] = blogPosts

  return (
    <section
      id="blog-posts"
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="blog-posts-heading"
    >
      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 text-center sm:mb-14">
          <p className="section-eyebrow">From our nursery</p>
          <h2
            id="blog-posts-heading"
            className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl"
          >
            Latest{' '}
            <span className="relative inline-block">
              posts
              <span
                className="absolute right-0 -bottom-2 left-0 mx-auto h-[3px] w-14 rounded-full bg-[#5bb5a2]"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-muted">
            Stories and ideas from our educators — written for the families we
            welcome every day.
          </p>
        </div>

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
                Featured · {featured.category}
              </p>
              <h3 className="mb-4 text-2xl font-extrabold leading-snug text-brand-ink transition group-hover:text-[#5bb5a2] sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mb-5 max-w-md text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                {featured.excerpt}
              </p>
              <p className="mb-6 text-xs font-bold text-brand-muted">
                {formatBlogDate(featured.publishedAt)}
                <span className="mx-1.5 text-[#5bb5a2]">·</span>
                {featured.readMinutes} min read
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#5bb5a2] transition group-hover:gap-2.5">
                Read story
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ) : null}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPostsGrid
