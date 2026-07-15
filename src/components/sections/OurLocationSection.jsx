import { useRef } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
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
    flag: '🇦🇪',
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
    flag: '🇸🇦',
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
    flag: '🇶🇦',
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
    flag: '🇰🇼',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
  },
]

function OurLocationSection() {
  const sectionRef = useRef(null)

  return (
    <section id="locations" ref={sectionRef} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-extrabold tracking-[0.25em] text-[#5bb5a2] uppercase">
            Our Location
          </p>
          <h2 className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl">
            Branches Across{' '}
            <BrushHighlightText triggerRef={sectionRef}>the Region</BrushHighlightText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5a6578]">
            Visit one of our nurseries and discover a welcoming space where
            children learn, play, and grow with confidence.
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
  return (
    <AnimatedCard
      as="article"
      index={index}
      className="group overflow-hidden rounded-3xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden sm:h-48">
        <img
          src={branch.image}
          alt={`${branch.city}, ${branch.country}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a4a]/80 via-[#2d3a4a]/20 to-transparent" />

        <span className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow-md backdrop-blur-sm">
          {branch.flag}
        </span>

        <div className="absolute right-3 bottom-3 left-3">
          <p className="text-[10px] font-bold tracking-wide text-white/80 uppercase">
            {branch.country}
          </p>
          <h3 className="text-lg font-extrabold text-white">{branch.city}</h3>
        </div>
      </div>

      <div className="p-4">
        <ul className="space-y-3">
          <LocationDetail icon={MapPin} text={branch.address} />
          <LocationDetail icon={Phone} text={branch.phone} />
          <LocationDetail icon={Mail} text={branch.email} />
          <LocationDetail icon={Clock} text={branch.hours} />
        </ul>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#5bb5a2] transition group-hover:gap-2.5"
        >
          View Branch
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </AnimatedCard>
  )
}

function LocationDetail({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-2 text-xs text-[#5a6578]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef8f5]">
        <Icon className="h-3.5 w-3.5 text-[#5bb5a2]" />
      </span>
      <span className="pt-1 leading-relaxed">{text}</span>
    </li>
  )
}

export default OurLocationSection
