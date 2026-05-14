'use client';

import React, { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    question: '¿Cuánto tiempo tarda en estar lista mi web?',
    answer:
      'Depende del plan que elijas: el plan Inicial está listo en aproximadamente 5 días hábiles, el Profesional en 7 días y el Premium en 12 días. Los tiempos arrancan desde que nos enviás toda la información del negocio (textos, logo, imágenes, etc.). Mientras más completa sea la info, más rápido avanzamos.',
  },
  {
    question: '¿Qué necesito tener yo para empezar?',
    answer:
      'Solo necesitás contarnos sobre tu negocio: qué hacés, para quién, qué querés mostrar y cómo querés que te contacten. Si tenés logo e imágenes, mejor; si no, podemos orientarte. No necesitás saber nada de tecnología: nosotros nos encargamos de todo.',
  },
  {
    question: '¿El precio incluye el hosting y el dominio?',
    answer:
      'No. El hosting (el servidor donde vive la web) y el dominio (el nombre como www.tunegocio.com) se contratan por separado. Te ayudamos a elegirlos y configurarlos. Generalmente cuestan entre USD 20 y USD 50 por año en total, dependiendo del proveedor que elijas.',
  },
  {
    question: '¿Puedo pedir cambios después de que esté publicada?',
    answer:
      'Sí. Todos los planes incluyen revisiones durante el proceso de diseño. Una vez publicada, el plan Premium incluye 30 días de soporte post-entrega. Para cambios futuros en cualquier plan, podemos cotizarlos aparte según lo que necesites.',
  },
  {
    question: '¿Cómo se paga? ¿Hay que pagar todo por adelantado?',
    answer:
      'Generalmente se divide en dos partes: un anticipo del 50% al inicio del proyecto y el 50% restante al momento de la entrega. También podemos hablar de otras modalidades según el caso. Los precios en pesos argentinos se calculan según la cotización vigente al momento del pago.',
  },
  {
    question: '¿La web va a funcionar bien en el celular?',
    answer:
      'Sí, siempre. Todos los sitios que desarrollamos son 100% responsive, lo que significa que se adaptan perfectamente a celulares, tablets y computadoras. Más del 70% de las visitas llegan desde el celular, por eso es una prioridad en cada proyecto.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'ring-1 ring-sky-DEFAULT/30' : ''}`}>
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
          <svg className="w-3.5 h-3.5 text-sky-DEFAULT" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="reveal lg:sticky lg:top-32">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-DEFAULT mb-3 block">
              Preguntas frecuentes
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight mb-6">
              Todo lo que querías saber antes de consultar.
              <br />
              <span className="font-display italic font-light gradient-text-sky">Sin letra chica.</span>
            </h2>
            <p className="text-chrome text-base font-light leading-relaxed mb-8">
              Si tu pregunta no está acá, escribinos por WhatsApp y te respondemos enseguida.
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
