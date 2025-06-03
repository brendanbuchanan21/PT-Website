import jhanati from '../images/jhanati.jpg'


export default function HeroSection() {
    
    return (
    <div className="bg-[#FFF8F1] min-h-screen w-full px-4 pt-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 px-4">
        
        {/* Left: Text Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#581845] leading-tight">
            Empower. Restore. Thrive.
          </h1>
          <p className="mt-4 text-lg text-[#424242]">
            At Revive Orthoneuro, we specialize in helping you regain strength, movement, and confidence.
          </p>
          <p className="mt-2 text-md text-[#757575]">
            Experience personalized physical therapy designed to heal, empower, and revitalize your life.
          </p>
        </div>

        {/* Right: Responsive Image */}
        <div className="max-w-sm w-full">
          <div className="aspect-square bg-[#F5F5F5] rounded-xl shadow-inner overflow-hidden">
            <img
              src={jhanati}
              alt="Physical therapist"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}