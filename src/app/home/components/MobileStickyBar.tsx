'use client';
import React, { useEffect, useState } from 'react';
import { scrollToId } from '@/lib/scroll';

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const handleContact = () => {
    scrollToId('download');
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden sticky-bar px-4 py-3 safe-area-inset-bottom">
      <div className="flex items-center gap-3">
        {/* Contact CTA */}
        <button
          type="button"
          onClick={handleContact}
          aria-label="Pedir presupuesto: ir al formulario de contacto"
          className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-slate-deep font-bold text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
          </svg>
          Pedir presupuesto
        </button>

        {/* Dismiss */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-chrome-dim p-2"
          aria-label="Cerrar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
