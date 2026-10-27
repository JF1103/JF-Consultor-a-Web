'use client';

import React, { useEffect, useRef } from 'react';
import GridBackdrop from '@/components/GridBackdrop';

const benefits = [
  {
    title: 'Diseño pensado para vender',
    description: 'Sitios claros, modernos y orientados a generar consultas por WhatsApp o formulario.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    ),
  },
  {
    title: 'Adaptado a tu negocio',
    description: 'Adaptamos el diseño elegido a tu rubro, tus objetivos y la imagen que querés transmitir.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    ),
  },
  {
    title: 'Responsive real',
    description: 'Tu página se ve bien en celular, tablet y escritorio, priorizando la experiencia móvil.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    ),
  },
  {
    title: 'Publicación y acompañamiento',
    description: 'Te acompañamos desde la idea hasta la publicación, para que tu web quede lista para mostrar.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    ),
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="por-que-elegirnos" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative isolate overflow-hidden">
      <GridBackdrop />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob-sky absolute top-[-15%] right-[15%] w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] lg:w-[520px] lg:h-[520px] rounded-full opacity-20" />
        <div className="blob-periwinkle absolute bottom-[-20%] left-[10%] w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="reveal">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky mb-3 block">
              Por qué elegirnos
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight">
              Por qué elegir
              <br />
              <span className="font-display italic font-light gradient-text-sky">
                JF Consultoría Web.
              </span>
            </h2>
          </div>
          <p className="reveal text-chrome text-base font-light max-w-md lg:text-right">
            Diseñamos webs modernas, claras y pensadas para ayudarte a mostrar tu negocio y generar consultas.
          </p>
        </div>

        {/* Benefits */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {benefits.map((b, i) => (
            <li key={b.title} className="reveal glass-card glow-hover rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-sky shadow-[0_0_32px_rgba(86,204,242,0.15)] shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                    {b.icon}
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-chrome-dim" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-frost font-bold text-lg leading-tight">{b.title}</h3>
              <p className="text-chrome text-sm font-light leading-relaxed">{b.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
