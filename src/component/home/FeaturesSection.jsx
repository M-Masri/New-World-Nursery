import {
  Flower2,
  HeartHandshake,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    description: "Your child's safety and well-being is our top priority.",
    iconBg: 'bg-[#c8e8d8]',
  },
  {
    icon: Users,
    title: 'Qualified Educators',
    description: 'Experienced and passionate teachers who care.',
    iconBg: 'bg-[#f5d5c0]',
  },
  {
    icon: Flower2,
    title: 'Play-based Learning',
    description: 'Learning through play, exploration and discovery.',
    iconBg: 'bg-[#f3e4a8]',
  },
  {
    icon: Sprout,
    title: 'Holistic Development',
    description:
      'Focusing on social, emotional, cognitive and physical growth.',
    iconBg: 'bg-[#ddd0ee]',
  },
  {
    icon: HeartHandshake,
    title: 'Strong Parent Partnership',
    description: "Working together for your child's bright future.",
    iconBg: 'bg-[#c8e3ee]',
  },
]

function FeaturesSection() {
  return (
    <section id="why-us" className="bg-[#f3ebe0] py-12">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col items-center px-4 text-center ${
              index < features.length - 1
                ? 'lg:border-r lg:border-[#e8e2d8]'
                : ''
            }`}
          >
            <div
              className={`mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full ${feature.iconBg}`}
            >
              <feature.icon
                className="h-8 w-8 text-[#2d3a4a]"
                strokeWidth={1.6}
              />
            </div>
            <h3 className="mb-2 text-[15px] font-bold text-[#2d3a4a]">
              {feature.title}
            </h3>
            <p className="max-w-[200px] text-[13px] leading-relaxed text-[#4a5568]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
