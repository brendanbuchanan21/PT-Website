import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useUser } from '@/contexts/User-Context'

export const Route = createFileRoute('/admin-dashboard/$postId')({
  component: RouteComponent,
})


function RouteComponent() {
  const { postId } = useParams({ from: '/admin-dashboard/$postId' })
  const navigate = useNavigate()
  const user = useUser()

  useEffect(() => {
    if (!user) {
      navigate({ to: '/admin-login' })
    }
  }, [user, navigate])

  // Mock data (replace with real fetch in production)
  const post = {
    id: postId,
    title: '5 Essential Stretches for Lower Back Pain Relief',
    date: 'June 1, 2025',
    author: 'Dr. Jane Smith',
    content: 'Lower back pain is one of the most common issues...',
    status: 'Published',
  }

  return (
    <div className="bg-[#FFF8F1] min-h-screen px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Back to Dashboard */}
        <button
          onClick={() => navigate({ to: '/admin-dashboard' })}
          className="text-[#581845] hover:underline text-sm font-medium mb-4 inline-block"
        >
          ← Back to Dashboard
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#581845] mb-2">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="text-sm text-[#757575] mb-4">
          <span>By {post.author}</span> · <span>{post.date}</span>
        </div>

        {/* Admin Actions */}
        <div className="flex space-x-4 mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Post
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Post
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[#424242]">
          <p>{post.content}</p>

          <h2>1. Cat-Cow Stretch</h2>
          <p>This gentle movement helps improve flexibility and relieve tension...</p>

          {/* Continue with rest of content */}
        </div>
      </div>
    </div>
  )
}
