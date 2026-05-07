export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="w-full overflow-hidden border-t border-[#1b6b56]/10">
        <div className="relative min-h-[700px] md:min-h-[760px]">
          {/* Right image */}
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
            <img
              src="https://shareittofriends.com/demo/wellness-forever/images/person.webp"
              alt="Healthcare Professional"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Soft wash behind text (keep image crisp on the right) */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[56%] bg-gradient-to-r from-[#f3fbf7] via-[#f3fbf7]/95 to-transparent pointer-events-none" />

          {/* center divider */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-[#1b6b56]/10 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-[640px] animate-this up">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#111] mb-8">
                About Us
              </h2>

              <p className="text-sm md:text-base text-[#5e6b66] leading-relaxed mb-8 max-w-[560px]">
                Wellness Forever is one of India’s leading pharmacy retail chains, committed to making healthcare accessible, reliable, and convenient for every customer.
                <br />
                Headquartered in Mumbai, Wellness Forever was founded in 2008 by three well-known entrepreneurs; Mr. Ashraf Biran, Mr. Gulshan Bakhtiani and Mr. Mohan Chavan.
              </p>

              <p className="text-sm md:text-base text-[#5e6b66] leading-relaxed mb-12 max-w-[560px]">
                With a strong presence across Maharashtra, Goa, and Karnataka, we have built a network of 475+ stores that serve communities with consistency and care.
                <br />
                At the heart of our operations is a team of over 1,400 qualified pharmacists and 5,000+ total employees, dedicated to delivering expert guidance and a seamless customer experience. Serving more than 4 crore orders annually, we ensure the availability of genuine medicines and healthcare essentials day and night, across the majority of our stores.
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-[#1b6b56]/40 text-[#1b6b56] font-semibold hover:bg-[#1b6b56] hover:text-white transition-colors"
              >
                Read the full story
                <span aria-hidden className="text-lg leading-none">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
