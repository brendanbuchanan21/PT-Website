import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { useUser } from '@/contexts/User-Context'

const mockPosts = [
  {
    id: 1,
    title: '5 Essential Stretches for Lower Back Pain Relief',
    date: 'June 1, 2025',
    status: 'Published',
  },
  {
    id: 2,
    title: 'How to Improve Your Posture at Work',
    date: 'May 15, 2025',
    status: 'Draft',
  },
]


export const Route = createFileRoute('/admin-dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
     
        const [posts, setPosts] = useState(mockPosts)
        const navigate = useNavigate();
        const user = useUser();
    
        useEffect(() => {
          if (user === null) {
            navigate({to: "/admin-login"})
          }
        }, [user, navigate])
    
    
        const handleNavigatePost = (id: number) => {
          navigate({
            to: "/admin-dashboard/$postId",
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
              <button className="bg-[#FBC02D] text-[#581845] px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
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
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-[#FFF3E0] cursor-pointer" onClick={() => {
                      handleNavigatePost(post.id)
                    }}>
                      <td className="py-3 px-4 font-medium">{post.title}</td>
                      <td className="py-3 px-4">{post.date}</td>
                      <td className="py-3 px-4">{post.status}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button className="text-sm text-[#581845] hover:underline">Edit</button>
                        <button className="text-sm text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
}
