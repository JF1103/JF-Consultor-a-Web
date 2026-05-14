'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const modules = [
  {
    id: '01',
    title: 'Landing Page',
    category: 'Más elegida',
    level: 'Esencial',
    levelClass: 'badge-beginner',
    description:
      'Una página clara y directa para presentar un servicio, captar consultas y llevar tráfico a WhatsApp.',
    img: '/assets/images/landing-page.svg',
    alt: 'Ejemplo de landing page profesional moderna para vender un servicio',
    highlight: false,
    span: 'md:col-span-1',
    planOption: 'Inicial - USD 180',
  },
  {
    id: '02',
    title: 'Web Institucional',
    category: 'Profesional',
    level: 'Recomendada',
    levelClass: 'badge-intermediate',
    description:
      'Ideal para empresas, comercios y profesionales que necesitan mostrar quiénes son, qué ofrecen y cómo contactarlos.',
    img: '/assets/images/web-institucional.svg',
    alt: 'Ejemplo de página web institucional para empresa o comercio',
    highlight: true,
    span: 'md:col-span-1',
    planOption: 'Profesional - USD 320',
  },
  {
    id: '03',
    title: 'Portfolio Profesional',
    category: 'Marca personal',
    level: 'Freelance',
    levelClass: 'badge-beginner',
    description:
      'Perfecta para mostrar trabajos, experiencia, servicios y generar una imagen profesional online.',
    img: '/assets/images/portfolio-web.svg',
    alt: 'Ejemplo de portfolio profesional para freelancer o profesional independiente',
    highlight: false,
    span: 'md:col-span-1',
    planOption: 'Profesional - USD 320',
  },
  {
    id: '04',
    title: 'Web para Comercios',
    category: 'Comercios',
    level: 'Local',
    levelClass: 'badge-beginner',
    description:
      'Mostrá productos, horarios, ubicación, redes sociales y canales de contacto en un solo lugar.',
    img: '/assets/images/web-comercio.svg',
    alt: 'Ejemplo de página web para comercio local con productos y contacto',
    highlight: false,
    span: 'md:col-span-1',
    planOption: 'Profesional - USD 320',
  },
  {
    id: '05',
    title: 'Web para Servicios',
    category: 'Servicios',
    level: 'Consultas',
    levelClass: 'badge-advanced',
    description:
      'Pensada para negocios que venden servicios y necesitan explicar beneficios, planes y recibir solicitudes.',
    img: '/assets/images/web-servicios.svg',
    alt: 'Ejemplo de sitio web para negocio de servicios con formulario de contacto',
    highlight: false,
    span: 'md:col-span-1',
    planOption: 'Profesional - USD 320',
  },
  {
    id: '06',
    title: 'Web Premium',
    category: 'Avanzada',
    level: 'Premium',
    levelClass: 'badge-intermediate',
    description:
      'Una web más completa, con más secciones, mejor presentación visual y estructura preparada para crecer.',
    img: '/assets/images/web-premium.svg',
    alt: 'Ejemplo de página web premium con diseño avanzado y secciones escalables',
    highlight: false,
    span: 'md:col-span-1',
    planOption: 'Premium - USD 550',
  },
];

const stats = [
  { value: '3', unit: 'Planes', label: 'Para cada etapa' },
  { value: '100%', unit: 'Responsive', label: 'Mobile First' },
  { value: '24/7', unit: 'Online', label: 'Tu web siempre disponible' },
  { value: 'SEO', unit: 'Básico', label: 'Lista para Google' },
];

function handleCardClick(planOption: string) {
  window.dispatchEvent(new CustomEvent('planSelected', { detail: planOption }));
  document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
}

export default function CurriculumSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal, .reveal-left, .reveal-right')
              .forEach((el) => {
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
    <section id="curriculum" ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="reveal">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-DEFAULT mb-3 block">
              EJEMPLOS
            </span>

            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight">
              Webs que podemos crear para tu negocio.
              <br />
              <span className="font-display italic font-light gradient-text-sky">
                Diseños modernos para vender más.
              </span>
            </h2>
          </div>

          <div className="reveal flex flex-col gap-1 md:text-right">
            <p className="text-chrome text-sm font-light max-w-xs">
              Desde una landing simple hasta una web profesional completa,
              adaptamos el diseño al tipo de negocio, objetivo y presupuesto.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-px bg-frost/5 rounded-2xl overflow-hidden mb-16 border border-frost/8">
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-6 text-center spec-row">
              <div className="text-3xl font-extrabold gradient-text-sky mb-1">
                {s.value}
              </div>
              <div className="text-frost text-sm font-semibold mb-0.5">
                {s.unit}
              </div>
              <div className="text-chrome-dim text-xs uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Web examples grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => handleCardClick(mod.planOption)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(mod.planOption)}
              className={`reveal ${mod.span} glass-card rounded-2xl overflow-hidden glow-hover transition-all duration-500 group cursor-pointer ${
                mod.highlight
                  ? 'ring-1 ring-periwinkle/40 shadow-[0_0_32px_rgba(123,97,255,0.15)]'
                  : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-36 sm:h-44 overflow-hidden">
                <AppImage
                  src={mod.img}
                  alt={mod.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-deep via-slate-deep/30 to-transparent" />

                {/* Module number */}
                <div className="absolute top-4 left-4 text-xs font-bold text-chrome-dim tracking-widest">
                  {mod.id}
                </div>

                {/* Category */}
                <div className="absolute top-4 right-4 glass-card px-2.5 py-1 rounded-full text-[10px] font-bold text-sky-DEFAULT tracking-wide uppercase">
                  {mod.category}
                </div>

                {mod.highlight && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-periwinkle/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-[10px] font-bold text-white tracking-wide">
                      ⚡ Más elegida
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-frost font-bold text-base leading-tight">
                    {mod.title}
                  </h3>

                  <span
                    className={`${mod.levelClass} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0`}
                  >
                    {mod.level}
                  </span>
                </div>

                <p className="text-sm text-chrome-dim leading-relaxed mb-4">
                  {mod.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sky-DEFAULT text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                  Consultar esta web
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-12">
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('download')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sky-DEFAULT text-sm font-semibold border-b border-sky-DEFAULT/40 pb-0.5 hover:border-sky-DEFAULT transition-colors"
          >
            Solicitar una web personalizada
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}