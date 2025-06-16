import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/User-Context'
import { useGetBlogPosts } from '@/hooks/blog-hook'


type blogObject = {
    id: number
    title: string
    author: string
    date: string
    imageUrl: string
    description: string
    isPublished: boolean
}

export const Route = createFileRoute('/admin-dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [posts, setPosts] = useState<blogObject[]>([]);
  const navigate = useNavigate();
  const user = useUser()

  // this is for protecting the route from non admin user
  useEffect(() => {
    if (user === null) {
      navigate({ to: '/admin-login' })
    }
  }, [user, navigate])

  // handle the fetching of blog posts
  const { data, isLoading, error } = useGetBlogPosts();
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data])

  // this is to handle going to individual posts
  const handleNavigatePost = (id: number) => {
    navigate({
      to: '/admin-dashboard/$postId',
      params: { postId: String(id) },
    })
  }


  return (
    <div className="bg-[#FFF8F1] min-h-screen px-6 pt-24 pb-16 text-[#424242]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#581845] mb-6">Admin Dashboard</h1>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-md text-[#757575]">Manage blog posts and content</p>
          <button className="bg-[#FBC02D] text-[#581845] px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition cursor-pointer"
            onClick={() => {
              navigate({to: "/admin-dashboard/new"})
            }}
          >
            + New Post
          </button>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-[#581845] text-white text-sm">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b hover:bg-[#FFF3E0] cursor-pointer"
                  onClick={() => handleNavigatePost(post.id)}
                >
                  <td className="py-3 px-4 font-medium">{post.title}</td>
                  <td className="py-3 px-4">{post.date}</td>
                  <td className="py-3 px-4">{post.isPublished === true ? "Published" : "Draft"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
