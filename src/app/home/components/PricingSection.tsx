'use client';
import React, { useEffect, useRef } from 'react';
import { CURRENCY, PLAN_OPTIONS, PLAN_PRICES, formatPrice } from '@/lib/pricing';
import { scrollToId } from '@/lib/scroll';

const plans = [
  {
    name: 'INICIAL',
    price: PLAN_PRICES.inicial,
    planOption: PLAN_OPTIONS.inicial,
    description: 'Ideal para emprendedores que necesitan presencia online clara, simple y profesional.',
    delivery: '5 días hábiles',
    features: [
      'Landing page de hasta 3 secciones',
      'Diseño responsive (celular, tablet y computadora)',
      'Botón de contacto por WhatsApp',
      'Información del negocio y servicios',
      'Formulario de contacto básico',
      'Publicación online incluida',
      'Asesoramiento sobre tu dominio',
    ],
    missing: ['Conexión de dominio propio (se cotiza aparte)', 'SEO on-page', 'Tienda online, reservas o panel de administración'],
    cta: 'Quiero este plan',
    ctaStyle: 'glass-card glow-hover text-frost',
    featured: false,
  },
  {
    name: 'PROFESIONAL',
    price: PLAN_PRICES.profesional,
    planOption: PLAN_OPTIONS.profesional,
    description: 'Pensado para negocios que quieren generar confianza, mostrar sus servicios y facilitar las consultas.',
    delivery: '7 días hábiles',
    features: [
      'Todo lo del plan Inicial, más:',
      'Hasta 5 secciones personalizadas',
      'Mayor personalización según tu marca',
      'WhatsApp integrado y visible',
      'SEO on-page básico (título, descripción y etiquetas)',
      'Código limpio y carga rápida',
      'Conexión inicial de tu dominio propio',
    ],
    missing: ['Tienda online con pagos', 'Sistema de reservas', 'Panel de administración'],
    cta: 'Quiero este plan',
    ctaStyle: 'btn-primary text-slate-deep',
    featured: true,
    badge: 'RECOMENDADO',
  },
  {
    name: 'PREMIUM',
    price: PLAN_PRICES.premium,
    planOption: PLAN_OPTIONS.premium,
    description: 'Para marcas, empresas o profesionales que necesitan una web más completa, moderna y preparada para crecer.',
    delivery: '12 días hábiles',
    features: [
      'Todo lo del plan Profesional, más:',
      'Hasta 8 secciones personalizadas',
      'Diseño visual avanzado y detallado',
      'Animaciones y efectos sutiles',
      'SEO on-page más completo',
      'Links a redes sociales integrados',
      'Estructura preparada para campañas publicitarias',
      'Conexión inicial de tu dominio propio',
      '30 días de soporte post-entrega',
    ],
    missing: ['Tienda online con pagos', 'Sistema de reservas', 'Panel de administración'],
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
    scrollToId('download');
  };

  // Abre el catálogo de demos con el plan correspondiente ya seleccionado
  const handleSeeDesigns = (planKey: string) => {
    window.dispatchEvent(new CustomEvent('catalogPlanSelected', { detail: planKey }));
    scrollToId('catalogo');
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="reveal text-center mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky mb-3 block">Planes</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight mb-4">
            Elegí la web que necesita tu negocio.<br />
            <span className="font-display italic font-light gradient-text-sky">Sin vueltas. Con precios claros.</span>
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

                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span
                      className={`text-4xl md:text-[1.875rem] lg:text-4xl xl:text-5xl font-extrabold tracking-tight tabular-nums whitespace-nowrap ${
                        plan.featured ? 'gradient-text-sky' : 'text-frost'
                      }`}
                    >
                      {formatPrice(plan.price)}
                    </span>

                    <span
                      className="text-[11px] font-bold tracking-[0.15em] text-chrome border border-frost/15 bg-frost/[0.04] rounded-full px-2 py-0.5"
                      title="Pesos argentinos"
                    >
                      {CURRENCY}
                    </span>
                  </div>

                  <p className="text-chrome text-xs font-medium mt-1.5">
                    Precio único por el desarrollo
                  </p>
                </div>

                {/* Delivery badge */}
                <div className="inline-flex items-center gap-1.5 mb-4 bg-frost/5 border border-frost/10 rounded-full px-3 py-1">
                  <svg className="w-3 h-3 text-sky shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
                      <svg className="w-4 h-4 text-sky shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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

                <a
                  href="#catalogo"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSeeDesigns(plan.name.toLowerCase());
                  }}
                  className="mt-2 min-h-[44px] inline-flex items-center justify-center gap-1 self-center rounded-full px-3 text-xs text-chrome-dim hover:text-sky underline underline-offset-4 decoration-frost/20 hover:decoration-sky/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70"
                >
                  Ver diseños de este plan
                </a>

              </div>
            </div>
          ))}
        </div>

        {/* Guarantee note */}
        <div className="reveal text-center mt-10 max-w-4xl mx-auto space-y-3">
          <p className="text-chrome text-sm font-light">
            <span className="text-frost font-semibold">Precios en pesos argentinos (ARS).</span>{' '}
            El desarrollo tiene un precio único, sin abonos mensuales obligatorios: 50% al comenzar y 50% al entregar. Todos los planes incluyen una ronda de ajustes antes de la aprobación final. Cada diseño se adapta a tu marca, tus textos y tus fotos dentro del alcance del plan.
          </p>
          <p className="text-chrome-dim text-sm font-light">
            🔒 <span className="text-chrome">Tu página se entrega publicada y lista para compartir.</span> Si querés un dominio propio, su contratación y renovación corren por tu cuenta, y te asesoramos durante el proceso. Ningún plan incluye tienda online con pagos, reservas ni panel de administración: esas funciones, el alojamiento pago o los servicios de terceros se cotizan aparte antes de contratarlos.
          </p>
        </div>
      </div>
    </section>
  );
}
