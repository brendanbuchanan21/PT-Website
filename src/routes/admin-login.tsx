import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin-login')({
  component: RouteComponent,
})

function RouteComponent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    
  }


  return (
    <div>
         <div className="min-h-screen bg-[#FFF8F1] flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#581845] mb-6 text-center">
              Admin Sign In
            </h2>
    
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-[#581845] text-white py-2 rounded-md font-semibold hover:bg-[#6e2356] transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}
