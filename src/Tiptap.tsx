import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  if (!editor) return null

  return (
    <div>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      </BubbleMenu>

      <FloatingMenu editor={editor}>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      </FloatingMenu>

      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap;
