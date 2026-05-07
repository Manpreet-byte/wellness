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
          if (!entry.isIntersecting) continue;
          const delay = entry.target.getAttribute('data-reveal-delay');
          if (delay) {
            entry.target.style.transitionDelay = `${Number(delay) || 0}ms`;
          }
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    for (const el of elements) observer.observe(el);

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
