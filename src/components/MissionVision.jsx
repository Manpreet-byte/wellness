export default function MissionVision() {
  return (
    <section id="mission" className="py-20 md:py-28 bg-[#d9efe3] relative overflow-hidden">
      <div className="section-animated-bg">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <circle className="blob-light-1" cx="100" cy="200" r="150" />
          <circle className="blob-light-2" cx="900" cy="300" r="130" />
          <circle className="blob-light-3" cx="500" cy="500" r="180" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-5xl md:text-6xl font-light text-[#1e2b26] mb-0 animate-this up">Mission & Vision</h2>
          <div className="mx-auto my-6 h-px w-3/5 bg-gradient-to-r from-transparent via-[#1b6b56]/20 to-transparent animate-this up" />
          <p className="text-base md:text-lg text-[#5e6b66] max-w-2xl mx-auto leading-relaxed animate-this up">
            Redefining healthcare access through compassion, expertise, and modern retail excellence, ensuring trusted, reliable, and seamless care for every community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div className="animate-this left">
            <div className="bg-[#0d2a23] text-white rounded-3xl p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                <img src="https://shareittofriends.com/demo/wellness-forever/images/vision.svg" alt="Vision" className="w-9 h-9" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                To be India's most trusted and accessible pharmacy retail chain, setting the benchmark for reliable healthcare delivery and customer experience across every community we serve.
              </p>
            </div>
          </div>

          <div className="animate-this right">
            <div className="bg-white rounded-3xl p-10 md:p-12 border border-[#1b6b56]/5 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full">
              <div className="w-16 h-16 bg-[#0d2a23] rounded-2xl flex items-center justify-center mb-6">
                <img
                  src="https://shareittofriends.com/demo/wellness-forever/images/mission.svg"
                  alt="Mission"
                  className="w-9 h-9 brightness-0 invert"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1e2b26] mb-4">Our Mission</h3>
              <p className="text-[#5e6b66] text-lg leading-relaxed">
                To make quality healthcare easily accessible through a strong network of stores operating day and night, ensuring the availability of genuine medicines and wellness products whenever they are needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

