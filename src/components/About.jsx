export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="w-full overflow-hidden border-t border-[#1b6b56]/10 mt-6 md:mt-10">
        <div className="relative md:min-h-[720px] lg:min-h-[760px]">
          {/* Right image */}
          <div
            className="relative h-[320px] sm:h-[380px] md:absolute md:inset-y-0 md:right-0 md:w-1/2 md:h-auto animate-this zoom animate-mask animate-blur-in"
            data-reveal-delay="120"
          >
            <img
              src="/images/about-person.webp"
              alt="Healthcare Professional"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Soft wash behind text (keep image crisp on the right) */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-full md:w-[56%] bg-gradient-to-r from-[#f3fbf7] via-[#f3fbf7]/95 to-transparent pointer-events-none" />

          {/* center divider */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-[#1b6b56]/10 pointer-events-none" />

          <div className="relative z-10 h-full">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 h-full flex items-start pt-16 sm:pt-20 pb-16 md:pt-28 lg:pt-32 md:pb-0">
              <div className="max-w-[640px]">
                <h2 className="animate-this right text-5xl md:text-6xl lg:text-7xl font-light text-[#111] mb-8">
                  About Us
                </h2>

                <p className="animate-this left text-sm md:text-base text-[#5e6b66] leading-relaxed mb-8 max-w-[560px]" data-reveal-delay="120">
                  Wellness Forever is one of India’s leading pharmacy retail chains, committed to making healthcare accessible, reliable, and convenient for every customer.
                  <br />
                  Headquartered in Mumbai, Wellness Forever was founded in 2008 by three well-known entrepreneurs; Mr. Ashraf Biran, Mr. Gulshan Bakhtiani and Mr. Mohan Chavan.
                </p>

                <p className="animate-this left text-sm md:text-base text-[#5e6b66] leading-relaxed mb-12 max-w-[560px]" data-reveal-delay="220">
                  With a strong presence across Maharashtra, Goa, and Karnataka, we have built a network of 475+ stores that serve communities with consistency and care.
                  <br />
                  At the heart of our operations is a team of over 1,400 qualified pharmacists and 5,000+ total employees, dedicated to delivering expert guidance and a seamless customer experience. Serving more than 4 crore orders annually, we ensure the availability of genuine medicines and healthcare essentials day and night, across the majority of our stores.
                </p>

                <a
                  href="#"
                  className="animate-this right inline-flex items-center gap-3 px-10 py-4 rounded-full border border-[#1b6b56]/40 text-[#1b6b56] font-semibold hover:bg-[#1b6b56] hover:text-white transition-colors btn-glow transform hover:-translate-y-0.5"
                  data-reveal-delay="320"
                >
                  Read the full story
                  <span aria-hidden className="text-lg leading-none">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
