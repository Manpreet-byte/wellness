import { useState } from 'react';

export default function MissionVision() {
  const [activeCard, setActiveCard] = useState('vision');

  const onActivate = (key) => setActiveCard(key);
  const onKeyActivate = (e, key) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(key);
    }
  };

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
            <div
              role="button"
              tabIndex={0}
              onClick={() => onActivate('vision')}
              onKeyDown={(e) => onKeyActivate(e, 'vision')}
              className={`rounded-3xl p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full cursor-pointer select-none ${
                activeCard === 'vision' ? 'bg-[#0d2a23] text-white' : 'bg-white text-[#1e2b26] border border-[#1b6b56]/5'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  activeCard === 'vision' ? 'bg-white' : 'bg-[#0d2a23]'
                }`}
              >
                <img
                  src="/images/vision.svg"
                  alt="Vision"
                  className={`w-9 h-9 ${activeCard === 'vision' ? '' : 'brightness-0 invert'}`}
                />
              </div>
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${activeCard === 'vision' ? '' : 'text-[#1e2b26]'}`}>
                Our Vision
              </h3>
              <p className={`text-lg leading-relaxed ${activeCard === 'vision' ? 'text-white/80' : 'text-[#5e6b66]'}`}>
                To be India's most trusted and accessible pharmacy retail chain, setting the benchmark for reliable healthcare delivery and customer experience across every community we serve.
              </p>
            </div>
          </div>

          <div className="animate-this right">
            <div
              role="button"
              tabIndex={0}
              onClick={() => onActivate('mission')}
              onKeyDown={(e) => onKeyActivate(e, 'mission')}
              className={`rounded-3xl p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full cursor-pointer select-none ${
                activeCard === 'mission' ? 'bg-[#0d2a23] text-white' : 'bg-white text-[#1e2b26] border border-[#1b6b56]/5'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  activeCard === 'mission' ? 'bg-white' : 'bg-[#0d2a23]'
                }`}
              >
                <img
                  src="/images/mission.svg"
                  alt="Mission"
                  className={`w-9 h-9 ${activeCard === 'mission' ? '' : 'brightness-0 invert'}`}
                />
              </div>
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${activeCard === 'mission' ? '' : 'text-[#1e2b26]'}`}>
                Our Mission
              </h3>
              <p className={`text-lg leading-relaxed ${activeCard === 'mission' ? 'text-white/80' : 'text-[#5e6b66]'}`}>
                To make quality healthcare easily accessible through a strong network of stores operating day and night, ensuring the availability of genuine medicines and wellness products whenever they are needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
