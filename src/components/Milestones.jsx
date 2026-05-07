import { useEffect, useMemo, useState } from 'react';
import { milestones } from '../data/company';

export default function Milestones() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pageSize = 4;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? milestones.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === milestones.length - 1 ? 0 : prev + 1));
  };

  const pageStart = Math.floor(activeIndex / pageSize) * pageSize;
  const visibleMilestones = useMemo(
    () => milestones.slice(pageStart, pageStart + pageSize),
    [pageStart],
  );
  const globalIndexFor = (localIndex) => pageStart + localIndex;

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
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14">
          <div className="animate-this up">
            <p className="text-[#1b6b56] font-semibold tracking-widest text-sm">OUR HISTORY</p>
            <h2 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-light text-[#1e2b26]">Milestones</h2>
          </div>

          <div className="flex gap-3 pt-7 md:pt-10 animate-this up">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full border border-[#1b6b56]/30 text-[#1b6b56] hover:bg-white/40 transition-colors"
              aria-label="Previous milestone"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="p-3 rounded-full border border-[#1b6b56]/30 text-[#1b6b56] hover:bg-white/40 transition-colors"
              aria-label="Next milestone"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 animate-this up">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-[#a6c7bb]">
          {visibleMilestones.map((milestone, localIndex) => {
            const globalIndex = globalIndexFor(localIndex);
            const isActive = globalIndex === activeIndex;
            return (
              <div
                key={`${milestone.year}-${localIndex}`}
                className={`border-r border-[#a6c7bb] ${isActive ? 'border-l-4 border-l-[#1b6b56]' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(globalIndex)}
                  className="w-full text-left px-8 pt-8 pb-6"
                >
                  <div
                    className={`text-6xl md:text-7xl font-light leading-none ${
                      isActive ? 'text-[#1b6b56]' : 'text-[#1b6b56]/35'
                    }`}
                  >
                    {milestone.year}
                  </div>
                  <div className={`mt-4 text-lg font-semibold ${isActive ? 'text-[#1b6b56]' : 'text-[#6b7a75]'}`}>
                    {milestone.title}
                  </div>
                </button>

                <div
                  className="h-24"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, rgba(27, 107, 86, 0.25) 0 2px, transparent 2px 14px)',
                  }}
                />

                <div className="px-8 pb-14">
                  {isActive ? (
                    <div className="pt-8">
                      <div className="bg-white/30 rounded-xl p-0.5 inline-block">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full max-w-[280px] h-[150px] object-cover rounded-lg shadow-sm"
                        />
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-[#5e6b66] max-w-[340px]">
                        {milestone.description}
                      </p>
                    </div>
                  ) : (
                    <div className="h-[220px]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
