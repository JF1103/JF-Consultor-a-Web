'use client';

import React, { useState, useEffect, useRef } from 'react';
import { scrollToId } from '@/lib/scroll';

const faqs = [
  {
    question: '¿Qué incluye el precio?',
    answer:
      'El desarrollo de tu web a partir del diseño que elijas, adaptado a tu negocio según el plan: secciones, textos, fotos, botón de WhatsApp y formulario de contacto. Incluye una ronda de ajustes antes de la aprobación final y la publicación online, y la web se adapta a celular, tablet y computadora. Es un precio único, sin abonos mensuales obligatorios.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      'El desarrollo tiene un precio único que se abona en dos partes: 50% al comenzar y 50% al entregar. Los precios están expresados en pesos argentinos (ARS).',
  },
  {
    question: '¿Mi web queda publicada? ¿Qué pasa con el dominio?',
    answer:
      'Sí. En los tres planes tu página se entrega publicada y lista para compartir. Si querés un dominio propio (como tunegocio.com.ar), lo comprás y renovás vos. En el plan Inicial te asesoramos y la conexión se cotiza aparte; los planes Profesional y Premium incluyen la configuración inicial del dominio propio que nos proporciones. Los servicios externos pagos y las configuraciones extraordinarias se cotizan por separado.',
  },
  {
    question: '¿El diseño se adapta a mi negocio?',
    answer:
      'Sí. Los diseños del catálogo son referencias: podés partir de uno o pedirnos una web personalizada, sin elegir ningún modelo. En ambos casos la adaptamos con tu logo, colores, textos, fotos y datos de contacto, y la cantidad de secciones y el nivel de personalización dependen del plan que elijas.',
  },
  {
    question: '¿Mi web va a aparecer en Google?',
    answer:
      'Publicar la web no es lo mismo que posicionarla. Los planes Profesional y Premium incluyen SEO on-page (títulos, descripciones y etiquetas) para que los buscadores entiendan mejor tu página, pero nadie puede garantizar posiciones, visitas ni ventas: eso depende de los buscadores, de la competencia y del tiempo.',
  },
  {
    question: '¿Hay costos adicionales? ¿Qué no está incluido?',
    answer:
      'Ningún plan incluye tienda online con pagos, carrito de compras, sistema de reservas, panel de administración, automatizaciones avanzadas ni integraciones pagas. Tampoco el dominio, ni el alojamiento pago o los servicios de terceros si tu proyecto los necesita. Todo eso puede sumarse como adicional: te lo informamos y cotizamos antes de contratarlo.',
  },
  {
    question: '¿Cuánto tiempo tarda en estar lista mi web?',
    answer:
      'Depende del plan: aproximadamente 5 días hábiles el Inicial, 7 el Profesional y 12 el Premium. Los plazos comienzan desde la confirmación del anticipo del 50% y la recepción de los materiales necesarios (textos, logo, imágenes y datos de contacto). Si no tenés logo o fotos, te orientamos.',
  },
  {
    question: '¿Puedo pedir cambios?',
    answer:
      'Sí. Durante el desarrollo, todos los planes incluyen una ronda de ajustes sobre la primera versión: reunís tus observaciones y nos las enviás juntas. Cubre cambios de textos, imágenes, colores y detalles visuales dentro de las secciones acordadas; no incluye un rediseño completo, secciones nuevas ni funcionalidades fuera del plan. Los errores de implementación atribuibles a nosotros se corrigen sin costo. Una vez publicada la web, el plan Premium incluye 30 días de soporte post-entrega; las modificaciones posteriores se cotizan aparte.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'ring-1 ring-sky/30' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <span className="text-[10px] font-bold text-chrome-dim tracking-widest shrink-0 mt-1">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-frost font-semibold text-sm sm:text-base leading-snug">
            {faq.question}
          </span>
        </div>
        <div className={`shrink-0 w-7 h-7 rounded-full glass-card flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg className="w-3.5 h-3.5 text-sky" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 pl-[3.25rem] sm:pl-[3.5rem]">
          <p className="text-chrome text-sm font-light leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
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
    <section id="faq" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="reveal lg:sticky lg:top-32">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky mb-3 block">
              Preguntas frecuentes
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight mb-6">
              Todo lo que querías saber antes de consultar.
              <br />
              <span className="font-display italic font-light gradient-text-sky">Sin letra chica.</span>
            </h2>
            <p className="text-chrome text-base font-light leading-relaxed mb-8">
              Si tu pregunta no está acá, dejanos tu consulta en el formulario o escribinos por WhatsApp.
            </p>
            <button
              type="button"
              onClick={handleCTA}
              className="glass-card glow-hover inline-flex items-center gap-2 px-6 py-3 rounded-full text-frost font-semibold text-sm tracking-wide"
            >
              Hacer otra consulta
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Right — accordion */}
          <div className="reveal flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
