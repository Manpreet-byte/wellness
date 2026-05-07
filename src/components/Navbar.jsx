import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur transition-all duration-300 ${
        scrolled ? 'bg-white/95 border-b border-[#1b6b56]/10 shadow-sm' : 'bg-white/70 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div className="flex items-center space-x-4 animate-this left" data-reveal-delay="0">
            <a href="#home" className="block">
              <img
                src="/images/logo.svg"
                alt="Wellness Forever"
                className="h-[60px] w-auto transition-transform duration-300 hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 animate-this up" data-reveal-delay="120">
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
          <div className="hidden lg:flex items-center animate-this right" data-reveal-delay="220">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 btn-shop"
            >
              Shop Now
              <img
                src="/images/button-arrow.svg"
                alt=""
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
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
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Close menu overlay"
          />

          {/* Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-modal="true"
          >
            <div className="px-6 py-6 border-b border-black/5 flex items-center justify-between">
              <img
                src="/images/logo.svg"
                alt="Wellness Forever"
                className="h-9 w-auto"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-[#111] hover:bg-black/5 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="space-y-1 animate-this up">
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
                className="w-full inline-flex items-center justify-center gap-2 mt-5 px-6 py-3 rounded-full border border-[#1b6b56]/40 text-[#1b6b56] font-semibold hover:bg-[#1b6b56] hover:text-white transition-colors btn-glow transform hover:-translate-y-0.5"
              >
                Shop Now
                <img
                  src="/images/button-arrow.svg"
                  alt=""
                  className="h-3 w-3"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
