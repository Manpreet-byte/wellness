import { useEffect, useRef, useState } from 'react';
import { milestones } from '../data/company';

export default function Milestones() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);
  const inViewRef = useRef(false);

  const goNext = () => setActiveIndex((i) => Math.min(milestones.length - 1, i + 1));
  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!inViewRef.current) return;
    const item = el.querySelector(`[data-ms-item-index="${activeIndex}"]`);
    if (!item) return;
    const left = item.offsetLeft - (el.clientWidth - item.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [activeIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="milestones" className="py-20 md:py-28 bg-[#d9efe3] overflow-hidden relative">
      <div className="section-animated-bg">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <circle className="blob-light-1" cx="100" cy="200" r="150" />
          <circle className="blob-light-2" cx="900" cy="300" r="130" />
          <circle className="blob-light-3" cx="500" cy="500" r="180" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="animate-this right text-[#1b6b56] font-semibold tracking-widest text-sm">OUR HISTORY</p>
            <h2 className="animate-this left mt-3 text-5xl md:text-6xl lg:text-7xl font-light text-[#1e2b26]" data-reveal-delay="120">
              Milestones
            </h2>
          </div>

          <div className="flex items-center gap-5 animate-this up" data-reveal-delay="220">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous milestone"
              className="text-[#1b6b56] hover:opacity-80 transition-opacity"
            >
              <img src="/images/milestone-nav.svg" alt="" className="w-4 h-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next milestone"
              className="text-[#1b6b56] hover:opacity-80 transition-opacity"
            >
              <img src="/images/milestone-nav.svg" alt="" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 animate-this up" data-reveal-delay="120">
        <div
          ref={scrollerRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="min-w-[980px] md:min-w-[1200px] flex">
            {milestones.map((milestone, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`${milestone.year}-${idx}`}
                  data-ms-item
                  data-ms-item-index={idx}
                  className={`relative flex-shrink-0 w-[320px] sm:w-[340px] md:w-[360px] border-l border-[#a6c7bb] ${
                    idx === milestones.length - 1 ? 'border-r border-[#a6c7bb]' : ''
                  }`}
                >
                  {/* active vertical line */}
                  {isActive ? <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1b6b56]" /> : null}

                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="w-full text-left px-7 sm:px-8 pt-10 pb-6"
                  >
                    <div className={`text-6xl md:text-7xl font-light leading-none ${isActive ? 'text-[#1b6b56]' : 'text-[#1b6b56]/35'}`}>
                      {milestone.year}
                    </div>
                    <div className={`mt-4 text-lg font-semibold ${isActive ? 'text-[#1b6b56]' : 'text-[#6b7a75]'}`}>
                      {milestone.title}
                    </div>
                  </button>

                  {/* stripes area */}
                  <div
                    className="h-24"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, rgba(27, 107, 86, 0.25) 0 2px, transparent 2px 14px)',
                    }}
                  />

                  {/* details */}
                  <div className="px-7 sm:px-8 pb-14">
                    <div
                      className={`transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden'
                      }`}
                    >
                      <div className="pt-10">
                        <div className="bg-white/30 rounded-xl p-0.5 inline-block">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className="w-full max-w-[280px] h-[150px] object-cover rounded-lg shadow-sm animate-mask"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-[#5e6b66] max-w-[340px]">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    {!isActive ? <div className="h-[220px]" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
