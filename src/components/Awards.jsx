import { useEffect, useRef, useState } from 'react';
import { awards } from '../data/company';

export default function Awards() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAwardId, setOpenAwardId] = useState(null);
  const inViewRef = useRef(false);
  const autoplayRef = useRef(null);

  const scrollToIndex = (index, behavior = 'smooth') => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = Array.from(el.children);
    const child = items[index];
    if (!child) return;
    const left = child.offsetLeft - (el.clientWidth - child.getBoundingClientRect().width) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(el.children);
        if (!children.length) return;
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < children.length; i += 1) {
          const c = children[i];
          const cCenter = c.offsetLeft + c.getBoundingClientRect().width / 2;
          const d = Math.abs(cCenter - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        setActiveIndex(best);
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
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const stop = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    const start = () => {
      stop();
      if (!inViewRef.current) return;
      autoplayRef.current = window.setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % awards.length;
          scrollToIndex(next);
          return next;
        });
      }, 2200);
    };

    start();
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', start);

    return () => {
      stop();
      el.removeEventListener('mouseenter', stop);
      el.removeEventListener('mouseleave', start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByCards = (direction) => {
    const next = direction > 0 ? (activeIndex + 1) % awards.length : (activeIndex - 1 + awards.length) % awards.length;
    scrollToIndex(next);
  };

  return (
    <section id="awards" className="awards-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex justify-between items-end">
          <div>
            <span className="fw-bold small mb-2 d-block animate-this right text-[#1b6b56] uppercase tracking-[0.22em] text-xs md:text-sm">
              RECOGNITION
            </span>
            <h2 className="awards-heading fw-normal animate-this left wf-display-4">Awards & Accolades</h2>
          </div>

          <div className="flex items-center">
            <div className="award-nav hidden sm:flex items-center">
              <button type="button" className="border-0 p-0 mr-3 award-prev" onClick={() => scrollByCards(-1)} aria-label="Previous awards">
                <img src="/images/milestone-nav.svg" alt="prev" style={{ width: 15, transform: 'rotate(180deg)' }} />
              </button>
              <button type="button" className="border-0 p-0 award-next" onClick={() => scrollByCards(1)} aria-label="Next awards">
                <img src="/images/milestone-nav.svg" alt="next" style={{ width: 15 }} />
              </button>
            </div>
          </div>
        </div>

        <div className="awards-carousel animate-this up">
          <div className="awards-dots animate-this up" role="tablist" aria-label="Awards navigation" data-reveal-delay="120">
            {awards.map((award, idx) => (
              <button
                key={award.id}
                type="button"
                className={`awards-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to ${award.title}`}
                aria-selected={idx === activeIndex}
                role="tab"
              >
                <span aria-hidden />
              </button>
            ))}
          </div>

          <div ref={scrollerRef} className="awards-stage-outer" aria-label="Awards list">
            <div className="awards-stage">
              {awards.map((award, index) => {
                const tooltipOpen = openAwardId === award.id;
                return (
                  <div key={award.id} className="award-card-item animate-this up" data-reveal-delay={240 + index * 90}>
                    <div
                      className="award-card shadow-sm"
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setOpenAwardId(null)}
                      onClick={() => setOpenAwardId((prev) => (prev === award.id ? null : award.id))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setOpenAwardId((prev) => (prev === award.id ? null : award.id));
                        }
                      }}
                    >
                      <h4 className="fw-bold fs-6">{award.title}</h4>
                      <p className="small mb-0 text-secondary">{award.subtitle}</p>
                    </div>

                    {award.image ? (
                      <div className={`award-tooltip ${tooltipOpen ? 'award-tooltip--open' : ''}`}>
                        <img src={award.image} alt="Award Image" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sm:hidden mt-10 flex items-center justify-center">
            <button type="button" className="border-0 p-0 mr-4" onClick={() => scrollByCards(-1)} aria-label="Previous awards">
              <img src="/images/milestone-nav.svg" alt="prev" style={{ width: 15, transform: 'rotate(180deg)' }} />
            </button>
            <button type="button" className="border-0 p-0" onClick={() => scrollByCards(1)} aria-label="Next awards">
              <img src="/images/milestone-nav.svg" alt="next" style={{ width: 15 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
