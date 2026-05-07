import { awards } from '../data/company';
import { useEffect, useRef, useState } from 'react';

export default function Awards() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAwardId, setOpenAwardId] = useState(null);
  const autoplayRef = useRef(null);
  const inViewRef = useRef(false);

  const markers = awards.map((award) => award.id);

  const scrollToIndex = (index, behavior = 'smooth') => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children?.[index];
    if (!child) return;
    // Only scroll inside the horizontal scroller (avoid page scroll).
    el.scrollTo({ left: child.offsetLeft, behavior });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const firstChild = el.firstElementChild;
        if (!firstChild) return;
        const cardWidth = firstChild.getBoundingClientRect().width;
        const gap = 28; // matches `gap-7`
        const index = Math.round(el.scrollLeft / Math.max(1, cardWidth + gap));
        setActiveIndex(Math.max(0, Math.min(awards.length - 1, index)));
      });
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const start = () => {
      stop();
      if (!inViewRef.current) return;
      autoplayRef.current = window.setInterval(() => {
        const next = (activeIndex + 1) % awards.length;
        scrollToIndex(next);
      }, 2000);
    };

    const stop = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', start);

    return () => {
      stop();
      io.disconnect();
      el.removeEventListener('mouseenter', stop);
      el.removeEventListener('mouseleave', start);
    };
  }, [activeIndex]);

  useEffect(() => {
    const onDocClick = (e) => {
      const card = e.target?.closest?.('[data-award-card]');
      if (!card) setOpenAwardId(null);
    };
    document.addEventListener('click', onDocClick, true);
    return () => document.removeEventListener('click', onDocClick, true);
  }, []);

  const scrollByCards = (direction) => {
    const next = direction > 0 ? (activeIndex + 1) % awards.length : (activeIndex - 1 + awards.length) % awards.length;
    scrollToIndex(next);
  };

  return (
    <section id="awards" className="py-20 md:py-28 bg-[#f3fbf7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-6 mb-10 animate-this up">
          <div>
            <p className="animate-this right text-[#1b6b56] font-semibold tracking-widest text-sm">RECOGNITION</p>
            <h2 className="animate-this left mt-3 text-5xl md:text-6xl lg:text-7xl font-light text-[#111]" data-reveal-delay="120">
              Awards & Accolades
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-5 animate-this up" data-reveal-delay="220">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous awards"
              className="text-[#1b6b56] hover:opacity-80 transition-opacity"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next awards"
              className="text-[#1b6b56] hover:opacity-80 transition-opacity"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative animate-this up">
          {/* timeline */}
          <div className="relative mt-4 mb-10 animate-this up" data-reveal-delay="140">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#1b6b56]/30" />
            <div className="relative flex items-center justify-between">
              {markers.map((id, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div key={id} className="relative z-10 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-[#1b6b56]' : 'bg-[#1b6b56]/30'}`} />
                    {isActive && <div className="absolute w-10 h-10 rounded-full bg-[#1b6b56]/15" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* cards */}
          <div
            ref={scrollerRef}
            className="flex gap-7 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2"
          >
            {awards.map((award, idx) => (
              <div key={award.id} className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px]">
                <div
                  data-award-card
                  className="relative group animate-this up animate-pop"
                  data-reveal-delay={idx * 90}
                  onClick={() => setOpenAwardId((prev) => (prev === award.id ? null : award.id))}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenAwardId((prev) => (prev === award.id ? null : award.id));
                    }
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-black/5 px-8 py-10 min-h-[170px] flex flex-col justify-center hover-lift cursor-pointer">
                    <h3 className="text-lg font-semibold text-[#111]">{award.title}</h3>
                    <p className="mt-3 text-sm text-[#6b7a75] leading-relaxed">{award.subtitle}</p>
                  </div>

                  {award.image ? (
                    <div
                      className={`pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 transition-all duration-200 ${
                        openAwardId === award.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      } group-hover:opacity-100 group-hover:translate-y-0`}
                    >
                      <div className="bg-white rounded-xl shadow-lg border border-black/10 p-2">
                        <img src={award.image} alt={`${award.title} award`} className="w-[240px] h-[140px] object-cover rounded-lg" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="sm:hidden mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous awards"
              className="text-[#1b6b56] hover:opacity-80 transition-opacity"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next awards"
              className="text-[#1b6b56] hover:opacity-80 transition-opacity"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
