'use client';

import React, { useState, useEffect, useRef } from 'react';
import GridBackdrop from '@/components/GridBackdrop';
import { buildWhatsAppUrl } from '@/lib/contact';
import type { SelectedDesign } from '@/app/home/data/demos';
import { PLAN_KEYS, PLAN_OPTIONS, formatPriceWithCurrency } from '@/lib/pricing';

const DEFAULT_PLAN = PLAN_OPTIONS.profesional;

const planOptions = [...PLAN_KEYS.map((key) => PLAN_OPTIONS[key]), 'No estoy seguro'];

// Tiempo máximo de espera del registro (el servidor corta a los 8 s)
const REGISTER_TIMEOUT_MS = 12_000;

// success: /api/contact confirmó el registro · error: falló o no respondió a tiempo
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const EMPTY_FORM = { nombre: '', whatsapp: '', email: '', plan: DEFAULT_PLAN, mensaje: '' };

export default function DownloadSection() {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [planOpen, setPlanOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  // Evita dos envíos si se hace doble clic antes de que React vuelva a renderizar
  const submittingRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const sending = status === 'sending';

  // Al confirmar el envío, el foco pasa al mensaje para que lo lean los lectores de pantalla
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);
  const [selectedDesign, setSelectedDesign] = useState<SelectedDesign | null>(null);

  useEffect(() => {
    const handlePlanSelected = (e: Event) => {
      const selected = (e as CustomEvent<string>).detail;
      if (planOptions.includes(selected)) {
        setFormData((prev) => ({ ...prev, plan: selected }));
        setSelectedDesign(null);
      }
    };
    // Diseño elegido desde el catálogo de demos (CurriculumSection)
    const handleDesignSelected = (e: Event) => {
      const design = (e as CustomEvent<SelectedDesign>).detail;
      if (design && planOptions.includes(design.plan)) {
        setFormData((prev) => ({ ...prev, plan: design.plan }));
        setSelectedDesign(design);
      }
    };
    // "Quiero una web personalizada" desde el catálogo: sin modelo preseleccionado
    const handleCustomRequested = () => setSelectedDesign(null);
    window.addEventListener('planSelected', handlePlanSelected);
    window.addEventListener('designSelected', handleDesignSelected);
    window.addEventListener('customDesignRequested', handleCustomRequested);
    return () => {
      window.removeEventListener('planSelected', handlePlanSelected);
      window.removeEventListener('designSelected', handleDesignSelected);
      window.removeEventListener('customDesignRequested', handleCustomRequested);
    };
  }, []);

  const inputClass =
    'w-full rounded-full px-5 py-3 text-frost text-sm placeholder:text-chrome-dim bg-frost/[0.04] border border-frost/10 focus:outline-none focus:border-sky/50 focus-visible:ring-2 focus-visible:ring-sky/40 transition-colors';

  const textareaClass =
    'w-full rounded-2xl px-5 py-4 text-frost text-sm placeholder:text-chrome-dim bg-frost/[0.04] border border-frost/10 focus:outline-none focus:border-sky/50 focus-visible:ring-2 focus-visible:ring-sky/40 transition-colors resize-none';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlanChange = (plan: string) => {
    setFormData({ ...formData, plan });
    if (selectedDesign && selectedDesign.plan !== plan) setSelectedDesign(null);
  };

  // Alternativa opcional ante un error: abre WhatsApp solo si el usuario hace clic
  const buildFallbackWhatsAppUrl = () => {
    const designLines = selectedDesign
      ? `\nDiseño: ${selectedDesign.code}\nModelo: ${selectedDesign.name}\nPrecio: ${formatPriceWithCurrency(selectedDesign.price)}`
      : '';
    return buildWhatsAppUrl(`Hola, quiero consultar por una página web.

Nombre: ${formData.nombre}
WhatsApp: ${formData.whatsapp}${formData.email ? `\nEmail: ${formData.email}` : ''}
Plan de interés: ${formData.plan}${designLines}
Mensaje: ${formData.mensaje}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus('sending');

    // Mismo payload de siempre; el diseño elegido viaja al inicio del mensaje
    const apiBody = selectedDesign
      ? {
          ...formData,
          mensaje: `Diseño: ${selectedDesign.code} · Modelo: ${selectedDesign.name} · Precio: ${formatPriceWithCurrency(selectedDesign.price)}\n${formData.mensaje}`,
        }
      : formData;

    // Registro de la consulta: solo se da por enviada si /api/contact lo confirma
    let registered = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REGISTER_TIMEOUT_MS);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiBody),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      registered = res.ok && data?.ok === true;
    } catch {
      registered = false;
    } finally {
      clearTimeout(timer);
    }

    setStatus(registered ? 'success' : 'error');
    // Si no se confirmó, se conservan los datos para reintentar sin escribirlos de nuevo
    if (registered) {
      setFormData(EMPTY_FORM);
      setSelectedDesign(null);
    }
    submittingRef.current = false;
  };

  return (
    <section id="download" className="py-14 sm:py-16 lg:py-20 relative isolate overflow-hidden">
      <GridBackdrop />
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-sky absolute top-[-20%] left-[20%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] rounded-full opacity-20" />
        <div className="blob-periwinkle absolute bottom-[-20%] right-[10%] w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
              <span className="text-xs font-bold text-chrome uppercase tracking-widest">
                Contacto directo
              </span>
            </div>

            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-frost tracking-tight leading-tight mb-6">
              ¿Querés una web para tu negocio?
              <br />
              <span className="gradient-text-warm font-display italic font-light">
                Hablemos de tu proyecto.
              </span>
            </h2>

            <p className="text-chrome text-lg font-light leading-relaxed mb-8 max-w-2xl">
              Contanos qué necesitás y te ayudamos a elegir el plan más adecuado.
              Podemos crear una landing simple, una web profesional o una solución
              más completa preparada para crecer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-frost font-bold text-base mb-2">
                  Respuesta rápida
                </h3>
                <p className="text-chrome-dim text-sm font-light leading-relaxed">
                  Tu consulta nos llega al instante y te respondemos por los
                  datos de contacto que nos dejes.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-frost font-bold text-base mb-2">
                  Presupuesto claro
                </h3>
                <p className="text-chrome-dim text-sm font-light leading-relaxed">
                  Te indicamos qué incluye el plan elegido y qué extras podrían
                  sumarse.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <h3 className="text-frost font-bold text-2xl mb-2">
              Solicitá tu presupuesto
            </h3>

            <p className="text-chrome-dim text-sm font-light mb-8">
              Completá los datos y te contactamos con una propuesta.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="field-nombre" className="block text-chrome text-sm font-semibold mb-2">
                  Nombre
                </label>
                <input
                  id="field-nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  autoComplete="off"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="field-whatsapp" className="block text-chrome text-sm font-semibold mb-2">
                  WhatsApp
                </label>
                <input
                  id="field-whatsapp"
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  minLength={8}
                  pattern="[+0-9\s\-]{8,20}"
                  title="Ingresá un número válido (ej: +54 9 11 1234-5678)"
                  placeholder="+54 9 11..."
                  autoComplete="off"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="field-email" className="block text-chrome text-sm font-semibold mb-2">
                  Email <span className="text-chrome-dim font-normal">(opcional)</span>
                </label>
                <input
                  id="field-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tuemail@email.com"
                  autoComplete="off"
                  className={inputClass}
                />
              </div>

              {selectedDesign && (
                <div
                  role="status"
                  className="glass-card-bright rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
                >
                  <p className="text-sm text-chrome min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-sky mb-0.5">
                      Diseño elegido
                    </span>
                    <span className="text-frost font-semibold">{selectedDesign.code}</span>
                    {' · '}
                    {selectedDesign.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedDesign(null)}
                    aria-label="Quitar diseño elegido"
                    className="shrink-0 min-h-[44px] px-3 rounded-full text-xs font-semibold text-chrome-dim hover:text-frost hover:bg-frost/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70"
                  >
                    Quitar
                  </button>
                </div>
              )}

              <div className="relative">
                <label htmlFor="field-plan" className="block text-chrome text-sm font-semibold mb-3">
                  Plan de interés
                </label>

                <button
                  id="field-plan"
                  type="button"
                  onClick={() => setPlanOpen(!planOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={planOpen}
                  className="w-full rounded-full px-5 py-3 text-frost text-sm bg-frost/[0.04] border border-frost/10 focus:outline-none focus:border-sky/50 focus-visible:ring-2 focus-visible:ring-sky/40 transition-colors flex items-center justify-between"
                >
                  <span>{formData.plan}</span>

                  <svg
                    className={`w-4 h-4 text-chrome-dim transition-transform duration-300 ${
                      planOpen ? 'rotate-180' : ''
                    }`}
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
                </button>

                {planOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl overflow-hidden border border-frost/10 bg-slate-deep shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                  >
                    {planOptions.map((plan) => {
                      const isSelected = formData.plan === plan;

                      return (
                        <button
                          key={plan}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            handlePlanChange(plan);
                            setPlanOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-left text-sm transition-colors ${
                            isSelected
                              ? 'bg-sky/10 text-frost'
                              : 'text-chrome hover:bg-frost/[0.06] hover:text-frost'
                          }`}
                        >
                          {plan}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="field-mensaje" className="block text-chrome text-sm font-semibold mb-2">
                  Mensaje
                </label>
                <textarea
                  id="field-mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={500}
                  placeholder="Contanos qué tipo de web necesitás, para qué negocio y qué funcionalidades te gustaría incluir."
                  autoComplete="off"
                  className={textareaClass}
                />
              </div>

              {/* Error: se conservan los datos y se puede reintentar */}
              {status === 'error' && (
                <div
                  role="alert"
                  data-submit-status="error"
                  className="rounded-2xl border border-periwinkle/30 bg-periwinkle/[0.07] px-5 py-4 space-y-2"
                >
                  <p className="flex items-start gap-2 text-frost font-semibold text-sm">
                    <svg className="w-5 h-5 shrink-0 text-periwinkle" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                    </svg>
                    No pudimos enviar tu consulta. Por favor, intentá nuevamente.
                  </p>
                  <p className="text-chrome-dim text-xs font-light leading-relaxed">
                    Tus datos siguen cargados. Si preferís, también podés escribirnos por WhatsApp.
                  </p>
                  <a
                    href={buildFallbackWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[44px] text-sm font-semibold text-sky underline underline-offset-4 decoration-sky/40 hover:decoration-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70 rounded"
                  >
                    Escribir por WhatsApp
                    <span className="sr-only"> (opcional, se abre en una pestaña nueva)</span>
                  </a>
                </div>
              )}

              {status === 'success' ? (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  data-submit-status="success"
                  className="rounded-2xl border border-sky/25 bg-sky/[0.06] px-5 py-4 space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/50"
                >
                  <p className="flex items-start gap-2 text-sky font-semibold text-base">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    ¡Mensaje enviado correctamente!
                  </p>
                  <p className="text-chrome text-sm font-light leading-relaxed">
                    Recibimos tu consulta. Nos pondremos en contacto con vos a través de los datos que nos dejaste.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center min-h-[44px] text-sm text-chrome-dim hover:text-frost underline underline-offset-4 decoration-frost/20 hover:decoration-frost/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70 rounded"
                  >
                    Hacer otra consulta
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="btn-primary w-full flex items-center justify-center gap-3 px-7 py-4 rounded-full text-slate-deep font-bold text-base tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar consulta
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-chrome-dim font-light">
                    Sin compromiso. Te respondemos con una propuesta según tu necesidad.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
