import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

const mockPosts = [
  {
    id: 1,
    title: '5 Essential Stretches for Lower Back Pain Relief',
    summary:
      'Discover simple stretches that can help alleviate lower back pain and improve your mobility from the comfort of home.',
    author: 'Dr. Jane Smith',
    date: 'June 1, 2025',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'How Neurological Rehab Can Transform Recovery',
    summary:
      'Learn how specialized neuro therapy supports patients recovering from stroke, spinal injuries, and more.',
    author: 'Dr. Alan Lee',
    date: 'May 25, 2025',
    image: 'https://images.unsplash.com/photo-1588776814546-ec6b4e998b16?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Balance & Vestibular Therapy: What You Should Know',
    summary:
      'Feeling dizzy or off-balance? This therapy might be the key to regaining stability and confidence.',
    author: 'Dr. Maria Gonzales',
    date: 'May 15, 2025',
    image: 'https://images.unsplash.com/photo-1559757175-0836b933b4e7?auto=format&fit=crop&w=800&q=80',
  },
]


export const Route = createFileRoute('/blog')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-[#FFF8F1] min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#581845] mb-12 text-center">
          Revive Insights: Health & Wellness
        </h1>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#581845] mb-2">{post.title}</h2>
                <p className="text-sm text-[#757575] mb-2">
                  By {post.author} • {post.date}
                </p>
                <p className="text-[#424242] text-sm mb-4">{post.summary}</p>
                <Link
                  to="/Blog-post-page"
                  className="text-[#FBC02D] font-semibold hover:underline text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
