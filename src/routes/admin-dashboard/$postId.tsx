import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { useUser } from '@/contexts/User-Context'
import { useEditMode } from '@/contexts/Edit-mode-context'
import Tiptap from '@/Tiptap'
import { getBlogPostById, changeBlogPost, deleteBlogPost } from '@/hooks/blog-hook'


type blogObject = {
    id: number
    title: string
    author: string
    date: string
    imageUrl: string
    description: string
    isPublished?: boolean
}

// This adds `file` for when user uploads a new image
type BlogContentState = blogObject & { file?: File }


export const Route = createFileRoute('/admin-dashboard/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = useParams({ from: '/admin-dashboard/$postId' });
  const navigate = useNavigate();
  const user = useUser();
  const { editMode } = useEditMode();
  const { 
    mutate: patchBlog,
    isError,
    isPending,
  } = changeBlogPost();

  const {
    mutate: deletePost,
  } = deleteBlogPost();

    useEffect(() => {
    if (!user) {
      navigate({ to: '/admin-login' })
    }
  }, [user, navigate]);


  const { data, isLoading } = getBlogPostById(postId);
  console.log('here is the individual post data potentially lol', data);

  useEffect(() => {
    if (data) {
      setBlogContent(data);
      setPreviewImage(data.imageUrl);
    }
  },[data]);

  const [blogContent, setBlogContent] = useState<BlogContentState | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
      setBlogContent(prev => prev ? {...prev, file } : prev);
    }
  }

  const handleImageClick = () => {
    if (editMode) {
      fileInputRef.current?.click()
    }
  }


  const handlePublish = () => {
    if (!blogContent?.title || !blogContent?.author || !blogContent?.date || !blogContent?.description || !blogContent?.id) {
    alert('you need to fill out all fields before publishing');
    return;
  }
  patchBlog({
    id: blogContent.id,
    title: blogContent.title,
    author: blogContent.author,
    date: blogContent.date,
    description: blogContent.description,
    isPublished: true,
    file: blogContent.file, 
  })
  
  navigate({ to: "/admin-dashboard" });
  }

  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this post?')
    if (confirm) {
      deletePost(postId);
      navigate({ to: "/admin-dashboard"});
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
            value={blogContent?.title}
            onChange={(e) => setBlogContent(prev => prev ? {...prev, title: e.target.value} : prev)}
            className="text-4xl font-bold text-[#581845] mb-2 w-full border-b border-[#ccc] focus:outline-none bg-transparent"
          />
        ) : (
          <h1 className="text-4xl font-bold text-[#581845] mb-2">{blogContent?.title}</h1>
        )}

        {/* Metadata */}
        <div className="text-sm text-[#757575] mb-6 flex flex-col gap-1">
          {editMode ? (
            <>
              <input
                type="text"
                value={blogContent?.author}
                onChange={(e) => setBlogContent(prev => prev ? {...prev, author: e.target.value} : prev)}
                className="border-b border-[#ccc] focus:outline-none bg-transparent w-fit"
              />
              <input
                type="text"
                value={blogContent?.date}
                onChange={(e) => setBlogContent(prev => prev ? {...prev, date: e.target.value} : prev)}
                className="border-b border-[#ccc] focus:outline-none bg-transparent w-fit"
              />
            </>
          ) : (
            <span>By {blogContent?.author} · {blogContent?.date}</span>
          )}
        </div>

        {/* ⬇️ Feature Image Upload */}
        <div
          className={`w-full mb-8 h-64 bg-gray-100 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 transition ${
            editMode ? 'hover:cursor-pointer hover:bg-gray-200' : ''
          }`}
          onClick={handleImageClick}
        >
          {previewImage ? (
            <img
              src={previewImage ?? blogContent?.imageUrl}
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
          <Tiptap content={blogContent?.description || ''} onChange={(newDescription: string) => {
            setBlogContent(prev => prev ? {...prev, description: newDescription} : prev)
          }} editable={editMode} />
        </div>

        {/* Post Action Buttons */}
        <div className="flex flex-wrap gap-4">
              <button
      
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
