import { useEffect, useState } from 'react'
import jhanati from '../images/jhanati.jpg'
import { useEditMode } from '@/contexts/Edit-mode-context'
import { useHeroSection, usePatchHeroSection } from '@/hooks/useHeroSection'


export default function HeroSection() {
  const { editMode } = useEditMode()

  // State to manage live text and drafts
  const [heading, setHeading] = useState('')
  const [subText1, setSubtext1] = useState('')
  const [subText2, setSubtext2] = useState('')

  const [draftHeading, setDraftHeading] = useState(heading)
  const [draft1, setDraft1] = useState(subText1)
  const [draft2, setDraft2] = useState(subText2)

 
  // create use query to capture and mutate the heading texts
  const { data, isLoading } = useHeroSection();

  useEffect(() => {
    if (data) {
      setHeading(data.heading);
      setSubtext1(data.subText1);
      setSubtext2(data.subText2);
      setDraftHeading(data.heading);
      setDraft1(data.subText1);
      setDraft2(data.subText2);
    }
  }, [data])

  const patchHero = usePatchHeroSection();
 
  const handleSave = () => {
   patchHero.mutate({
    heading: draftHeading,
    subText1: draft1,
    subText2: draft2
   })
  }

  // handle function sending the admin input to the backend

  return (
    <div className="bg-[#FFF8F1] min-h-[70vh] w-full px-4 pt-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 px-4">
        {/* Left: Text Content */}
        {isLoading ? (
          <div className="min-h-[70vh] w-full px-4 pt-24 flex items-center justify-center">
            <span className="text-[#581845]">Loading...</span>
          </div>
        ) : (
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
              subText1
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
              subText2
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
        )}
        

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
