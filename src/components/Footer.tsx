export default function Footer() {
  return (
    <footer className="bg-[#581845] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <h3 className="text-xl font-bold mb-2">Revive Orthoneuro</h3>
          <p className="text-sm text-[#F5F5F5]">
            Empowering you to move, heal, and thrive with expert physical therapy care.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-[#F5F5F5]">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul className="space-y-1 text-sm text-[#F5F5F5]">
            <li>123 Wellness Way</li>
            <li>Health City, ST 00000</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: info@reviveortho.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-[#F5F5F5]/30 pt-4 text-center text-sm text-[#F5F5F5]">
        © {new Date().getFullYear()} Revive Orthoneuro. All rights reserved.
      </div>
    </footer>
  )
}
