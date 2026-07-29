import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { ArrowLeft, Quote, Sparkles } from 'lucide-react'
import {
  getBlogPostBySlug,
  formatBlogDateShort,
  blogPosts,
} from '../data/blogPosts'
import LazyImage from '../components/ui/LazyImage'
import BlogPostCard from '../components/sections/blog/BlogPostCard'
import { FacebookIcon, InstagramIcon } from '../components/ui/SocialIcons'
import { useHomeData } from '../context/HomeDataContext'
import aboutLeaf from '../assets/about-leaf.webp'

/**
 * Single blog post — editorial layout, brand colours, Related Blog.
 */
function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  const { settings } = useHomeData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [slug])

  if (!post) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-page page-gutter text-center">
          <p className="section-eyebrow">Blogs</p>
          <h1 className="section-title mb-4">Post not found</h1>
          <p className="section-lead mb-8">
            This story may have moved. Browse our latest posts instead.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5bb5a2] px-6 py-3 text-sm font-extrabold text-white uppercase"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </Link>
        </div>
      </section>
    )
  }

  const author = post.author
  const related = blogPosts.filter((item) => item.id !== post.id).slice(0, 3)
  const [lead, ...restParagraphs] = post.content
  const mid = Math.ceil(restParagraphs.length / 2)
  const beforeQuote = restParagraphs.slice(0, mid)
  const afterQuote = restParagraphs.slice(mid)

  const socials = [
    {
      href: settings?.facebook_url,
      label: 'Facebook',
      Icon: FacebookIcon,
      share: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      href: settings?.instagram_url,
      label: 'Instagram',
      Icon: InstagramIcon,
      share: settings?.instagram_url,
    },
  ]

  return (
    <div className="bg-white">
      <article>
        <div className="mx-auto max-w-page page-gutter pt-8 pb-4 sm:pt-10">
          <div className="mb-6 overflow-hidden rounded-[1.25rem] bg-nursery-mint sm:rounded-[1.5rem]">
            <LazyImage
              src={post.image}
              alt=""
              eager
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              className="aspect-[16/9] w-full"
            />
          </div>

          <span className="mb-4 inline-flex rounded-md bg-[#5bb5a2] px-3 py-1 text-[11px] font-extrabold tracking-wide text-white uppercase">
            {post.category}
          </span>

          <h1 className="mb-4 text-3xl font-extrabold leading-[1.15] text-brand-ink sm:text-4xl lg:text-[2.65rem]">
            {post.title}
          </h1>

          <p className="mb-6 text-[15px] leading-relaxed text-brand-muted sm:text-base">
            {post.excerpt}
          </p>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <img
              src={author.avatar}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border-2 border-[#5bb5a2]/25 object-cover bg-nursery-mint"
            />
            <div>
              <p className="text-sm font-extrabold text-brand-ink">{author.name}</p>
              <p className="text-xs font-semibold text-brand-muted">
                {formatBlogDateShort(post.publishedAt)}
                <span className="mx-1.5 text-[#5bb5a2]">·</span>
                {post.readMinutes} min read
              </p>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-2 border-b border-gray-100 pb-8">
            {socials.map(({ label, Icon, share, href }) => {
              const url = share || href
              if (!url) return null
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Share on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#5bb5a2]/30 text-[#5bb5a2] transition hover:border-[#5bb5a2] hover:bg-[#eef8f5]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              )
            })}
            <ShareLinkButton url={shareUrl} title={post.title} />
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-brand-muted sm:text-base">
            {lead ? <p>{lead}</p> : null}

            {post.heading ? (
              <h2 className="pt-2 text-xl font-extrabold text-brand-ink sm:text-2xl">
                {post.heading}
              </h2>
            ) : null}

            {beforeQuote.map((paragraph, index) => (
              <p key={`b-${index}`}>{paragraph}</p>
            ))}

            {post.quote ? (
              <blockquote className="relative my-8 border-l-[3px] border-[#5bb5a2] bg-nursery-mint/60 py-5 pr-6 pl-6 sm:pl-8">
                <Quote
                  className="mb-3 h-6 w-6 text-[#5bb5a2]/70"
                  aria-hidden="true"
                />
                <p className="text-lg font-semibold leading-snug text-brand-ink sm:text-xl">
                  {post.quote}
                </p>
              </blockquote>
            ) : null}

            {afterQuote.map((paragraph, index) => (
              <p key={`a-${index}`}>{paragraph}</p>
            ))}
          </div>

          {post.tags?.length ? (
            <ul className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-[#f0f2f5] px-3 py-1.5 text-xs font-bold text-brand-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 flex gap-4 rounded-2xl border border-[#5bb5a2]/15 bg-[#faf7f2] p-5 sm:p-6">
            <img
              src={author.avatar}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow-sm bg-nursery-mint sm:h-16 sm:w-16"
            />
            <div>
              <p className="text-base font-extrabold text-brand-ink">
                {author.name}
              </p>
              {author.role ? (
                <p className="mb-2 text-xs font-bold text-[#5bb5a2]">
                  {author.role}
                </p>
              ) : null}
              <p className="text-sm leading-relaxed text-brand-muted">
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section
          className="relative overflow-hidden border-t border-gray-100 bg-white py-12 sm:py-14"
          aria-labelledby="related-blog-heading"
        >
          <img
            src={aboutLeaf}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-75 sm:w-16"
          />

          <div className="relative z-10 mx-auto max-w-page page-gutter">
            <div className="mb-8 flex items-center gap-2">
              <Sparkles
                className="h-5 w-5 text-[#5bb5a2]"
                aria-hidden="true"
              />
              <h2
                id="related-blog-heading"
                className="text-xl font-extrabold text-brand-ink sm:text-2xl"
              >
                Related Blog
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <BlogPostCard key={item.id} post={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function ShareLinkButton({ url, title }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(url)
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy link to ${title}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#5bb5a2]/30 text-[#5bb5a2] transition hover:border-[#5bb5a2] hover:bg-[#eef8f5]"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </button>
  )
}

export default BlogPost
