import {
  UserCheck,
  BadgeCheck,
  Building2,
  Microscope,
} from 'lucide-react'

export default function WhyChooseUsSection() {
  return (
    <section className="bg-[#FFF8F1] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#581845] mb-6">
          Why Choose Us
        </h2>
        <p className="text-[#424242] max-w-2xl mx-auto mb-12">
          We're more than a clinic — we're your dedicated partner in healing and long-term wellness.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Personalized Care */}
          <FeatureCard
            icon={<UserCheck size={36} />}
            title="Personalized Care"
            description="Each treatment plan is crafted to meet your specific needs and goals."
          />

          {/* Certified Therapists */}
          <FeatureCard
            icon={<BadgeCheck size={36} />}
            title="Certified Therapists"
            description="Our team is made up of licensed professionals with specialized expertise."
          />

          {/* State-of-the-Art Facility */}
          <FeatureCard
            icon={<Building2 size={36} />}
            title="Modern Facility"
            description="Train and recover in a welcoming, fully equipped rehab space."
          />

          {/* Evidence-Based Treatment */}
          <FeatureCard
            icon={<Microscope size={36} />}
            title="Evidence-Based Methods"
            description="We use the latest science to guide your recovery process for optimal results."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-left">
      <div className="text-[#581845] mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#424242] mb-1">{title}</h3>
      <p className="text-sm text-[#757575]">{description}</p>
    </div>
  )
}
