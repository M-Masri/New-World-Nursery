import { useRef } from 'react'
import { Award, BookOpen, Landmark, RefreshCw } from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import BrushHighlightText from '../../ui/BrushHighlightText'

const CREDENTIALS = [
  {
    label: 'Framework',
    title: 'British EYFS Framework',
    text: 'Our educational practice is built on the British Early Years Foundation Stage (EYFS), one of the world’s most respected frameworks for early childhood education. EYFS supports children’s learning through purposeful play, exploration and carefully planned experiences, while nurturing every aspect of their cognitive, physical, social and emotional development.',
    Icon: BookOpen,
    accent: '#5bb5a2',
    soft: '#eef8f5',
  },
  {
    label: 'Dubai standards',
    title: 'Aligned with KHDA Standards',
    text: 'Every New World Nursery in Dubai is designed in alignment with the educational expectations and quality standards established by Dubai’s Knowledge and Human Development Authority (KHDA). By combining internationally recognised educational practice with the requirements of the UAE, we provide families with confidence that every child benefits from education that is both globally respected and locally relevant.',
    Icon: Landmark,
    accent: '#f4a0b0',
    soft: '#fff0f3',
  },
  {
    label: 'Everyday practice',
    title: 'A Culture of Continuous Improvement',
    text: 'Excellence is not something we achieve once. It is something we practise every day. We continually invest in professional development, review our educational practice and refine our learning environments to reflect new research, evolving educational standards and the changing needs of children and families. Because the best education is always learning too.',
    Icon: RefreshCw,
    accent: '#f5b942',
    soft: '#fff8e8',
  },
]

/**
 * Awards & Accreditations — featured award + credential foundations.
 */
function AwardsAccreditationsSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="awards-accreditations"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="awards-accreditations-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 w-12 opacity-80 sm:w-16 lg:w-20"
      />
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-36 -scale-x-100 opacity-75 sm:w-44 lg:w-52"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 max-w-3xl sm:mb-14">
          <p className="section-eyebrow !mb-3 !text-left">
            Awards & Accreditations
          </p>
          <h2
            id="awards-accreditations-heading"
            className="text-3xl font-extrabold leading-tight text-[#2d3a4a] sm:text-4xl"
          >
            Recognition Built on{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              Excellence
            </BrushHighlightText>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
            Exceptional education is built through consistency, experience and an
            unwavering commitment to quality. The organisation behind New World
            Nursery has spent more than 16 years developing educational
            communities where children thrive, families feel supported and high
            standards are part of everyday practice.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
            Our educational foundations are strengthened by recognised
            achievements, internationally respected frameworks and a culture of
            continuous improvement that continues to shape every New World
            Nursery.
          </p>
        </div>

        {/* Featured award — Eagles of Education */}
        <article className="mb-10 overflow-hidden rounded-[2rem] bg-[#eef8f5] sm:mb-12 sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="flex flex-col justify-center bg-[#5bb5a2] px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Award className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mb-3 text-[11px] font-extrabold tracking-[0.22em] text-white/80 uppercase">
                Prestigious recognition
              </p>
              <h3 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Eagles of Education
              </h3>
              <p className="mt-2 text-sm font-semibold text-white/90 sm:text-[15px]">
                Orły Edukacji — Poland’s respected distinction in early childhood
                education
              </p>
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
              <p className="text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
                The educational organisation behind New World Nursery has been
                recognised with the prestigious Eagles of Education (Orły
                Edukacji) award, one of Poland’s most respected distinctions in
                early childhood education.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#3d4a5c] sm:text-base">
                This recognition is based on independent parent reviews and
                public trust, celebrating educational organisations that
                consistently demonstrate outstanding quality, professionalism and
                meaningful partnerships with families.
              </p>
              <p className="mt-6 border-l-4 border-[#5bb5a2] pl-5 text-base font-extrabold leading-snug text-[#2d3a4a] sm:text-lg">
                For us, this award represents more than recognition. It reflects
                years of dedication to creating exceptional learning environments
                where children feel safe, inspired and supported to reach their
                full potential.
              </p>
            </div>
          </div>
        </article>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {CREDENTIALS.map(({ label, title, text, Icon, accent, soft }) => (
            <article
              key={title}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
              style={{ backgroundColor: soft }}
            >
              <span
                className="h-1.5 w-full shrink-0"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
                    style={{ color: accent }}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p
                      className="text-[10px] font-extrabold tracking-[0.18em] uppercase"
                      style={{ color: accent }}
                    >
                      {label}
                    </p>
                    <h3 className="text-base font-extrabold text-[#2d3a4a] sm:text-lg">
                      {title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#3d4a5c] sm:text-[15px]">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AwardsAccreditationsSection
