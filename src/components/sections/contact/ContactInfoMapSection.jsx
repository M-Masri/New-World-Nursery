import { useRef } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import aboutLeaf from '../../../assets/about-leaf.webp'
import locationIcon from '../../../assets/New_World_Icon00032-removebg-preview.webp'
import { useHomeData } from '../../../context/HomeDataContext'
import BrushHighlightText from '../../ui/BrushHighlightText'

function mapsEmbedUrl(query) {
  if (!query) return null
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

function mapsOpenUrl(query) {
  if (!query) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/**
 * Contact details + embedded map, with branch cards when locations exist.
 */
function ContactInfoMapSection() {
  const sectionRef = useRef(null)
  const { settings, locations } = useHomeData()
  const contact = settings?.contact ?? {}
  const phone = contact.phone || settings?.top_bar_phone
  const email = contact.email || settings?.top_bar_email
  const address = contact.address
  const primaryLocation = locations[0]
  const mapQuery =
    address ||
    [primaryLocation?.address, primaryLocation?.city, primaryLocation?.country]
      .filter(Boolean)
      .join(', ')
  const embedSrc = mapsEmbedUrl(mapQuery)
  const openMapsHref = mapsOpenUrl(mapQuery)

  return (
    <section
      id="find-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16"
      aria-labelledby="find-us-heading"
    >
      <img
        src={aboutLeaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 w-28 -scale-x-100 opacity-75 sm:w-36 lg:w-44"
      />
      <img
        src={locationIcon}
        alt=""
        width={160}
        height={160}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 right-0 z-20 w-28 opacity-90 sm:-bottom-4 sm:w-32 lg:w-40"
      />

      {/* soft floating accents like Programs on Home */}
      <svg
        className="pointer-events-none absolute top-16 right-10 z-0 h-7 w-7 text-[#f5c842] opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-28 left-8 z-0 h-6 w-6 text-[#f4a0b0] opacity-35"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z" />
      </svg>

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-10 max-w-2xl">
          <p className="section-eyebrow">Find us</p>
          <h2 id="find-us-heading" className="section-title">
            Contact info &amp;{' '}
            <BrushHighlightText triggerRef={sectionRef}>
              map
            </BrushHighlightText>
          </h2>
          <p className="section-lead">
            Visit us, call, or write — we are here to welcome your family.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-10">
          <div className="flex flex-col gap-5">
            {address ? (
              <InfoRow
                icon={MapPin}
                label="Address"
                value={address}
                href={openMapsHref}
              />
            ) : null}
            {phone ? (
              <InfoRow
                icon={Phone}
                label="Phone"
                value={phone}
                href={`tel:${phone.replace(/\s+/g, '')}`}
              />
            ) : null}
            {email ? (
              <InfoRow
                icon={Mail}
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
            ) : null}
            <InfoRow
              icon={Clock}
              label="Hours"
              value={
                primaryLocation?.working_hours ||
                'Sun – Thu: 7:00 AM – 6:00 PM · Fri – Sat: Closed'
              }
            />
          </div>

          <div className="min-h-[280px] overflow-hidden rounded-[1.75rem] border border-[#5bb5a2]/15 bg-[#eef8f5] shadow-[0_14px_36px_rgba(45,58,74,0.08)] sm:min-h-[360px] sm:rounded-[2rem]">
            {embedSrc ? (
              <iframe
                title="Nursery location map"
                src={embedSrc}
                className="h-full min-h-[280px] w-full border-0 sm:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center px-6 text-center text-sm text-brand-muted sm:min-h-[360px]">
                Map will appear once an address is available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#5bb5a2]">
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold text-brand-muted">{label}</span>
        <span className="mt-0.5 block text-sm font-semibold leading-relaxed text-brand-ink">
          {value}
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 transition hover:border-[#5bb5a2]/25 hover:bg-[#eef8f5]"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4">
      {content}
    </div>
  )
}

export default ContactInfoMapSection
