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
    <section id="milestones" className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="animate-this right text-xs md:text-sm font-semibold tracking-[0.35em] text-[#1b6b56] uppercase">Our History</p>
            <h2 className="animate-this left mt-3 wf-display-4 wf-fw-normal text-[#111]" data-reveal-delay="120">
              Milestones
            </h2>
          </div>

          <div className="flex items-center gap-5 animate-this up self-start sm:self-auto" data-reveal-delay="220">
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

      <div className="animate-this up" data-reveal-delay="120">
        <div ref={scrollerRef} className="overflow-x-auto no-scrollbar scroll-smooth">
          <div className="min-w-[1180px] md:min-w-[1420px] flex">
            {milestones.map((milestone, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`${milestone.year}-${idx}`}
                  data-ms-item
                  data-ms-item-index={idx}
                  className={`relative flex-shrink-0 w-[340px] sm:w-[360px] md:w-[380px] border-l border-[#1b6b56]/15 ${idx === milestones.length - 1 ? 'border-r border-[#1b6b56]/15' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="w-full text-left px-7 sm:px-8 pt-10 pb-6"
                  >
                    <div className={`text-6xl md:text-[5rem] font-light leading-none ${isActive ? 'text-[#1b6b56]' : 'text-[#1b6b56]/30'}`}>
                      {milestone.year}
                    </div>
                    <div className={`mt-4 text-lg md:text-xl font-semibold ${isActive ? 'text-[#111]' : 'wf-text-secondary'}`}>
                      {milestone.title}
                    </div>
                  </button>

                  <div className="h-16 md:h-20 border-y border-[#1b6b56]/12 bg-[repeating-linear-gradient(90deg,rgba(27,107,86,0.08)_0_2px,transparent_2px_16px)]" />

                  <div className="px-7 sm:px-8 pb-14">
                    <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
                      <div className="pt-10">
                        <div className="overflow-hidden rounded-none">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className="w-full h-[170px] md:h-[185px] object-cover animate-mask"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <p className="mt-5 text-sm md:text-base leading-7 wf-text-secondary max-w-[300px]">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    {!isActive ? <div className="h-[250px] md:h-[265px]" /> : null}
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
