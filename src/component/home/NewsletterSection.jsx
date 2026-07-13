import newsletterBear from '../../assets/newsletter-bear.png'
import newsletterBalloon from '../../assets/newsletter-balloon.png'

function NewsletterSection() {
  return (
    <section className="relative overflow-hidden">
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

      <div className="relative bg-[#eef8f5] px-4 pt-14 pb-12 sm:px-6">
        <div className="mx-auto flex max-w-page flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={newsletterBear}
              alt=""
              aria-hidden="true"
              className="h-24 w-auto shrink-0 object-contain sm:h-28"
            />
            <div>
              <h2 className="text-lg font-extrabold text-[#2d3a4a] sm:text-xl lg:text-2xl">
                Ready to Give Your Child the Best Start?
              </h2>
              <p className="mt-1 text-sm text-[#5a6578]">
                Schedule a visit today and see our nursery in action.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-end lg:w-auto">
            <form
              className="flex w-full max-w-md overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm sm:max-w-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-white px-5 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#f4846b] px-6 py-3 text-sm font-extrabold tracking-wide text-white uppercase transition hover:bg-[#e86f55]"
              >
                Subscribe
              </button>
            </form>

            <img
              src={newsletterBalloon}
              alt=""
              aria-hidden="true"
              className="hidden h-24 w-auto shrink-0 object-contain sm:block lg:h-28"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
