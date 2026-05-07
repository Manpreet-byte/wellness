import { stats } from '../data/company';
import { useEffect, useMemo, useRef, useState } from 'react';

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);
}

function parseStatValue(raw) {
  const value = String(raw ?? '').trim();
  // Examples: "450+", "4800+", "1400+", "60+", "3.5 Cr"
  const hasPlus = value.endsWith('+');
  const cleaned = value.replace('+', '').trim();

  const crMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s*Cr$/i);
  if (crMatch) {
    return { target: Number(crMatch[1]), decimals: crMatch[1].includes('.') ? 1 : 0, suffix: ' Cr', prefix: '', hasPlus: false };
  }

  const numMatch = cleaned.match(/^(\d+(?:\.\d+)?)$/);
  if (numMatch) {
    const hasDecimal = numMatch[1].includes('.');
    return { target: Number(numMatch[1]), decimals: hasDecimal ? 1 : 0, suffix: hasPlus ? '+' : '', prefix: '', hasPlus };
  }

  return { target: 0, decimals: 0, suffix: value.replace(/[\d.\s]/g, ''), prefix: '', hasPlus };
}

function formatNumber(n, decimals) {
  if (decimals === 0) return Math.round(n).toString();
  return n.toFixed(decimals);
}

function StatNumber({ value, delayMs = 0 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { target, decimals, suffix, prefix } = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);
  const startedRef = useRef(false);
  const hostRef = useRef(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || prefersReducedMotion) return;

    let raf = 0;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const duration = 1200;
      const startTime = performance.now() + delayMs;
      const from = 0;
      const to = target;
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        if (now < startTime) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(1, (now - startTime) / duration);
        const eased = easeOut(t);
        setDisplay(from + (to - from) * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [delayMs, prefersReducedMotion, target]);

  return (
    <span ref={hostRef}>
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      {/* Hero canvas (full width) */}
      <div className="hero-load relative h-[calc(100vh-72px)] min-h-[520px] sm:min-h-[560px] md:min-h-[640px] overflow-hidden">
        {/* Background image (no video) */}
        <div className="hero-media absolute inset-0 hero-image" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062a1e]/95 via-[#062a1e]/65 to-transparent pointer-events-none" />
        <div className="sm:hidden absolute inset-0 bg-[#062a1e]/25 pointer-events-none" />

        <div className="relative z-10 h-full flex items-end sm:items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
            <div className="max-w-[720px] pb-14 sm:pb-0">
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
            <div className="flex flex-nowrap text-center stats-divider min-w-[760px] sm:min-w-0">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="flex-1 py-8 px-4 sm:px-6 animate-count-up"
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  <p className="text-3xl md:text-4xl font-extrabold tracking-tight transform transition-transform hover:scale-110 duration-300">
                    <StatNumber value={stat.value} delayMs={idx * 120} />
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
