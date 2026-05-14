'use client';
import React, { useEffect, useRef } from 'react';

const plans = [
  {
    name: 'INICIAL',
    price: 180,
    period: 'USD',
    planOption: 'Inicial - USD 180',
    description: 'Ideal para emprendedores que necesitan presencia online clara, simple y profesional.',
    delivery: '5 días hábiles',
    features: [
      'Landing page de hasta 3 secciones',
      'Diseño responsive (mobile y desktop)',
      'Botón de contacto por WhatsApp',
      'Información del negocio y servicios',
      'Formulario de contacto básico',
      'Publicación online incluida (Netlify)',
      'Guía para conectar tu dominio',
    ],
    missing: ['Secciones adicionales', 'Automatizaciones', 'Panel administrativo'],
    cta: 'Quiero este plan',
    ctaStyle: 'glass-card glow-hover text-frost',
    featured: false,
  },
  {
    name: 'PROFESIONAL',
    price: 320,
    period: 'USD',
    planOption: 'Profesional - USD 320',
    description: 'Pensado para negocios que quieren generar confianza, mostrar sus servicios y recibir más consultas.',
    delivery: '7 días hábiles',
    features: [
      'Hasta 5 secciones personalizadas',
      'Diseño a medida según tu marca',
      '100% responsive (mobile, tablet, desktop)',
      'WhatsApp integrado y visible',
      'SEO on-page básico (título, descripción, etiquetas)',
      'Código limpio y carga rápida',
      'Formulario de contacto',
      'Publicación online incluida (Netlify)',
      'Conexión de dominio incluida',
    ],
    missing: ['Tienda online con pagos', 'Panel de administración'],
    cta: 'Quiero este plan',
    ctaStyle: 'btn-primary text-slate-deep',
    featured: true,
    badge: 'MÁS ELEGIDO',
  },
  {
    name: 'PREMIUM',
    price: 550,
    period: 'USD',
    planOption: 'Premium - USD 550',
    description: 'Para marcas, empresas o profesionales que necesitan una web más completa, moderna y preparada para crecer.',
    delivery: '12 días hábiles',
    features: [
      'Todo lo del plan Profesional, más:',
      'Hasta 8 secciones personalizadas',
      'Diseño visual avanzado y detallado',
      'Animaciones y efectos sutiles',
      'SEO on-page completo',
      'Links a redes sociales integrados',
      'Estructura preparada para publicidad online',
      'Publicación online + conexión de dominio',
      '30 días de soporte post-entrega',
    ],
    missing: [],
    cta: 'Quiero este plan',
    ctaStyle: 'glass-card sky-glow-hover text-frost',
    featured: false,
  },
];

export default function PricingSection() {
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

  const handlePlanCTA = (planOption: string) => {
    window.dispatchEvent(new CustomEvent('planSelected', { detail: planOption }));
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-DEFAULT mb-3 block">Planes</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight mb-4">
            Elegí la web que necesita tu negocio.<br />
            <span className="font-display italic font-light gradient-text-sky">Sin vueltas. Sin costos raros.</span>
          </h2>
          <p className="text-chrome text-base font-light max-w-lg mx-auto">
            Desde una landing simple hasta una web profesional completa. Te ayudamos a elegir la mejor opción según tu objetivo y presupuesto.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`reveal rounded-2xl overflow-hidden transition-all duration-500 flex flex-col ${
                plan.featured ? 'pricing-featured' : 'glass-card glow-hover'
              }`}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div className="bg-periwinkle text-white text-[10px] font-bold tracking-widest uppercase text-center py-2">
                  ⚡ {plan.badge}
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Plan name */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-frost font-bold text-xl">{plan.name}</h3>

                  {plan.featured && (
                    <span className="badge-intermediate text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Recomendada
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-2">
                  <span
                    className={`text-4xl sm:text-5xl font-extrabold ${
                      plan.featured ? 'gradient-text-sky' : 'text-frost'
                    }`}
                  >
                    ${plan.price}
                  </span>

                  <span className="text-chrome-dim text-sm pb-2">
                    {plan.period}
                  </span>
                </div>

                {/* Delivery badge */}
                <div className="inline-flex items-center gap-1.5 mb-4 bg-frost/5 border border-frost/10 rounded-full px-3 py-1">
                  <svg className="w-3 h-3 text-sky-DEFAULT shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-xs text-chrome font-medium">Entrega en {plan.delivery}</span>
                </div>

                <p className="text-chrome text-sm font-light mb-6">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="section-divider mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-sky-DEFAULT shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-chrome text-sm font-light">{f}</span>
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 opacity-40">
                      <svg className="w-4 h-4 text-chrome-dim shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      <span className="text-chrome-dim text-sm font-light">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handlePlanCTA(plan.planOption)}
                  className={`${plan.ctaStyle} flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300`}
                >
                  {plan.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Guarantee note */}
        <div className="reveal text-center mt-10">
          <p className="text-chrome-dim text-sm font-light">
            🔒 <span className="text-chrome">Todos los planes incluyen la publicación online de tu web.</span> El dominio (ej: tunegocio.com) se contrata por separado y tiene un costo de aproximadamente USD 10–15 por año. El hosting es gratuito. Los precios pueden abonarse en pesos argentinos según la cotización vigente. Funcionalidades adicionales se cotizan aparte.
          </p>
        </div>
      </div>
    </section>
  );
}
