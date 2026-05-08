import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="newsletter" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
      {/* Animated background decorative elements */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl -mr-32 sm:-mr-40 md:-mr-48 -mt-32 sm:-mt-40 md:-mt-48 animate-float" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl -ml-32 sm:-ml-40 md:-ml-48 -mb-32 sm:-mb-40 md:-mb-48 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 overflow-hidden leading-tight">
          <span className="inline-block animate-this up">Stay Updated</span>
        </h2>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto animate-this up" data-reveal-delay="140">
          Subscribe to our newsletter for exclusive offers, wellness tips, and new product launches.
        </p>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xl mx-auto animate-this up mb-8"
          data-reveal-delay="260"
        >
          <div className="flex-1 relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg bg-white/95 text-dark font-medium text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
              required
            />
            <span aria-hidden className="wf-input-underline" />
          </div>
          <button
            type="submit"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <div className="inline-block bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm animate-fade-in border border-white/30">
            <p className="text-white font-semibold flex items-center gap-2">
              <span className="text-xl">✓</span>
              Thanks for subscribing!
            </p>
          </div>
        )}

        {/* Privacy notice */}
        <p className="mt-8 text-sm text-white/70 animate-this up" data-reveal-delay="360">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
