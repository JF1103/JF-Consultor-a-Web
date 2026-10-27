'use client';

import { useLayoutEffect } from 'react';

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-right';

// Habilita las animaciones de aparición recién cuando React está montado.
// Lo que ya está en pantalla se marca visible antes de activarlas, para que no parpadee;
// el resto lo revelan los IntersectionObserver de cada sección al hacer scroll.
export default function RevealReady() {
  useLayoutEffect(() => {
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('visible');
    });
    document.documentElement.classList.add('reveal-ready');
    return () => document.documentElement.classList.remove('reveal-ready');
  }, []);

  return null;
}
