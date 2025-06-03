import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah L.',
    quote: 'Revive Orthoneuro gave me my strength and confidence back after surgery. Truly life-changing care!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'James M.',
    quote: 'Professional, compassionate, and incredibly effective. My recovery was smoother than I ever expected.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Emily R.',
    quote: 'The therapists really care. They created a personalized plan that helped me walk without pain again.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
]

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const testimonial = testimonials[index]

  return (
    <section className="bg-[#F5F5F5] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#581845] mb-6">
          What Our Patients Say
        </h2>

        <div className="relative bg-white p-8 rounded-xl shadow-md">
          {/* Testimonial Content */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#FFF8F1]"
            />
            <p className="text-[#424242] italic text-lg">"{testimonial.quote}"</p>
            <p className="font-semibold text-[#581845] mt-2">{testimonial.name}</p>
          </div>

          {/* Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <button onClick={handlePrev} className="text-[#581845] hover:text-[#424242]">
              <ChevronLeft size={28} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <button onClick={handleNext} className="text-[#581845] hover:text-[#424242]">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
