import { stats } from '../data/company';

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      <div className="w-full overflow-hidden border-y-2 border-[#1aa6c8] shadow-sm">
        {/* Hero canvas (full width) */}
        <div className="relative h-[calc(100vh-70px)] min-h-[560px] md:min-h-[640px] overflow-hidden border-b-2 border-[#1aa6c8]">
          {/* Background image */}
          <div className="absolute inset-0 hero-image" />

          {/* Gradient + soft blur on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062a1e]/95 via-[#062a1e]/55 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-[58%] bg-[#062a1e]/15 backdrop-blur-[2px] pointer-events-none" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
              <div className="max-w-[680px]">
                <h1 className="hero-heading mb-6">
                  Building the
                  <br />
                  Future of Wellness
                </h1>
                <div className="h-px w-32 bg-white/35 mb-6" />
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-[620px]">
                  Redefining healthcare access through compassion, expertise, and modern retail excellence, ensuring trusted, reliable, and seamless care for every community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar (full width) with staggered animations */}
        <div className="stats-bg text-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex text-center stats-divider">
              {stats.map((stat, idx) => (
                <div 
                  key={stat.label} 
                  className={`flex-1 py-8 px-4 sm:px-6 animate-count-up`}
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  {/* Animated stat value with scale effect */}
                  <p className="text-3xl md:text-4xl font-extrabold tracking-tight transform transition-transform hover:scale-110 duration-300">
                    {stat.value}
                  </p>
                  {/* Animated stat label */}
                  <p className="text-sm md:text-base mt-2 text-white/85 animate-fade-in" style={{ animationDelay: `${600 + idx * 100}ms` }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
