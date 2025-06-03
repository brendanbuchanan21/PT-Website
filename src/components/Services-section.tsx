import {
  ActivitySquare,
  BrainCircuit,
  Slice,
  Radar,
  Footprints,
} from 'lucide-react'

export default function ServicesOverviewSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#581845] mb-6">
          Our Services
        </h2>
        <p className="text-[#424242] max-w-2xl mx-auto mb-12">
          Comprehensive care tailored to your recovery. Whether you're overcoming surgery, managing chronic pain, or improving balance — we’re here to support your journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Orthopedic Therapy */}
          <ServiceCard
            icon={<ActivitySquare size={40} />}
            title="Orthopedic Therapy"
            description="Targeted care for joint, muscle, and bone injuries to restore function and mobility."
          />

          {/* Neurological Rehab */}
          <ServiceCard
            icon={<BrainCircuit size={40} />}
            title="Neurological Rehab"
            description="Support for conditions like stroke, MS, and neuropathy with goal-driven recovery plans."
          />

          {/* Post-Surgical Rehab */}
          <ServiceCard
            icon={<Slice size={40} />}
            title="Post-Surgical Rehab"
            description="Personalized rehab programs following surgery to accelerate healing and reduce pain."
          />

          {/* Balance & Vestibular Therapy */}
          <ServiceCard
            icon={<Radar size={40} />}
            title="Balance & Vestibular Therapy"
            description="Specialized therapy to manage dizziness, vertigo, and unsteady gait."
          />

          {/* Gait Training */}
          <ServiceCard
            icon={<Footprints size={40} />}
            title="Gait Training"
            description="Improve your walking pattern, coordination, and confidence through tailored training."
          />
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-6 shadow-md hover:shadow-lg transition text-left">
      <div className="text-[#581845] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#424242] mb-2">{title}</h3>
      <p className="text-[#757575] text-sm">{description}</p>
    </div>
  )
}
