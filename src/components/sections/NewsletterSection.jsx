import { useRef } from 'react'
import LottieScroll from '../ui/LottieScroll'

function NewsletterSection() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 -bottom-48 right-4 z-[5] w-56 overflow-hidden sm:right-6 sm:-bottom-56 sm:w-64 lg:w-72"
        aria-hidden="true"
      >
        <LottieScroll
          animationImport={() => import('../../assets/lottie/balloon.json')}
          triggerRef={sectionRef}
          mode="playWhileInView"
          speed={0.18}
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

      <div className="relative bg-[#eef8f5] page-gutter pt-10 pb-8">
        <div className="relative z-10 mx-auto flex max-w-page flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <LottieScroll
              animationImport={() =>
                import('../../assets/lottie/newsletter-bear.json')
              }
              triggerRef={sectionRef}
              mode="playWhileInView"
              className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
            />
            <div>
              <h2 className="text-lg font-extrabold text-brand-ink sm:text-xl lg:text-2xl">
                Come see New World in action
              </h2>
              <p className="mt-1 text-sm text-brand-muted">
                Leave your email and we&apos;ll help you schedule a visit.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-end sm:pr-60 lg:pr-72">
            <form
              className="flex w-full max-w-md overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm sm:max-w-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-white px-5 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#5bb5a2]/40"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#5bb5a2] px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase transition hover:bg-[#4a9e8d]"
              >
                Enquire
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
