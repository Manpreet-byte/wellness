import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { awards } from '../data/company';

export default function Awards() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAwardId, setOpenAwardId] = useState(null);
  const [preview, setPreview] = useState(null);
  const inViewRef = useRef(false);
  const autoplayRef = useRef(null);
  const animRef = useRef(0);
  const baseIndexRef = useRef(awards.length); // start in the middle copy for seamless loop

  const total = awards.length;
  const canHoverRef = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    if (!mq) return;
    const apply = () => {
      canHoverRef.current = !!mq.matches;
    };
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  const getStage = () => scrollerRef.current?.querySelector?.('.awards-stage') ?? null;

  const cancelAnim = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = 0;
  };

  const animateScrollLeft = (el, to, duration = 420) => {
    cancelAnim();
    const from = el.scrollLeft;
    const start = performance.now();
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + (to - from) * easeInOutCubic(t);
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
    animateScrollLeft(el, left, 1000);
  };

  const showPreviewForCard = (cardEl, award) => {
    if (!award?.image || !cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    setPreview({
      id: award.id,
      src: award.image,
      alt: `${award.title} award`,
      left: rect.left + rect.width / 2,
      top: rect.top,
    });
  };

  const closePreview = () => {
    setOpenAwardId(null);
    setPreview(null);
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

        // Awards carousel in the demo is left-aligned; pick the nearest card start.
        const x = el.scrollLeft;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < children.length; i += 1) {
          const d = Math.abs(children[i].offsetLeft - x);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        const clamped = Math.max(0, Math.min(children.length - 1, best));

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
        const nextVirtual = baseIndexRef.current + 1;
        baseIndexRef.current = nextVirtual;
        setActiveIndex(nextVirtual % total);
        scrollToVirtualIndex(nextVirtual, { animated: true });
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

  useEffect(() => {
    // Close any opened tooltip when clicking outside (matches prior click-to-preview behavior).
    const onPointerDown = (e) => {
      const host = e.target?.closest?.('[data-award-item]');
      if (!host) closePreview();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closePreview();
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const scrollByCards = (direction) => {
    const nextVirtual = baseIndexRef.current + (direction > 0 ? 1 : -1);
    baseIndexRef.current = nextVirtual;
    setActiveIndex(nextVirtual % total);
    scrollToVirtualIndex(nextVirtual, { animated: true });

    // Match demo: restart autoplay after manual nav.
    const el = scrollerRef.current;
    if (!el) return;
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (!inViewRef.current) return;
    autoplayRef.current = window.setInterval(() => {
      const n = baseIndexRef.current + 1;
      baseIndexRef.current = n;
      setActiveIndex(n % total);
      scrollToVirtualIndex(n, { animated: true });
    }, 2000);
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
                onClick={() => {
                  const nextVirtual = total + idx;
                  baseIndexRef.current = nextVirtual;
                  setActiveIndex(idx);
                  closePreview();
                  scrollToVirtualIndex(nextVirtual, { animated: true });
                }}
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
                const index = virtualIndex % total;
                return (
                  <div
                    key={`${award.id}-${virtualIndex}`}
                    data-award-item
                    className="award-card-item animate-this up"
                    data-reveal-delay={240 + index * 90}
                  >
	                    <div
	                      className="award-card shadow-sm"
	                      role="button"
	                      tabIndex={0}
                      onMouseEnter={(e) => {
                        if (canHoverRef.current) {
                          setOpenAwardId(award.id);
                          showPreviewForCard(e.currentTarget, award);
                        }
                      }}
	                      onMouseLeave={() => {
	                        if (canHoverRef.current) closePreview();
	                      }}
	                      onClick={(e) => {
	                        const next = openAwardId === award.id ? null : award.id;
	                        if (!next) {
	                          closePreview();
	                          return;
	                        }
	                        setOpenAwardId(next);
	                        showPreviewForCard(e.currentTarget, award);
	                      }}
	                      onKeyDown={(e) => {
	                        if (e.key === 'Enter' || e.key === ' ') {
	                          e.preventDefault();
	                          const next = openAwardId === award.id ? null : award.id;
	                          if (!next) {
	                            closePreview();
	                            return;
	                          }
	                          setOpenAwardId(next);
	                          showPreviewForCard(e.currentTarget, award);
	                        }
	                      }}
	                    >
                      <h4 className="fw-bold fs-6">{award.title}</h4>
                      <p className="small mb-0 text-secondary">{award.subtitle}</p>
                    </div>

	                    {/* tooltip rendered via portal for correct stacking */}
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

      {preview
        ? createPortal(
            <div
              className={`award-tooltip-portal ${openAwardId === preview.id ? 'award-tooltip--open' : ''}`}
              style={{ left: `${preview.left}px`, top: `${preview.top}px` }}
              aria-hidden={openAwardId !== preview.id}
            >
              <img src={preview.src} alt={preview.alt} />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
