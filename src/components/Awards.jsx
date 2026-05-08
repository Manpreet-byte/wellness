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
    const cardGap = 20;
    el.scrollTo({ left: Math.max(0, child.offsetLeft - cardGap), behavior });
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
        const gap = 20; // matches the desktop gap
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
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14 animate-this up">
          <div className="max-w-2xl">
            <p className="animate-this right text-xs md:text-sm font-semibold tracking-[0.35em] text-[#1b6b56] uppercase">Recognition</p>
            <h2 className="animate-this left mt-3 wf-display-4 wf-fw-normal text-[#111]" data-reveal-delay="120">
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
          <div className="relative mt-4 mb-10 animate-this up px-2 sm:px-4 md:px-6 awards-timeline" data-reveal-delay="140">
            <div className="absolute left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-6 top-1/2 -translate-y-1/2 h-[1px] bg-[var(--wf-green-dark)]/10" />
            <div className="relative flex items-center justify-between">
              {markers.map((id, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div key={id} className="relative z-10 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-[var(--wf-green-dark)]' : 'bg-[var(--wf-green-dark)]/30'}`} />
                    {isActive && <div className="absolute w-14 h-14 rounded-full bg-[var(--wf-green-dark)]/12" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* cards */}
          <div ref={scrollerRef} className="flex gap-5 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2">
            {awards.map((award, idx) => (
              <div key={award.id} className="snap-start flex-shrink-0 w-[250px] sm:w-[270px] md:w-[285px] lg:w-[295px]">
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
                  <div className="bg-white rounded-2xl shadow-md border border-black/6 px-7 py-10 min-h-[220px] flex flex-col justify-center hover-lift cursor-pointer awards-card">
                    <h3 className="text-sm md:text-base font-semibold text-[#111] uppercase tracking-wide">{award.title}</h3>
                    <p className="mt-4 text-sm md:text-base text-[#6b7a75] leading-7">{award.subtitle}</p>
                  </div>

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
