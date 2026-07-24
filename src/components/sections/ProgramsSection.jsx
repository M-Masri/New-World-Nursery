import { useRef } from 'react'
import { Baby, Flower2, GraduationCap, Lightbulb } from 'lucide-react'
import programsIcon from '../../assets/New_World_Icon00018-removebg-preview.webp'
import { useContactFormPopup } from '../../context/ContactFormContext'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'
import Button from '../ui/Button'

const programs = [
  {
    title: 'Toddlers',
    age: '18 Months - 2.5 Years',
    description:
      'Soft routines, sensory play, and first friendships that ease the start of nursery life.',
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=260&fit=crop',
    icon: Baby,
    color: '#8cb83a',
    lightBg: '#eef6e0',
  },
  {
    title: 'Nursery',
    age: '2.5 - 3.5 Years',
    description:
      'Growing independence through language, sharing, and confident everyday skills.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=260&fit=crop',
    icon: Flower2,
    color: '#f4a0b0',
    lightBg: '#fdf0f3',
  },
  {
    title: 'Pre-Nursery',
    age: '3.5 - 4.5 Years',
    description:
      'Curiosity-led projects that stretch thinking, creativity, and social confidence.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=260&fit=crop',
    icon: Lightbulb,
    color: '#f5b942',
    lightBg: '#fdf3d8',
  },
  {
    title: 'KG',
    age: '4.5 - 5.5 Years',
    description:
      'School-ready focus on literacy, numeracy, and the social skills for a smooth move up.',
    image:
      'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=260&fit=crop',
    icon: GraduationCap,
    color: '#5bb5a2',
    lightBg: '#e0f3ef',
  },
]

function ProgramsSection() {
  const sectionRef = useRef(null)
  const { openContactForm } = useContactFormPopup()

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20"
    >
      <ProgramsDecorations />

      <div className="relative mx-auto max-w-page page-gutter">
        <div className="mb-12 text-center">
          <p className="section-eyebrow">Our Programs</p>
          <h2 className="section-title">
            Learning by{' '}
            <BrushHighlightText triggerRef={sectionRef}>age & stage</BrushHighlightText>
          </h2>
          <p className="section-lead">
            Play-led pathways from first steps to school readiness — each stage
            matched to how children learn best.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <Button variant="outlineCoral" onClick={openContactForm}>
            Enquire About a Place
          </Button>
          <img
            src={programsIcon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none w-28 sm:w-32 lg:w-36"
          />
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, index }) {
  const Icon = program.icon

  return (
    <AnimatedCard
      index={index}
      className="card-surface"
      style={{ borderBottom: `5px solid ${program.color}` }}
    >
      <div className="relative">
        <img
          src={program.image}
          alt={program.title}
          className="h-44 w-full object-cover"
        />

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 400 28"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,18 C60,4 140,26 200,14 C260,2 340,24 400,12 L400,28 L0,28 Z"
            fill="white"
          />
        </svg>

        <div
          className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full shadow-md"
          style={{ backgroundColor: program.color }}
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={2} />
        </div>
      </div>

      <div className="px-5 pt-7 pb-6" style={{ backgroundColor: program.lightBg }}>
        <h3 className="mb-1 text-base font-extrabold text-brand-ink">
          {program.title}
        </h3>
        <p className="mb-3 text-xs font-bold text-brand-ink">{program.age}</p>
        <p className="text-xs leading-relaxed text-brand-muted">
          {program.description}
        </p>
      </div>
    </AnimatedCard>
  )
}

function ProgramsDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg
        className="absolute top-16 left-8 h-8 w-8 text-[#f5c842] opacity-40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>
      <svg
        className="absolute right-10 bottom-24 h-6 w-6 text-[#f4a0b0] opacity-35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21 C12 21 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 12 4.5 12 4.5 C12 4.5 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 12 21 12 21Z" />
      </svg>
    </div>
  )
}

export default ProgramsSection
