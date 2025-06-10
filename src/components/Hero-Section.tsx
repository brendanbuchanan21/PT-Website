import { useState } from 'react'
import jhanati from '../images/jhanati.jpg'
import { useEditMode } from '@/contexts/Edit-mode-context'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { getAuth } from 'firebase/auth'


export default function HeroSection() {
  const { editMode } = useEditMode()

  // State to manage live text and drafts
  const [heading, setHeading] = useState('Empower. Restore. Thrive.')
  const [subText1, setSubtext1] = useState('At Revive OrthoNeuro, we specialize in helping you regain strength, movement, and confidence.')
  const [subText2, setSubtext2] = useState('Experience personalized physical therapy designed to heal, empower, and revitalize your life.')

  const [draftHeading, setDraftHeading] = useState(heading)
  const [draft1, setDraft1] = useState(subText1)
  const [draft2, setDraft2] = useState(subText2)

 
  // create use query to capture and mutate the heading texts
  const mutation = useMutation({
    mutationFn: async (newHeadingTexts: {
      heading: string
      subText1: string
      subText2: string
    }) => {
       // capture the user 
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("user not authenticated");
      const token = await user.getIdToken();
      console.log('here is the user token', token);

      return axios.patch('http://localhost:8080/api/hero-section', newHeadingTexts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
    },
    onSuccess: () => {
      setHeading(draftHeading)
      setSubtext1(draft1)
      setSubtext2(draft2)
      console.log('hello world');
    },
    onError: (error) => {
      console.error('Failed to update hero section:', error)
      console.log('request did not process');
    }
  })

  const handleSave = () => {
   mutation.mutate({
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
