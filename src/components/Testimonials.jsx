import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/products';
import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion || paused || !inViewRef.current) return;
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(`[data-ts="${active}"]`);
    if (!card) return;
    // Only scroll inside carousel.
    const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    const el = trackRef.current;
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
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-accent">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 animate-this up">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Join thousands of happy wellness enthusiasts</p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={trackRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
            {testimonials.map((testimonial, index) => {
              const isActive = index === active;
              return (
                <div
                  key={testimonial.id}
                  data-ts={index}
                  className={`snap-center flex-shrink-0 w-[280px] sm:w-[340px] md:w-[360px] transition-transform duration-500 ${
                    isActive ? 'scale-[1.02]' : 'scale-100'
                  }`}
                >
                  <div className="animate-this up" data-reveal-delay={index * 90}>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === active ? 'w-8 bg-[#1b6b56]' : 'w-2.5 bg-[#1b6b56]/25 hover:bg-[#1b6b56]/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift animate-this up" data-reveal-delay="0">
            <p className="text-4xl font-bold text-primary mb-2">98%</p>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift animate-this up" data-reveal-delay="90">
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-gray-600">Verified Reviews</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift animate-this up" data-reveal-delay="180">
            <p className="text-4xl font-bold text-primary mb-2">4.9★</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
