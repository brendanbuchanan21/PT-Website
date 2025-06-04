import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { FaUserCircle } from 'react-icons/fa'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#581845] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">OrthoNeuro</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-[#FBC02D] transition">Home</Link>
          <Link to="/about" className="hover:text-[#FBC02D] transition">About Us</Link>
          <Link to="/services" className="hover:text-[#FBC02D] transition">Services</Link>
          <Link to="/testimonials" className="hover:text-[#FBC02D] transition">Testimonials</Link>
          <Link to="/blog" className="hover:text-[#FBC02D] transition">Blog</Link>
          <Link to="/contact" className="hover:text-[#FBC02D] transition">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {/* CTA */}
          <Link
            to="/book"
            className="bg-[#FBC02D] text-[#581845] px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            Book an Appointment
          </Link>

          {/* Account Icon */}
          <div className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="text-white text-2xl hover:text-[#FBC02D] transition"
              aria-label="Account Menu"
            >
              <FaUserCircle />
            </button>

            {/* Dropdown Menu */}
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-[#581845] shadow-lg rounded-md overflow-hidden z-50">
                <Link
                  to="/signin"
                  className="block px-4 py-2 hover:bg-[#F5F5F5] text-sm"
                  onClick={() => setAccountOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-[#F5F5F5] text-sm"
                  onClick={() => setAccountOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-white text-2xl cursor-pointer"
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={clsx(
          "fixed top-0 right-0 w-72 h-full bg-[#581845] text-white z-50 p-6 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
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
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-[#FBC02D]">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/about" className="hover:text-[#FBC02D]">About Us</Link>
          <Link onClick={() => setIsOpen(false)} to="/services" className="hover:text-[#FBC02D]">Services</Link>
          <Link onClick={() => setIsOpen(false)} to="/conditions" className="hover:text-[#FBC02D]">Conditions Treated</Link>
          <Link onClick={() => setIsOpen(false)} to="/testimonials" className="hover:text-[#FBC02D]">Testimonials</Link>
          <Link onClick={() => setIsOpen(false)} to="/blog" className="hover:text-[#FBC02D]">Blog</Link>
          <Link onClick={() => setIsOpen(false)} to="/contact" className="hover:text-[#FBC02D]">Contact</Link>
        </nav>

        {/* CTA */}
        <div className="mt-8 space-y-4">
          <Link
            to="/book"
            className="block bg-[#FBC02D] text-[#581845] text-center py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Book an Appointment
          </Link>
          {/* 👇 Account Links */}
          <Link
            to="/signin"
            className="block text-sm text-white text-center underline hover:text-[#FBC02D] transition"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block text-sm text-white text-center underline hover:text-[#FBC02D] transition"
            onClick={() => setIsOpen(false)}
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  )
}
