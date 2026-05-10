'use client';

import React, { useState, useEffect } from 'react';
import { buildWhatsAppUrl } from '@/lib/contact';

const planOptions = [
  'Inicial - USD 120',
  'Profesional - USD 220',
  'Premium - USD 380',
  'No estoy seguro',
];

export default function DownloadSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    plan: 'Profesional - USD 220',
    mensaje: '',
  });

  const [planOpen, setPlanOpen] = useState(false);

  useEffect(() => {
    const handlePlanSelected = (e: Event) => {
      const selected = (e as CustomEvent<string>).detail;
      if (planOptions.includes(selected)) {
        setFormData((prev) => ({ ...prev, plan: selected }));
      }
    };
    window.addEventListener('planSelected', handlePlanSelected);
    return () => window.removeEventListener('planSelected', handlePlanSelected);
  }, []);

  const inputClass =
    'w-full rounded-full px-5 py-3 text-frost text-sm placeholder:text-chrome-dim bg-frost/[0.04] border border-frost/10 focus:outline-none focus:border-sky-DEFAULT/50 focus-visible:ring-2 focus-visible:ring-sky-DEFAULT/40 transition-colors';

  const textareaClass =
    'w-full rounded-2xl px-5 py-4 text-frost text-sm placeholder:text-chrome-dim bg-frost/[0.04] border border-frost/10 focus:outline-none focus:border-sky-DEFAULT/50 focus-visible:ring-2 focus-visible:ring-sky-DEFAULT/40 transition-colors resize-none';

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mensaje = `Hola, quiero consultar por una página web.

Nombre: ${formData.nombre}
WhatsApp: ${formData.whatsapp}${formData.email ? `\nEmail: ${formData.email}` : ''}
Plan de interés: ${formData.plan}
Mensaje: ${formData.mensaje}`;

    window.open(buildWhatsAppUrl(mensaje), '_blank');
  };

  return (
    <section id="download" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="section-divider mb-24" />

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
              <span className="w-2 h-2 rounded-full bg-sky-DEFAULT animate-pulse" />
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
                  Tu consulta se abre directamente en WhatsApp para responderte
                  sin vueltas.
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
              Completá los datos y enviá tu consulta por WhatsApp.
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
                  className="w-full rounded-full px-5 py-3 text-frost text-sm bg-frost/[0.04] border border-frost/10 focus:outline-none focus:border-sky-DEFAULT/50 focus-visible:ring-2 focus-visible:ring-sky-DEFAULT/40 transition-colors flex items-center justify-between"
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
                              ? 'bg-sky-DEFAULT/10 text-frost'
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

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3 px-7 py-4 rounded-full text-slate-deep font-bold text-base tracking-wide"
              >
                Enviar consulta por WhatsApp
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>

              <p className="text-center text-xs text-chrome-dim font-light">
                Sin compromiso. Te respondemos con una propuesta según tu
                necesidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
