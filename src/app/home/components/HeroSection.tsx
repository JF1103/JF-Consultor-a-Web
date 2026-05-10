'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden noise-overlay">
      {/* Ambient depth layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-deep via-slate to-slate-deep" />

        {/* Blob 1 — sky */}
        <div className="blob-sky absolute top-[-10%] right-[-5%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] rounded-full opacity-60" />

        {/* Blob 2 — periwinkle */}
        <div className="blob-periwinkle absolute bottom-[10%] left-[-8%] w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full opacity-50" />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(86,204,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(86,204,242,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 pt-28 pb-16">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Live counter badge */}
          <div className="fade-in inline-flex items-center gap-3 glass-card px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-sky-DEFAULT shadow-[0_0_8px_rgba(86,204,242,0.8)] animate-pulse" />
            <span className="text-xs font-semibold text-chrome tracking-wider uppercase">
              Diseño web para emprendedores y empresas
            </span>
          </div>

          <h1 className="fade-in-up delay-100 font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold text-frost leading-[1.0] tracking-tight mb-6">
            Creamos páginas web modernas.{' '}<br />
            <span className="font-display italic font-light gradient-text-sky">
              Listas para vender.
            </span>
          </h1>

          <p className="fade-in-up delay-200 text-chrome text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-2xl">
            Diseñamos sitios web modernos, adaptados a celulares y preparados
            para generar confianza, mostrar tus servicios y convertir visitas en
            consultas por WhatsApp.
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
                document
                  .getElementById('curriculum')
                  ?.scrollIntoView({ behavior: 'smooth' });
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

          {/* Trust signals */}
          <div className="fade-in-up delay-400 flex items-center gap-6 mt-10">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80',
                'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=80',
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=80',
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-deep"
                >
                  <AppImage
                    src={src}
                    alt={`Cliente ${i + 1}`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className="w-3 h-3 text-sky-DEFAULT"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-xs text-chrome-dim">
                Ideal para emprendedores, comercios y profesionales.{' '}
                <span className="text-frost font-semibold">
                  Webs modernas
                </span>{' '}
                listas para publicar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex justify-center pb-8">
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