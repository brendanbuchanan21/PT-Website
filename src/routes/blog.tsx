import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useGetBlogPosts } from '@/hooks/blog-hook'
import type { blogObject } from '@/hooks/blog-hook'





export const Route = createFileRoute('/blog')({
  component: RouteComponent,
})

function RouteComponent() {

  const {
    data,
    isError
  } = useGetBlogPosts();



  return (
    <div className="bg-[#FFF8F1] min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#581845] mb-12 text-center">
          Revive Insights: Health & Wellness
        </h1>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data ? (
            <>
            {data.map((post: blogObject) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#581845] mb-2">{post.title}</h2>
                <p className="text-sm text-[#757575] mb-2">
                  By {post.author} • {post.date}
                </p>
                <p className="text-[#424242] text-sm mb-4">
                  {post.description.length > 100 ? `${post.description.slice(0, 150)}...` 
                  : post.description}
                </p>
                <Link
                  to="/Blog-post-page"
                  className="text-[#FBC02D] font-semibold hover:underline text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
            </>
          ) : (
            <p>Blog Posts soon to come!</p>
          )}
          
        </div>
      </div>
    </div>
  )
}
