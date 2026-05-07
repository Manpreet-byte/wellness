import { useEffect } from 'react';

export default function MotionEnhancer() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    // Scroll progress bar (fixed; does not affect layout)
    const progress = document.createElement('div');
    progress.setAttribute('aria-hidden', 'true');
    progress.className = 'motion-progress';
    document.body.appendChild(progress);

    const setProgress = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const pct = Math.min(1, Math.max(0, window.scrollY / max));
      progress.style.setProperty('--p', `${pct}`);
    };
    setProgress();
    window.addEventListener('scroll', setProgress, { passive: true });
    window.addEventListener('resize', setProgress);

    // Custom cursor (desktop only)
    const isFinePointer = window.matchMedia?.('(pointer: fine)')?.matches;
    let cursor = null;
    let cursorDot = null;
    let cursorRaf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let dx = 0;
    let dy = 0;

    const updateCursor = () => {
      const ease = 0.14;
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      dx += (tx - dx) * 0.35;
      dy += (ty - dy) * 0.35;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      cursorRaf = requestAnimationFrame(updateCursor);
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onDown = () => document.documentElement.classList.add('cursor-down');
    const onUp = () => document.documentElement.classList.remove('cursor-down');

    if (isFinePointer) {
      cursor = document.createElement('div');
      cursorDot = document.createElement('div');
      cursor.className = 'motion-cursor';
      cursorDot.className = 'motion-cursor-dot';
      cursor.setAttribute('aria-hidden', 'true');
      cursorDot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
      document.body.appendChild(cursorDot);
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mousedown', onDown);
      window.addEventListener('mouseup', onUp);
      cursorRaf = requestAnimationFrame(updateCursor);
    }

    // Hero parallax vars
    const hero = document.querySelector('section#home');
    const onHeroMove = (e) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(1, rect.width);
      const y = (e.clientY - rect.top) / Math.max(1, rect.height);
      hero.style.setProperty('--mx', `${(x - 0.5) * 2}`);
      hero.style.setProperty('--my', `${(y - 0.5) * 2}`);
    };
    if (hero && isFinePointer) hero.addEventListener('mousemove', onHeroMove, { passive: true });

    // Magnetic + ripple on clickable elements
    const clickables = Array.from(document.querySelectorAll('a, button')).filter((el) => !el.closest('[data-no-motion]'));
    for (const el of clickables) {
      el.classList.add('motion-clickable');
    }

    const onClick = (e) => {
      const target = e.target?.closest?.('a,button');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty('--rx', `${x}px`);
      target.style.setProperty('--ry', `${y}px`);
      target.classList.remove('motion-ripple');
      // force reflow
      void target.offsetWidth;
      target.classList.add('motion-ripple');
    };
    document.addEventListener('click', onClick, true);

    let magnetRaf = 0;
    let onMagnetMove = null;

    // Keep magnetic effect subtle and limited to buttons/CTAs only.
    const magnetTargets = clickables.filter((el) => el.tagName === 'BUTTON' || el.className.includes('btn') || el.className.includes('rounded-full'));
    if (isFinePointer) {
      onMagnetMove = (e) => {
        cancelAnimationFrame(magnetRaf);
        magnetRaf = requestAnimationFrame(() => {
          const x = e.clientX;
          const y = e.clientY;
          for (const el of magnetTargets) {
            const rect = el.getBoundingClientRect();
            const cx0 = rect.left + rect.width / 2;
            const cy0 = rect.top + rect.height / 2;
            const dx0 = x - cx0;
            const dy0 = y - cy0;
            const dist = Math.hypot(dx0, dy0);
            const max = 110;
            if (dist < max) {
              const strength = (1 - dist / max) * 8;
              el.style.setProperty('--mx2', `${(dx0 / max) * strength}px`);
              el.style.setProperty('--my2', `${(dy0 / max) * strength}px`);
              el.classList.add('motion-magnetic');
            } else {
              el.classList.remove('motion-magnetic');
            }
          }
        });
      };
      window.addEventListener('mousemove', onMagnetMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', setProgress);
      window.removeEventListener('resize', setProgress);
      document.removeEventListener('click', onClick, true);
      if (hero && isFinePointer) hero.removeEventListener('mousemove', onHeroMove);
      if (isFinePointer && onMagnetMove) window.removeEventListener('mousemove', onMagnetMove);
      cancelAnimationFrame(magnetRaf);

      if (isFinePointer) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
        cancelAnimationFrame(cursorRaf);
        cursor?.remove?.();
        cursorDot?.remove?.();
      }
      progress?.remove?.();
    };
  }, []);

  return null;
}
