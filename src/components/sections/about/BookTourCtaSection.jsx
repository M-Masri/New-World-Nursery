import kidsPattern from '../../../assets/kidspattren.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import { useContactFormPopup } from '../../../context/ContactFormContext'
import Button from '../../ui/Button'

/**
 * Book a Tour CTA — teal panel with kids pattern, opens contact popup.
 */
function BookTourCtaSection() {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const ctaLabel =
    settings?.hero?.cta_primary?.trim() ||
    settings?.about?.cta?.trim() ||
    'Book a Tour'

  return (
    <section
      className="relative bg-white py-12 sm:py-14"
      aria-labelledby="book-tour-heading"
    >
      <div className="page-gutter">
        <div className="relative mx-auto max-w-page overflow-hidden rounded-[1.75rem] bg-[#5bb5a2] px-6 py-12 text-center shadow-[0_14px_36px_rgba(91,181,162,0.28)] sm:rounded-[2rem] sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${kidsPattern})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '280px auto',
              backgroundPosition: 'center',
            }}
          />

          <div className="relative z-10">
            <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-white uppercase">
              Come visit
            </p>
            <h2
              id="book-tour-heading"
              className="mb-4 text-3xl font-extrabold text-white sm:text-4xl"
            >
              Book a tour
            </h2>
            <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-white">
              See our classrooms, meet the team, and feel the warmth for yourself.
              We would love to welcome your family.
            </p>
            <Button
              className="!border-2 !border-white !bg-white !text-[#5bb5a2] px-10 py-3 shadow-md shadow-black/10 hover:!bg-[#faf7f2] hover:!text-[#4a9e8d]"
              onClick={openContactForm}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookTourCtaSection
