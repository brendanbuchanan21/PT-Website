import { Briefcase, HeartPulse, Users } from 'lucide-react'




export default function AboutUsSection() {
  return (
    <section className="bg-[#F5F5F5] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#581845] mb-6">About Revive OrthoNeuro</h2>
        <p className="text-[#424242] max-w-2xl mx-auto mb-12">
          At Revive OrthNeuro, we believe in more than just treatment — we believe in transformation. Our expert team is committed to helping patients return to full, vibrant lives through personalized care, state-of-the-art techniques, and heartfelt support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4 text-[#581845]">
              <HeartPulse size={40} />
            </div>
            <h3 className="text-xl font-semibold text-[#424242] mb-2">Patient-Centered</h3>
            <p className="text-[#757575]">
              Every treatment is tailored to meet your unique goals and needs. We walk alongside you from day one to full recovery.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4 text-[#581845]">
              <Briefcase size={40} />
            </div>
            <h3 className="text-xl font-semibold text-[#424242] mb-2">Experienced Team</h3>
            <p className="text-[#757575]">
              With decades of combined experience, our licensed therapists use evidence-based practices to ensure effective care.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4 text-[#581845]">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-semibold text-[#424242] mb-2">Community Focused</h3>
            <p className="text-[#757575]">
              We're proud to be a trusted partner in our local community, helping neighbors heal, grow, and thrive together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
