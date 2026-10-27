'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { CURRENCY, formatPrice } from '@/lib/pricing';
import { scrollToId, scrollToSection } from '@/lib/scroll';
import {
  DEMOS,
  PLANS,
  PLAN_KEYS,
  type Demo,
  type PlanKey,
  type SelectedDesign,
} from '@/app/home/data/demos';

const stats = [
  { value: '3', unit: 'Planes', label: 'Para cada etapa' },
  { value: '100%', unit: 'Responsive', label: 'Mobile First' },
  { value: '5–12', unit: 'Días hábiles', label: 'Entrega según el plan' },
  { value: 'SEO', unit: 'On-page', label: 'Desde el plan Profesional' },
];

const planBadgeClass: Record<PlanKey, string> = {
  inicial: 'badge-beginner',
  profesional: 'badge-intermediate',
  premium: 'badge-advanced',
};

// Secciones máximas por plan (las mismas que figuran en las tarjetas de Planes)
const PLAN_SECTIONS: Record<PlanKey, number> = { inicial: 3, profesional: 5, premium: 8 };

const demosByPlan = Object.fromEntries(
  PLAN_KEYS.map((key) => [key, DEMOS.filter((d) => d.plan === key)])
) as Record<PlanKey, Demo[]>;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-deep';

function handleDesignClick(demo: Demo) {
  const plan = PLANS[demo.plan];
  const detail: SelectedDesign = {
    plan: plan.planOption,
    planLabel: plan.label,
    code: demo.code,
    name: demo.name,
    price: plan.price,
  };
  window.dispatchEvent(new CustomEvent('designSelected', { detail }));
  scrollToId('download');
}

export default function CurriculumSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<PlanKey, HTMLButtonElement | null>>({
    inicial: null,
    profesional: null,
    premium: null,
  });
  const [activePlan, setActivePlan] = useState<PlanKey>('profesional');

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

  // Selección de plan desde las tarjetas de precios
  useEffect(() => {
    const handleCatalogPlan = (e: Event) => {
      const plan = (e as CustomEvent<PlanKey>).detail;
      if (PLAN_KEYS.includes(plan)) setActivePlan(plan);
    };
    window.addEventListener('catalogPlanSelected', handleCatalogPlan);
    return () => window.removeEventListener('catalogPlanSelected', handleCatalogPlan);
  }, []);

  const selectTab = (plan: PlanKey, focus = false) => {
    setActivePlan(plan);
    if (focus) tabRefs.current[plan]?.focus();
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const index = PLAN_KEYS.indexOf(activePlan);
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (index + 1) % PLAN_KEYS.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + PLAN_KEYS.length) % PLAN_KEYS.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = PLAN_KEYS.length - 1;
    if (next === null) return;
    e.preventDefault();
    selectTab(PLAN_KEYS[next], true);
  };

  const demos = demosByPlan[activePlan];

  return (
    <section id="curriculum" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="reveal">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky mb-3 block">
              EJEMPLOS
            </span>

            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight">
              Webs que podemos crear para tu negocio.
              <br />
              <span className="font-display italic font-light gradient-text-sky">
                Diseños modernos, listos para adaptar.
              </span>
            </h2>
          </div>

          <div className="reveal flex flex-col gap-1 md:text-right">
            <p className="text-chrome text-sm font-light max-w-xs">
              Explorá demos reales de cada plan: son referencias de estilo y de
              alcance. Podés partir de una o pedir una web personalizada, siempre
              adaptada a tu marca dentro de lo que incluye el plan.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-px bg-frost/5 rounded-2xl overflow-hidden mb-10 sm:mb-12 border border-frost/8">
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

        {/* Plan tabs */}
        <div id="catalogo" className="reveal flex flex-col items-center gap-4 mb-10 scroll-mt-28">
          <div
            role="tablist"
            aria-label="Diseños por plan"
            className="glass-card grid grid-cols-3 gap-1 p-1 rounded-full w-full max-w-2xl"
          >
            {PLAN_KEYS.map((key) => {
              const p = PLANS[key];
              const selected = key === activePlan;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabRefs.current[key] = el;
                  }}
                  id={`catalog-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="catalog-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(key)}
                  onKeyDown={handleTabKeyDown}
                  className={`${focusRing} min-h-[48px] rounded-full px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-center sm:gap-2 transition-all duration-300 touch-manipulation ${
                    selected
                      ? 'bg-sky-gradient text-slate-deep shadow-glow-sky'
                      : 'text-chrome hover:text-frost hover:bg-frost/[0.06]'
                  }`}
                >
                  <span className="text-sm font-bold leading-tight">{p.label}</span>
                  <span
                    className={`text-[11px] font-semibold leading-tight whitespace-nowrap ${
                      selected ? 'text-slate-deep/80' : 'text-chrome-dim'
                    }`}
                  >
                    {formatPrice(p.price)} {CURRENCY}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Las tres variantes ocupan la misma celda: la altura no cambia al cambiar de plan */}
          <div className="grid max-w-xl text-center">
            {PLAN_KEYS.map((key) => (
              <p
                key={key}
                aria-hidden={key === activePlan ? undefined : true}
                className={`[grid-area:1/1] text-chrome-dim text-sm font-light ${key === activePlan ? '' : 'invisible'}`}
              >
                Ejemplos del{' '}
                <span className="text-frost font-semibold">plan {PLANS[key].label}</span>,
                de hasta {PLAN_SECTIONS[key]} secciones. Son referencias que adaptamos a tu
                marca dentro de lo que incluye el plan.
              </p>
            ))}
          </div>
        </div>

        {/* Demo cards */}
        <div
          id="catalog-panel"
          role="tabpanel"
          aria-labelledby={`catalog-tab-${activePlan}`}
          tabIndex={-1}
          className="focus:outline-none"
        >
          <ul
            key={activePlan}
            className="catalog-swap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {demos.map((demo, i) => (
              <li
                key={demo.code}
                className={`glass-card rounded-2xl overflow-hidden glow-hover transition-all duration-500 group flex flex-col ${
                  i === 2 ? 'sm:col-span-2 sm:max-w-[calc(50%-0.625rem)] sm:justify-self-center lg:col-span-1 lg:max-w-none' : ''
                }`}
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-mid">
                  <AppImage
                    src={demo.image}
                    alt={`Captura de la demo ${demo.name} (${demo.code}), diseño del plan ${PLANS[demo.plan].label}`}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-slate-deep/80 backdrop-blur-sm border border-frost/10 px-2.5 py-1 rounded-full text-[10px] font-bold text-frost tracking-widest">
                    {demo.code}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Textos de la tarjeta en esta posición para los tres planes, apilados en la misma
                      celda (los inactivos invisibles): la tarjeta mide siempre lo mismo al cambiar de plan */}
                  <div className="grid mb-5 flex-1">
                    {PLAN_KEYS.map((key) => {
                      const d = demosByPlan[key][i];
                      const isActive = key === activePlan;
                      return (
                        <div
                          key={key}
                          aria-hidden={isActive ? undefined : true}
                          className={`[grid-area:1/1] ${isActive ? '' : 'invisible'}`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-frost font-bold text-lg leading-tight">
                              {d.name}
                            </h3>

                            <span
                              className={`${planBadgeClass[key]} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0`}
                            >
                              Plan {PLANS[key].label}
                            </span>
                          </div>

                          <p className="text-sm text-chrome-dim leading-relaxed">
                            {d.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver demo de ${demo.name} (se abre en una pestaña nueva)`}
                      className={`${focusRing} glass-card sky-glow-hover flex-1 basis-[7.5rem] min-h-[44px] rounded-full px-4 flex items-center justify-center gap-1.5 whitespace-nowrap text-frost text-sm font-semibold transition-all duration-300`}
                    >
                      Ver demo
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDesignClick(demo)}
                      aria-label={`Quiero el diseño ${demo.name} (${demo.code})`}
                      className={`${focusRing} btn-primary flex-[1.4] basis-[9.5rem] min-h-[44px] rounded-full px-4 flex items-center justify-center whitespace-nowrap text-slate-deep text-sm font-bold`}
                    >
                      Quiero este diseño
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal text-center mt-10">
          <p className="text-chrome-dim text-sm font-light mb-2">
            ¿Ninguno se ajusta a lo que buscás? No es obligatorio elegir un modelo.
          </p>
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              // El formulario quita cualquier diseño elegido antes
              window.dispatchEvent(new CustomEvent('customDesignRequested'));
              // Directo a la tarjeta del formulario (igual que «Pedir presupuesto» del navbar)
              scrollToSection('download');
            }}
            className="inline-flex items-center gap-2 text-sky text-sm font-semibold border-b border-sky/40 pb-0.5 hover:border-sky transition-colors"
          >
            Quiero una web personalizada
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
