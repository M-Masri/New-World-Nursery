import { useRef } from 'react'
import LottieScroll from '../ui/LottieScroll'
import { useHomeData } from '../../context/HomeDataContext'
import { useLanguage } from '../../i18n'

function formatNewsletterTitle(title) {
  const match = title.match(/^(.*?)\s+(in action)$/i)
  if (!match) return title
  return (
    <>
      {match[1]}
      <br />
      {match[2]}
    </>
  )
}

function NewsletterSection() {
  const sectionRef = useRef(null)
  const { settings } = useHomeData()
  const { t, isRtl } = useLanguage()
  const title = settings?.newsletter_title

  if (!title) return null

  const form = (
    <form
      className="flex w-full max-w-md flex-row overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm sm:max-w-lg"
      onSubmit={(e) => e.preventDefault()}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {t('home.newsletterEmail')}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={t('home.newsletterPlaceholder')}
        className="min-w-0 flex-1 bg-white px-5 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#5bb5a2]/40"
      />
      <button
        type="submit"
        className={`shrink-0 bg-[#5bb5a2] px-6 py-3 text-sm font-extrabold tracking-wide text-white transition hover:bg-[#4a9e8d] ${
          isRtl ? 'normal-case' : 'uppercase'
        }`}
      >
        {t('home.newsletterEnquire')}
      </button>
    </form>
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        className={`pointer-events-none absolute top-0 -bottom-48 z-[5] w-56 overflow-hidden sm:-bottom-56 sm:w-64 lg:w-72 ${
          isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
        }`}
        aria-hidden="true"
      >
        <LottieScroll
          animationImport={() => import('../../assets/lottie/balloon.json')}
          triggerRef={sectionRef}
          mode="playWhileInView"
          speed={0.1}
          rendererSettings={{ preserveAspectRatio: 'none' }}
          className="newsletter-balloon-lottie pointer-events-none absolute inset-0 h-full w-full"
        />
      </div>

      <svg
        className="absolute top-0 left-0 w-full text-[#eef8f5]"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,28 C240,58 480,4 720,26 C960,48 1200,8 1440,32 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="relative bg-[#eef8f5] pt-10 pb-8">
        <div
          className={`relative z-10 mx-auto flex max-w-page flex-col items-center gap-5 page-gutter sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 lg:gap-6 ${
            isRtl
              ? 'lg:justify-start sm:pl-52 lg:pl-0'
              : 'lg:justify-start sm:pr-52 lg:pr-0'
          }`}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <LottieScroll
              animationImport={() =>
                import('../../assets/lottie/newsletter-bear.json')
              }
              triggerRef={sectionRef}
              mode="playWhileInView"
              allowMobile
              className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
            />
            <div>
              <h2
                className={`text-lg font-extrabold leading-tight text-brand-ink sm:text-xl lg:text-2xl ${
                  isRtl ? 'text-right' : 'text-left'
                }`}
              >
                {formatNewsletterTitle(title)}
              </h2>
            </div>
          </div>

          {form}
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
