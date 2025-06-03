import { Link } from '@tanstack/react-router'


export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#581845] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Revive Ortho</Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-[#FBC02D] transition">Home</Link>
          <Link to="/about" className="hover:text-[#FBC02D] transition">About Us</Link>
          <Link to="/services" className="hover:text-[#FBC02D] transition">Services</Link>
          <Link to="/conditions" className="hover:text-[#FBC02D] transition">Conditions Treated</Link>
          <Link to="/testimonials" className="hover:text-[#FBC02D] transition">Testimonials</Link>
          <Link to="/blog" className="hover:text-[#FBC02D] transition">Blog</Link>
          <Link to="/contact" className="hover:text-[#FBC02D] transition">Contact</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            to="/book"
            className="bg-[#FBC02D] text-[#581845] px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            Book an Appointment
          </Link>
        </div>

        {/* Mobile Menu Placeholder (optional dropdown or burger menu) */}
        <div className="lg:hidden">
          {/* You can add a hamburger menu here if needed */}
          <button className="text-white">☰</button>
        </div>
      </div>
    </header>
  )
}