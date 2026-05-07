export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0d2a23] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-4 gap-12 mb-10 animate-this up">
          <div>
            <img
              src="https://shareittofriends.com/demo/wellness-forever/images/footer-logo.svg"
              alt="Wellness Forever"
              className="h-28 w-auto mb-3"
            />
            <p className="text-white/70 text-sm mb-3">Life. Unlimited.</p>
            <p className="text-white/55 text-xs leading-relaxed">
              India's leading pharmacy retail chain, committed to making healthcare accessible, reliable, and convenient.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <div className="space-y-2 text-white/60 text-sm">
              {['Home', 'About', 'Our Presence', 'Franchise', 'Investors'].map((t) => (
                <a key={t} href="#" className="block hover:text-white transition-colors">
                  {t}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Contacts</h5>
            <div className="space-y-2 text-white/60 text-sm">
              <a href="mailto:info@wellnessforever.in" className="block hover:text-white transition-colors">
                info@wellnessforever.in
              </a>
              <a href="tel:18001024247" className="block hover:text-white transition-colors">
                1800-10-24-24-7
              </a>
              <div>Mumbai, India</div>
            </div>
          </div>

          <div className="md:text-right">
            <h5 className="font-semibold mb-4">Follow</h5>
            <div className="flex md:justify-end gap-4 text-white/70">
              {[0, 1, 2].map((idx) => (
                <a key={idx} href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/55 text-xs animate-this up">
          <p>&copy; 2026 Wellness Forever. All rights reserved. Designed and developed by Intenics</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors underline">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors underline">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

