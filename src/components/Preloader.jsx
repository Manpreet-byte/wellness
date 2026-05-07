import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const done = () => {
      if (prefersReducedMotion) {
        setHidden(true);
        return;
      }
      // Let the first paint happen, then fade out.
      requestAnimationFrame(() => {
        setTimeout(() => setHidden(true), 450);
      });
    };

    if (document.readyState === 'complete') {
      done();
      return;
    }

    window.addEventListener('load', done, { once: true });
    return () => window.removeEventListener('load', done);
  }, []);

  return (
    <div className={`wf-preloader ${hidden ? 'wf-preloader--hidden' : ''}`} aria-hidden="true">
      <div className="wf-preloader__spinner" />
    </div>
  );
}

