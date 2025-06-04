import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/blog-post-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-[#FFF8F1] min-h-screen px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="text-[#581845] hover:underline text-sm font-medium mb-4 inline-block"
        >
          ← Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#581845] leading-tight">
          5 Essential Stretches for Lower Back Pain Relief
        </h1>

        {/* Author Info */}
        <div className="mt-4 text-sm text-[#757575]">
          <span>By Dr. Jane Smith</span> · <span>June 1, 2025</span>
        </div>

        {/* Hero Image */}
        <div className="my-8 rounded-lg overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80"
            alt="Stretching therapy"
            className="w-full h-72 object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[#424242]">
          <p>
            Lower back pain is one of the most common issues we treat, and fortunately, it’s also one of the most manageable with proper stretches and strengthening routines.
          </p>
          <h2>1. Cat-Cow Stretch</h2>
          <p>
            This gentle movement helps improve flexibility and relieve tension. Begin on your hands and knees and alternate between arching your back and rounding it slowly.
          </p>
          <h2>2. Child’s Pose</h2>
          <p>
            A relaxing posture that stretches the spine, hips, and thighs. Kneel and sit back on your heels, then stretch your arms forward and lower your forehead to the ground.
          </p>
          <h2>3. Piriformis Stretch</h2>
          <p>
            This targets deep muscles near the hips that can contribute to back pain. Lie on your back, cross one leg over the opposite knee, and gently pull the lower leg toward you.
          </p>
          <h2>4. Knee-to-Chest Stretch</h2>
          <p>
            Lie on your back and bring one or both knees toward your chest, holding for 15–30 seconds to relax your lower back.
          </p>
          <h2>5. Seated Forward Fold</h2>
          <p>
            Sit with legs extended and reach toward your toes, maintaining a long spine. Don’t push too hard—gentle stretching is key.
          </p>

          <p className="mt-8 font-semibold">
            Always consult with a licensed physical therapist before beginning any new stretching routine—especially if you have persistent or severe pain.
          </p>
        </div>
      </div>
    </div>
  )
}
