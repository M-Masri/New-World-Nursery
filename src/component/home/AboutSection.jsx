import aboutLeaf from '../../assets/about-leaf.webp'

function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <AboutLeafDecoration />

      <div className="relative mx-auto grid max-w-page items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <AboutImageFrame />

        <div className="relative">
          <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-[#5bb5a2] uppercase">
            About Us
          </p>

          <h2 className="mb-6 text-3xl leading-tight font-extrabold text-[#2d3a4a] sm:text-4xl">
            Welcome to
            <br />
            New World Nursery
          </h2>

          <p className="mb-8 max-w-md text-[15px] leading-relaxed text-[#5a6578]">
            We are dedicated to providing high-quality early years education in
            a warm and nurturing environment. Our curriculum is designed to
            inspire curiosity, creativity and a lifelong love for learning.
          </p>

          <button
            type="button"
            className="rounded-lg border-2 border-[#5bb5a2] bg-white px-8 py-2.5 text-sm font-extrabold tracking-wide text-[#5bb5a2] uppercase transition hover:bg-[#eef8f5]"
          >
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}

function AboutImageFrame() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <svg
        className="absolute -top-12 -left-12 z-20"
        width="208"
        height="208"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 34 C6 14 14 6 34 6"
          stroke="#f4b8c8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute -right-12 -bottom-12 z-20"
        width="208"
        height="208"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M42 14 C42 34 34 42 14 42"
          stroke="#f4b8c8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative rounded-[3rem] p-3 sm:rounded-[3.5rem] sm:p-4">
        <div className="overflow-hidden rounded-[2.5rem] sm:rounded-[3rem]">
          <img
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=650&h=520&fit=crop"
            alt="Nursery classroom with play tent and cushions"
            className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[400px]"
          />
        </div>
      </div>
    </div>
  )
}

function AboutLeafDecoration() {
  return (
    <>
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-90 sm:w-14 lg:w-16"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-40 opacity-90 sm:w-44 lg:w-48"
      />
    </>
  )
}


export default AboutSection
