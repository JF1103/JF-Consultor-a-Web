'use client';

import React, { useEffect, useRef } from 'react';
import GridBackdrop from '@/components/GridBackdrop';
import { scrollToId } from '@/lib/scroll';

const steps = [
  {
    number: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Nos contás tu idea',
    description:
      'Hablamos por WhatsApp y coordinamos una reunión para conocer tu negocio y definir el proyecto.',
    detail: 'Reunión por videollamada',
  },
  {
    number: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Diseñamos tu web',
    description:
      'Desarrollamos tu página con la información y los materiales acordados.',
    detail: 'Primera versión online para revisar',
  },
  {
    number: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Revisás y aprobás',
    description:
      'Te mostramos la web funcionando. Incluimos una ronda de ajustes antes de la aprobación final.',
    detail: '1 ronda de ajustes en todos los planes',
  },
  {
    number: '04',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: 'Publicamos y entregamos',
    description:
      'Dejamos tu página online, configuramos lo incluido en tu plan y te entregamos los accesos.',
    detail: 'Publicación incluida en todos los planes',
  },
];

export default function HowWeWorkSection() {
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

  const handleCTA = () => {
    scrollToId('download');
  };

  return (
    <section id="how-we-work" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative isolate">
      <GridBackdrop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="reveal text-center mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky mb-3 block">
            El proceso
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight mb-4">
            Así trabajamos con vos.
            <br />
            <span className="font-display italic font-light gradient-text-sky">Simple, claro y sin vueltas.</span>
          </h2>
          <p className="text-chrome text-base font-light max-w-lg mx-auto">
            En 4 pasos tenés tu web online. Sin tecnicismos, sin sorpresas y con acompañamiento en todo momento.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — mobile (vertical, entre íconos) */}
          <div className="sm:hidden absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-sky/30 to-transparent" />
          {/* Connector line — desktop (del primer al último ícono) */}
          <div className="hidden lg:block absolute top-8 left-16 right-[calc(25%-18px)] h-px bg-gradient-to-r from-transparent via-sky/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 stagger-children">
            {steps.map((step, i) => (
              <div key={i} className="reveal flex flex-row gap-4 items-start text-left sm:flex-col sm:gap-0 sm:items-center sm:text-center lg:items-start lg:text-left">
                {/* Icon circle */}
                <div className="relative sm:mb-5 shrink-0">
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-sky shadow-[0_0_32px_rgba(86,204,242,0.15)] shrink-0">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sky flex items-center justify-center text-[10px] font-extrabold text-slate-deep">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-5 lg:p-6 w-full flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2 justify-start sm:justify-center lg:justify-start">
                    <span className="text-[10px] font-bold tracking-widest text-chrome-dim uppercase">Paso {step.number}</span>
                  </div>
                  <h3 className="text-frost font-bold text-lg leading-tight">{step.title}</h3>
                  <p className="text-chrome text-sm font-light leading-relaxed flex-1">{step.description}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-frost/5 justify-start sm:justify-center lg:justify-start">
                    <svg className="w-3.5 h-3.5 text-sky shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-xs text-chrome-dim font-light">{step.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="reveal text-center text-chrome-dim text-xs sm:text-sm font-light mt-8 max-w-3xl mx-auto">
          Los plazos de entrega comienzan desde la confirmación del anticipo del 50% y la recepción de los materiales necesarios.
        </p>

        {/* CTA */}
        <div className="reveal text-center mt-6">
          <button
            type="button"
            onClick={handleCTA}
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full text-slate-deep font-bold text-base tracking-wide"
          >
            Empezar ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          <p className="text-chrome-dim text-xs font-light mt-3">Sin compromiso · Te respondemos en menos de 24 hs</p>
        </div>
      </div>
    </section>
  );
}
