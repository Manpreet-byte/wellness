import { stats } from '../data/company';

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      {/* Hero canvas (full width) */}
      <div className="hero-load relative h-[calc(100vh-72px)] min-h-[560px] md:min-h-[640px] overflow-hidden">
        {/* Background image (no video) */}
        <div className="hero-media absolute inset-0 hero-image" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062a1e]/90 via-[#062a1e]/55 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
            <div className="max-w-[720px]">
              <h1 className="hero-heading mb-6">
                <span className="block animate-this up" data-reveal-delay="0">
                  Building the
                </span>
                <span className="block animate-this up" data-reveal-delay="120">
                  Future of Wellness
                </span>
              </h1>
              <div className="h-px w-32 bg-white/35 mb-6 animate-this up" data-reveal-delay="120" />
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-[640px] animate-this up" data-reveal-delay="220">
                Redefining healthcare access through compassion, expertise, and modern retail excellence, ensuring trusted, reliable, and seamless care for every community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bg text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap text-center stats-divider min-w-[860px] sm:min-w-0">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex-1 py-8 px-4 sm:px-6 animate-count-up"
                style={{ animationDelay: `${400 + idx * 100}ms` }}
              >
                <p className="text-3xl md:text-4xl font-extrabold tracking-tight transform transition-transform hover:scale-110 duration-300">
                  {stat.value}
                </p>
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
