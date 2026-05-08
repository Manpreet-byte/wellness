import { useEffect, useRef, useState } from 'react';
import { awards } from '../data/company';

export default function Awards() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAwardId, setOpenAwardId] = useState(null);
  const inViewRef = useRef(false);
  const autoplayRef = useRef(null);
  const animRef = useRef(0);
  const baseIndexRef = useRef(awards.length); // start in the middle copy for seamless loop

  const total = awards.length;

  const getStage = () => scrollerRef.current?.querySelector?.('.awards-stage') ?? null;

  const cancelAnim = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = 0;
  };

  const animateScrollLeft = (el, to, duration = 420) => {
    cancelAnim();
    const from = el.scrollLeft;
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + (to - from) * easeOutCubic(t);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
      else animRef.current = 0;
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const scrollToVirtualIndex = (virtualIndex, { animated = true } = {}) => {
    const el = scrollerRef.current;
    const stage = getStage();
    if (!el || !stage) return;
    const items = Array.from(stage.children);
    const child = items[virtualIndex];
    if (!child) return;
    const left = Math.max(0, child.offsetLeft); // demo aligns left
    if (!animated) {
      cancelAnim();
      el.scrollLeft = left;
      return;
    }
    animateScrollLeft(el, left);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const stage = getStage();
        if (!stage) return;
        const children = Array.from(stage.children);
        if (!children.length) return;

        const first = children[0];
        const itemWidth = first.getBoundingClientRect().width;
        const stageStyle = window.getComputedStyle(stage);
        const gap = Number.parseFloat(stageStyle.columnGap || stageStyle.gap || '0') || 24;
        const raw = Math.round(el.scrollLeft / Math.max(1, itemWidth + gap));
        const clamped = Math.max(0, Math.min(children.length - 1, raw));

        baseIndexRef.current = clamped;
        setActiveIndex(clamped % total);

        // Seamless wrap like OwlCarousel loop (jump between copies without animation).
        if (clamped <= total * 0.5) {
          const next = clamped + total;
          scrollToVirtualIndex(next, { animated: false });
          baseIndexRef.current = next;
          setActiveIndex(next % total);
        } else if (clamped >= total * 2.5) {
          const next = clamped - total;
          scrollToVirtualIndex(next, { animated: false });
          baseIndexRef.current = next;
          setActiveIndex(next % total);
        }
      });
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, [total]);

  useEffect(() => {
    // Start in the middle copy (so looping looks continuous)
    const el = scrollerRef.current;
    if (!el) return;
    const t = window.setTimeout(() => scrollToVirtualIndex(total, { animated: false }), 0);
    return () => window.clearTimeout(t);
  }, [total]);

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
        scrollToVirtualIndex(baseIndexRef.current + 1, { animated: true });
      }, 2000);
    };

    start();
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', start);

    return () => {
      stop();
      el.removeEventListener('mouseenter', stop);
      el.removeEventListener('mouseleave', start);
    };
  }, [total]);

  const scrollByCards = (direction) => {
    scrollToVirtualIndex(baseIndexRef.current + (direction > 0 ? 1 : -1), { animated: true });
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
                onClick={() => scrollToVirtualIndex(total + idx, { animated: true })}
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
              {[...awards, ...awards, ...awards].map((award, virtualIndex) => {
                const tooltipOpen = openAwardId === award.id;
                const index = virtualIndex % total;
                return (
                  <div key={`${award.id}-${virtualIndex}`} className="award-card-item animate-this up" data-reveal-delay={240 + index * 90}>
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
