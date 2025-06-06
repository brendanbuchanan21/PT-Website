import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@/contexts/User-Context'
import { useEditMode } from '@/contexts/Edit-mode-context'
import Tiptap from '@/Tiptap'

export const Route = createFileRoute('/admin-dashboard/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = useParams({ from: '/admin-dashboard/$postId' })
  const navigate = useNavigate()
  const user = useUser()
  const { editMode } = useEditMode()

  // Initial Post State (mock, replace with fetched data)
  const initialPost = {
    id: postId,
    title: '5 Essential Stretches for Lower Back Pain Relief',
    date: 'June 1, 2025',
    author: 'Dr. Jane Smith',
    content: 'Lower back pain is one of the most common issues...',
    status: 'Published',
  }

  const [title, setTitle] = useState(initialPost.title)
  const [date, setDate] = useState(initialPost.date)
  const [author, setAuthor] = useState(initialPost.author)
  const [content, setContent] = useState(initialPost.content)

  const [image, setImage] = useState<File | null>(null)
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
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleImageClick = () => {
    if (editMode) {
      fileInputRef.current?.click()
    }
  }

  const handleSave = () => {
    // send `title`, `author`, `date`, `content`, `image` to backend
    console.log({ title, author, date, content, image })
    alert('Changes saved!')
  }

  const handlePublish = () => {
    alert('Post published!')
  }

  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this post?')
    if (confirm) {
      alert('Post deleted!')
    }
  }

  return (
    <div className="bg-[#FFF8F1] min-h-screen px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Back to Dashboard */}
        <button
          onClick={() => navigate({ to: '/admin-dashboard' })}
          className="text-[#581845] hover:underline text-sm font-medium mb-4 inline-block cursor-pointer"
        >
          ← Back to Dashboard
        </button>

        {/* Title */}
        {editMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold text-[#581845] mb-2 w-full border-b border-[#ccc] focus:outline-none bg-transparent"
          />
        ) : (
          <h1 className="text-4xl font-bold text-[#581845] mb-2">{title}</h1>
        )}

        {/* Metadata */}
        <div className="text-sm text-[#757575] mb-6 flex flex-col gap-1">
          {editMode ? (
            <>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-b border-[#ccc] focus:outline-none bg-transparent w-fit"
              />
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-b border-[#ccc] focus:outline-none bg-transparent w-fit"
              />
            </>
          ) : (
            <span>By {author} · {date}</span>
          )}
        </div>

        {/* ⬇️ Feature Image Upload */}
        <div
          className={`w-full mb-8 h-64 bg-gray-100 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 transition ${
            editMode ? 'hover:cursor-pointer hover:bg-gray-200' : ''
          }`}
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

        {/* Post Content - Tiptap */}
        <div className="prose prose-lg max-w-none text-[#424242] mb-8">
          <Tiptap content={content} onChange={setContent} editable={editMode} />
        </div>

        {/* Post Action Buttons */}
        <div className="flex flex-wrap gap-4">
              <button
        onClick={handleSave}
        className="bg-[#FBC02D] text-[#581845] font-semibold px-5 py-2 rounded-md hover:bg-yellow-400 transition"
      >
        Save Changes
      </button>
      <button
        onClick={handlePublish}
        className="bg-[#581845] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#6d1b7b] transition"
      >
        Publish
      </button>
      <button
        onClick={handleDelete}
        className="bg-[#EF5350] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#e53935] transition"
      >
        Delete Post
      </button>

        </div>
      </div>
    </div>
  )
}
