import { useState } from 'react'
import { useNavigate, useLocation, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { FaUserCircle } from 'react-icons/fa'
import { useUser } from '@/contexts/User-Context'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useEditMode } from '@/contexts/Edit-mode-context'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
  const user = useUser();
  const { editMode, toggleEditMode } = useEditMode();

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate({ to: '/admin-login' })
    } catch (error) {
      console.error(error)
    }
  }

  const handleAnchorClick = (hash: string) => {
    if (location.pathname !== '/') {
      navigate({ to: '/' })

      // Delay scroll to allow homepage to mount
      setTimeout(() => {
        const el = document.getElementById(hash)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }



  return (
    <header className="sticky top-0 z-50 bg-[#581845] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">OrthoNeuro</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium">
          <Link to='/' className="hover:text-[#FBC02D] transition">
            Home
          </Link>
          <button onClick={() => handleAnchorClick('about')} className="hover:text-[#FBC02D] transition">
            About Us
          </button>
          <button onClick={() => handleAnchorClick('services')} className="hover:text-[#FBC02D] transition">
            Services
          </button>
          <Link to="/blog" className="hover:text-[#FBC02D] transition">
            Blog
          </Link>
          <button onClick={() => handleAnchorClick('footer-contact')} className="hover:text-[#FBC02D] transition">
            Contact
          </button>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {user !== null && (
            <>
              {/* Edit Mode Button on desktop */}
              <button
                onClick={toggleEditMode}
                className={clsx(
                  'px-4 py-2 rounded-md text-sm font-semibold transition',
                  editMode
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-[#581845] hover:bg-gray-300'
                )}
              >
                {editMode ? 'Exit Edit' : 'Edit Mode'}
              </button>

              {/* Account Icon */}
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="text-white text-2xl hover:text-[#FBC02D] transition cursor-pointer"
                  aria-label="Account Menu"
                >
                  <FaUserCircle />
                </button>
              </div>
            </>
          )}
        </div>

        {/* MOBILE ACTIONS: Edit Mode Button & Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Edit Mode Button (only visible on mobile/tablet) */}
          <button
            onClick={toggleEditMode}
            className={clsx(
              'px-3 py-1 rounded text-sm font-semibold transition cursor-pointer',
              editMode
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            )}
          >
            {editMode ? 'Exit Edit' : 'Edit Mode'}
          </button>

          {/* Hamburger Button (only visible on mobile/tablet) */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-2xl cursor-pointer"
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={clsx(
          'fixed top-0 right-0 w-72 h-full bg-[#581845] text-white z-50 p-6 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close Button */}
        <button
          className="text-white text-2xl absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-4 mt-12 text-base">
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-[#FBC02D]">
            Home
          </Link>
          <button onClick={() => {
            handleAnchorClick('about')
            setIsOpen(false)}} 
            className="hover:text-[#FBC02D] text-left">
            About Us
          </button>
          <button onClick={() => {
            setIsOpen(false)
            handleAnchorClick('services')
          }} className="hover:text-[#FBC02D] text-left">
            Services
          </button>
          <Link onClick={() => setIsOpen(false)} to="/blog" className="hover:text-[#FBC02D]">
            Blog
          </Link>
          <button onClick={() => { 
            setIsOpen(false);
            handleAnchorClick('footer-contact');
            }} className="hover:text-[#FBC02D] text-left">
            Contact
          </button>
        </nav>

        {/* Account Links (only if user logged in) */}
        {user && (
          <div className="mt-8 space-y-4">
            <Link
              to="/admin-dashboard"
              className="block text-sm text-white text-center underline hover:text-[#FBC02D] transition"
              onClick={() => {
                navigate({ to: '/admin-dashboard' })
                setIsOpen(false)
              }}
            >
              Admin Dashboard
            </Link>

            <Link
              to="/admin-login"
              className="block text-sm text-white text-center underline hover:text-[#FBC02D] transition"
              onClick={() => {
                handleSignOut()
                setIsOpen(false)
              }}
            >
              Sign Out
            </Link>
          </div>
        )}
      </div>

      {/* Account Dropdown Menu */}
      {accountOpen && (
        <div className="absolute right-0 top-16 w-48 bg-white text-[#581845] shadow-lg rounded-md overflow-hidden z-50">
          {/* Close Button */}
          <div className="flex justify-end p-2">
            <button
              className="text-[#581845] hover:text-[#FBC02D] text-lg font-bold cursor-pointer"
              aria-label="Close Menu"
              onClick={() => setAccountOpen(false)}
            >
              ✕
            </button>
          </div>

          <Link
            to="/admin-dashboard"
            className="block px-4 py-2 hover:bg-[#F5F5F5] text-sm"
            onClick={() => setAccountOpen(false)}
          >
            Admin Dashboard
          </Link>
          <Link
            to="/admin-login"
            className="block px-4 py-2 hover:bg-[#F5F5F5] text-sm"
            onClick={() => {
              handleSignOut()
              setAccountOpen(false)
            }}
          >
            Sign Out
          </Link>
        </div>
      )}
    </header>
  )
}
