import { useEffect } from 'react';

export default function ScrollAnimator() {
  useEffect(() => {
    const getElements = (root = document) => Array.from(root.querySelectorAll?.('.animate-this') ?? []);
    const elements = getElements();
    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      for (const el of elements) el.classList.add('animated');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (entry.isIntersecting) {
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) el.style.transitionDelay = `${Number(delay) || 0}ms`;
            el.classList.add('animated');
          } else {
            // Allow replay when the section comes back into view.
            el.classList.remove('animated');
            el.style.transitionDelay = '';
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    for (const el of elements) observer.observe(el);

    // Ensure above-the-fold elements animate on initial load without requiring scroll.
    const revealIfInView = () => {
      const vh = window.innerHeight || 800;
      for (const el of getElements()) {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < vh * 0.92 && rect.bottom > 0;
        if (!inView) continue;
        const delay = el.getAttribute('data-reveal-delay');
        if (delay) el.style.transitionDelay = `${Number(delay) || 0}ms`;
        el.classList.add('animated');
      }
    };

    // Two frames: allow initial styles to apply, then trigger transition.
    requestAnimationFrame(() => requestAnimationFrame(revealIfInView));

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.classList?.contains('animate-this')) observer.observe(node);
          for (const el of getElements(node)) observer.observe(el);
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
