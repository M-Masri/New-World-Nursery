import { useRef } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import locationIcon from '../../assets/New_World_Icon00032-removebg-preview.webp'
import { useContactFormPopup } from '../../context/ContactFormContext'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'

const branches = [
  {
    id: 1,
    country: 'United Arab Emirates',
    city: 'Dubai',
    address: 'Al Barsha, Dubai, UAE',
    phone: '+971 50 123 4567',
    email: 'dubai@newworldnursery.ae',
    hours: 'Sun – Thu: 7:00 AM – 6:00 PM',
    accent: '#5bb5a2',
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    country: 'Saudi Arabia',
    city: 'Riyadh',
    address: 'Al Olaya District, Riyadh',
    phone: '+966 50 123 4567',
    email: 'riyadh@newworldnursery.ae',
    hours: 'Sun – Thu: 7:00 AM – 6:00 PM',
    accent: '#f4a0b0',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    country: 'Qatar',
    city: 'Doha',
    address: 'West Bay, Doha',
    phone: '+974 50 123 4567',
    email: 'doha@newworldnursery.ae',
    hours: 'Sun – Thu: 7:00 AM – 6:00 PM',
    accent: '#f5b942',
    image:
      'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    country: 'Kuwait',
    city: 'Kuwait City',
    address: 'Salmiya, Kuwait City',
    phone: '+965 50 123 4567',
    email: 'kuwait@newworldnursery.ae',
    hours: 'Sun – Thu: 7:00 AM – 6:00 PM',
    accent: '#a682b8',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
  },
]

function OurLocationSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fff8f2] py-16 sm:py-20"
    >
      <img
        src={locationIcon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-20 w-28 opacity-95 sm:w-32 lg:w-40"
      />

      <div className="relative z-10 mx-auto max-w-page page-gutter">
        <div className="mb-12 text-center">
          <p className="section-eyebrow">Our Locations</p>
          <h2 className="section-title">
            Find us across{' '}
            <BrushHighlightText triggerRef={sectionRef}>the region</BrushHighlightText>
          </h2>
          <p className="section-lead max-w-2xl">
            Start with our Dubai home in Al Barsha — then explore sister
            nurseries welcoming families across the Gulf.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((branch, index) => (
            <LocationCard key={branch.id} branch={branch} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationCard({ branch, index }) {
  const { openContactForm } = useContactFormPopup()

  return (
    <AnimatedCard
      as="article"
      index={index}
      className="group card-surface transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(45,58,74,0.12)]"
    >
      <div className="relative h-44 overflow-hidden sm:h-48">
        <img
          src={branch.image}
          alt={`${branch.city}, ${branch.country}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/80 via-[#2d3a4a]/20 to-transparent" />

        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide text-white uppercase shadow-sm"
          style={{ backgroundColor: branch.accent }}
        >
          {branch.city}
        </span>

        <div className="absolute right-3 bottom-3 left-3">
          <p className="text-[10px] font-bold tracking-wide text-white/80 uppercase">
            {branch.country}
          </p>
          <h3 className="text-lg font-extrabold text-white">{branch.city}</h3>
        </div>
      </div>

      <div className="border-t-4 p-4" style={{ borderColor: branch.accent }}>
        <ul className="space-y-3">
          <LocationDetail icon={MapPin} text={branch.address} />
          <LocationDetail icon={Phone} text={branch.phone} />
          <LocationDetail icon={Mail} text={branch.email} />
          <LocationDetail icon={Clock} text={branch.hours} />
        </ul>

        <button
          type="button"
          onClick={openContactForm}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#5bb5a2] transition group-hover:gap-2.5"
        >
          Plan a Visit
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </AnimatedCard>
  )
}

function LocationDetail({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-2 text-xs text-brand-muted">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-nursery-mint">
        <Icon className="h-3.5 w-3.5 text-[#5bb5a2]" />
      </span>
      <span className="pt-1 leading-relaxed">{text}</span>
    </li>
  )
}

export default OurLocationSection
