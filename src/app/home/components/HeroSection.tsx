'use client';

import React from 'react';
import { DEMOS } from '@/app/home/data/demos';
import { CURRENCY, PLAN_PRICES, formatPrice } from '@/lib/pricing';
import GridBackdrop from '@/components/GridBackdrop';
import { scrollToId } from '@/lib/scroll';

export default function HeroSection() {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId('download');
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden noise-overlay">
      {/* Ambient depth layers */}
      <GridBackdrop className="z-0">
        {/* Blob 1 — sky */}
        <div className="blob-sky absolute top-[-10%] right-[-5%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] rounded-full opacity-60" />

        {/* Blob 2 — periwinkle */}
        <div className="blob-periwinkle absolute bottom-[10%] left-[-8%] w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full opacity-50" />
      </GridBackdrop>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 pt-28 pb-10">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Live counter badge */}
          <div className="fade-in inline-flex items-center gap-3 glass-card px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-sky shadow-[0_0_8px_rgba(86,204,242,0.8)] animate-pulse" />
            <span className="text-xs font-semibold text-chrome tracking-wider uppercase">
              Diseño web para emprendedores y empresas
            </span>
          </div>

          <h1 className="fade-in-up delay-100 font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold text-frost leading-[1.0] tracking-tight mb-6">
            Creamos páginas web modernas.{' '}<br />
            <span className="font-display italic font-light gradient-text-sky">
              Pensadas para vender.
            </span>
          </h1>

          <p className="fade-in-up delay-200 text-chrome text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-2xl">
            Diseñamos sitios web modernos, adaptados a celulares y pensados para
            mostrar tus servicios, generar confianza y facilitar que te consulten
            por WhatsApp.
          </p>

          <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
            <a
  href="#download"
  onClick={handleDownload}
  className="btn-primary flex items-center justify-center gap-3 px-7 py-4 rounded-full text-slate-deep font-bold text-base tracking-wide"
>
  Pedir presupuesto
</a>

            <a
              href="#curriculum"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('curriculum');
              }}
              className="glass-card glow-hover flex items-center justify-center gap-2 px-7 py-4 rounded-full text-frost font-semibold text-base tracking-wide"
            >
              Ver servicios
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          {/* Datos verificables del servicio */}
          <ul className="fade-in-up delay-400 flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-chrome">
            {[
              `${DEMOS.length} diseños para elegir`,
              `Desde ${formatPrice(PLAN_PRICES.inicial)} ${CURRENCY}`,
              'Entrega desde 5 días hábiles',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sky shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex justify-center pb-6">
        <div className="flex flex-col items-center gap-2 text-chrome-dim animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-medium">
            SEGUIR VIENDO
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}