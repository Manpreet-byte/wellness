import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#1b6b56]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="#home" className="block">
              <img
                src="https://shareittofriends.com/demo/wellness-forever/images/logo.svg"
                alt="Wellness Forever"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {[
              { href: '#about', label: 'About' },
              { href: '#founders', label: 'Our People' },
              { href: '#milestones', label: 'Our Network' },
              { href: '#mission', label: 'Franchise' },
              { href: '#awards', label: 'Investor' },
              { href: '#footer', label: 'Contact' },
              { href: '#footer', label: 'Work With Us' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-[#111] hover:text-[#1b6b56] transition-colors"
              >
                <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#1b6b56] after:transition-all hover:after:w-full">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Right Side - CTA */}
          <div className="hidden lg:flex items-center">
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
            className="lg:hidden p-2 rounded-md text-[#111] hover:bg-black/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6">
            <div className="pt-2 space-y-1">
              {[
                { href: '#about', label: 'About' },
                { href: '#founders', label: 'Our People' },
                { href: '#milestones', label: 'Our Network' },
                { href: '#mission', label: 'Franchise' },
                { href: '#awards', label: 'Investor' },
                { href: '#footer', label: 'Contact' },
                { href: '#footer', label: 'Work With Us' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[#111] hover:bg-black/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#products"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 mt-5 px-6 py-3 rounded-full border border-[#1b6b56]/40 text-[#1b6b56] font-semibold hover:bg-[#1b6b56] hover:text-white transition-colors"
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
