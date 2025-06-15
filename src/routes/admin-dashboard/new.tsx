import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@/contexts/User-Context'
import Tiptap from '@/Tiptap'
import { usePostBlog } from '@/hooks/blog-hook'

export const Route = createFileRoute('/admin-dashboard/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const user = useUser();

  const postBlog = usePostBlog();

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!user) {
      navigate({ to: '/admin-login' })
    }
  }, [user, navigate])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleSave = () => {
    // send new post data to backend
    console.log({ title, author, date, description, file })
    if (!title || !date || !author || !description || !file) {
      alert("Please select");
      return;
    }
    postBlog.mutate({
      title,
      date,
      author,
      description,
      file,
    })

    navigate({ to: "/admin-dashboard" });


  }

  const handlePublish = () => {
    alert('New post published!')
  }

  

  return (
    <div className="bg-[#FFF8F1] min-h-screen px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate({ to: '/admin-dashboard' })}
          className="text-[#581845] hover:underline text-sm font-medium mb-4 inline-block cursor-pointer"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-[#581845] mb-6">Create New Post</h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-4xl font-bold text-[#581845] mb-2 w-full border-b border-[#ccc] focus:outline-none bg-transparent"
        />

        <div className="text-sm text-[#757575] mb-6 flex flex-col gap-1">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="border-b border-[#ccc] focus:outline-none bg-transparent w-fit"
          />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date (e.g., June 6, 2025)"
            className="border-b border-[#ccc] focus:outline-none bg-transparent w-fit"
          />
        </div>

        <div
          className="w-full mb-8 h-64 bg-gray-100 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 hover:cursor-pointer hover:bg-gray-200"
          onClick={handleImageClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <span>+ Upload Feature Image</span>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="prose prose-lg max-w-none text-[#424242] mb-8">
          <Tiptap content={description} onChange={setDescription} editable={true} />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleSave}
            className="bg-[#FBC02D] text-[#581845] font-semibold px-5 py-2 rounded-md hover:bg-yellow-400 transition cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="bg-[#581845] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#6d1b7b] transition"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}
