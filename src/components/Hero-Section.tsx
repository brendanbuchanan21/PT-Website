import { useState } from 'react'
import jhanati from '../images/jhanati.jpg'
import { useEditMode } from '@/contexts/Edit-mode-context'

export default function HeroSection() {
  const { editMode } = useEditMode()

  // State to manage live text and drafts
  const [heading, setHeading] = useState('Empower. Restore. Thrive.')
  const [subtext1, setSubtext1] = useState('At Revive OrthoNeuro, we specialize in helping you regain strength, movement, and confidence.')
  const [subtext2, setSubtext2] = useState('Experience personalized physical therapy designed to heal, empower, and revitalize your life.')

  const [draftHeading, setDraftHeading] = useState(heading)
  const [draft1, setDraft1] = useState(subtext1)
  const [draft2, setDraft2] = useState(subtext2)

  const handleSave = () => {
    setHeading(draftHeading)
    setSubtext1(draft1)
    setSubtext2(draft2)
  }

  // handle function sending the admin input to the backend

  return (
    <div className="bg-[#FFF8F1] min-h-[70vh] w-full px-4 pt-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 px-4">
        {/* Left: Text Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#581845] leading-tight">
            {editMode ? (
              <input
                type="text"
                value={draftHeading}
                onChange={(e) => setDraftHeading(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-black"
              />
            ) : (
              heading
            )}
          </h1>

          <p className="mt-4 text-lg text-[#424242]">
            {editMode ? (
              <textarea
                value={draft1}
                onChange={(e) => setDraft1(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-black"
              />
            ) : (
              subtext1
            )}
          </p>

          <p className="mt-2 text-md text-[#757575]">
            {editMode ? (
              <textarea
                value={draft2}
                onChange={(e) => setDraft2(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-black"
              />
            ) : (
              subtext2
            )}
          </p>

          {editMode && (
            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-[#581845] text-white rounded hover:bg-[#3c0d30] transition"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Right: Responsive Image */}
        <div className="max-w-sm w-full mb-10">
          <div className="aspect-square bg-[#F5F5F5] rounded-xl shadow-inner overflow-hidden">
            <img
              src={jhanati}
              alt="Physical therapist"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
