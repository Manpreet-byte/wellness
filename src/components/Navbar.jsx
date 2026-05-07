import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="#home" className="block">
              <img src="https://shareittofriends.com/demo/wellness-forever/images/logo.svg" alt="Wellness Forever" className="h-10" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors text-sm">About</a>
            <a href="#founders" className="text-gray-700 hover:text-primary transition-colors text-sm">Our People</a>
            <a href="#milestones" className="text-gray-700 hover:text-primary transition-colors text-sm">Our Network</a>
            <a href="#mission" className="text-gray-700 hover:text-primary transition-colors text-sm">Franchise</a>
            <a href="#awards" className="text-gray-700 hover:text-primary transition-colors text-sm">Investor</a>
            <a href="#footer" className="text-gray-700 hover:text-primary transition-colors text-sm">Contact</a>
            <a href="#footer" className="text-gray-700 hover:text-primary transition-colors text-sm">Work With Us</a>
          </div>

          {/* Right Side - CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#1b6b56]/40 text-[#1b6b56] font-semibold hover:bg-[#1b6b56] hover:text-white transition-colors"
            >
              Shop Now
              <img
                src="https://shareittofriends.com/demo/wellness-forever/images/button-arrow.svg"
                alt=""
                className="h-3 w-3"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">About</a>
            <a href="#founders" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">Our People</a>
            <a href="#milestones" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">Our Network</a>
            <a href="#mission" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">Franchise</a>
            <a href="#awards" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">Investor</a>
            <a href="#footer" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">Contact</a>
            <a href="#footer" className="block px-4 py-2 text-gray-700 hover:bg-accent rounded-md transition-colors">Work With Us</a>
            <a
              href="#products"
              className="w-full inline-flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-full border border-[#1b6b56]/40 text-[#1b6b56] font-semibold hover:bg-[#1b6b56] hover:text-white transition-colors"
            >
              Shop Now
              <img
                src="https://shareittofriends.com/demo/wellness-forever/images/button-arrow.svg"
                alt=""
                className="h-3 w-3"
              />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
