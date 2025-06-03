import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFF8F1] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#581845] mb-6 text-center">
          Create an Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#424242] mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#424242] mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#424242] mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#581845] text-white py-2 rounded-md font-semibold hover:bg-[#6e2356] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-[#757575]">
          <p>
            Already have an account?{' '}
            <Link to="/signin" className="text-[#FBC02D] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
