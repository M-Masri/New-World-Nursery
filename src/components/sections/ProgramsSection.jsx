import { useRef } from 'react'
import { Baby, Flower2, GraduationCap, Lightbulb } from 'lucide-react'
import programsIcon from '../../assets/New_World_Icon00018-removebg-preview.webp'
import BrushHighlightText from '../ui/BrushHighlightText'
import AnimatedCard from '../ui/AnimatedCard'

const programs = [
  {
    title: 'Toddlers',
    age: '18 Months - 2.5 Years',
    description:
      'A gentle introduction to learning through play and sensory activities.',
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=260&fit=crop',
    icon: Baby,
    color: '#8cb83a',
    lightBg: '#eef6e0',
  },
  {
    title: 'Nursery',
    age: '2.5 - 3.5 Years',
    description: 'Encouraging independence and building essential early skills.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=260&fit=crop',
    icon: Flower2,
    color: '#f07a7a',
    lightBg: '#fde8e8',
  },
  {
    title: 'Pre-Nursery',
    age: '3.5 - 4.5 Years',
    description: 'Building confidence and preparing for the next stage.',
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
      'School readiness program with focus on academic and social skills.',
    image:
      'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=260&fit=crop',
    icon: GraduationCap,
    color: '#5bb5a2',
    lightBg: '#e0f3ef',
  },
]

function ProgramsSection() {
  const sectionRef = useRef(null)

  return (
    <section id="programs" ref={sectionRef} className="relative scroll-mt-24 overflow-hidden bg-white py-16">
      <ProgramsDecorations />

      <div className="relative mx-auto max-w-page px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-extrabold tracking-[0.25em] text-[#5bb5a2] uppercase">
            Our Programs
          </p>
          <h2 className="text-3xl font-extrabold text-[#2d3a4a] sm:text-4xl">
            Programs{' '}
            <BrushHighlightText triggerRef={sectionRef}>We Offer</BrushHighlightText>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <button
            type="button"
            className="rounded-lg border-2 border-[#f07a7a] bg-white px-8 py-2.5 text-sm font-extrabold tracking-wide text-[#f07a7a] uppercase transition hover:bg-[#fde8e8]"
          >
            View All Programs
          </button>
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
      className="overflow-hidden rounded-2xl bg-white shadow-md"
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
        <h3 className="mb-1 text-base font-extrabold text-[#2d3a4a]">
          {program.title}
        </h3>
        <p className="mb-3 text-xs font-bold text-[#2d3a4a]">{program.age}</p>
        <p className="text-xs leading-relaxed text-[#5a6578]">
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
        className="absolute bottom-10 left-8 h-6 w-6 text-[#f5c842] opacity-50"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2 L14.5 9 L22 9.5 L16.5 14 L18.5 22 L12 17.5 L5.5 22 L7.5 14 L2 9.5 L9.5 9 Z" />
      </svg>

      <div className="absolute right-8 bottom-8 flex gap-2 opacity-40">
        <span className="text-sm text-[#f4a0b0]">♥</span>
        <span className="text-xs text-[#f5c842]">★</span>
        <span className="text-sm text-[#f4a0b0]">♥</span>
      </div>
    </div>
  )
}

export default ProgramsSection
