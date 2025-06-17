import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function Tiptap({
  content,
  onChange,
  editable,
}: {
  content: string
  onChange: (html: string) => void
  editable: boolean
}) {


  function stripOuterTags(html: string): string {
  return html
    .replace(/^<(p|h2|h3)>(.*?)<\/\1>$/i, '$2') // match exact outer tag
    .replace(/<\/?(p|h2|h3)>/gi, '')            // remove remaining opening/closing tags
    .trim();
}

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const rawHtml = editor.getHTML()
      const cleanedHtml = stripOuterTags(rawHtml)
      onChange(cleanedHtml)
    },
  })

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable)
    }
  }, [editable, editor])

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      {editable && (
        <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold text-purple-700' : ''}>
            Bold
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic text-purple-700' : ''}>
            Italic
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-purple-700' : ''}>
            • List
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'text-purple-700' : ''}>
            H2
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'text-purple-700' : ''}>
            H3
          </button>
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  )
}
