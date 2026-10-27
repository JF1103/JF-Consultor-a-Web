import React from 'react';

const logos = [
  { name: 'Diseño Web', abbr: 'DISEÑO WEB', color: '#56CCF2' },
  { name: 'Landing Pages', abbr: 'LANDING', color: '#A78BFA' },
  { name: 'Responsive Mobile', abbr: 'MOBILE FIRST', color: '#56CCF2' },
  { name: 'WhatsApp Integrado', abbr: 'WHATSAPP', color: '#22C55E' },
  { name: 'SEO Básico', abbr: 'SEO', color: '#FCD34D' },
  { name: 'Formularios de Contacto', abbr: 'FORMULARIOS', color: '#56CCF2' },
  { name: 'Sitios Rápidos', abbr: 'PERFORMANCE', color: '#A78BFA' },
  { name: 'Hosting y Dominio', abbr: 'HOSTING', color: '#FCD34D' },
  { name: 'Mantenimiento Web', abbr: 'MANTENIMIENTO', color: '#56CCF2' },
  { name: 'Automatizaciones', abbr: 'AUTOMATIZACIÓN', color: '#F7FAFC' },
];

interface LogoBarProps {
  // Solo una cinta expone la lista a lectores de pantalla; el resto es decorativo
  announce?: boolean;
}

// Cinta animada de servicios entre secciones. Movimiento continuo por CSS (funciona aunque falle
// el JS) que se detiene solo con prefers-reduced-motion.
export default function LogoBar({ announce = false }: LogoBarProps) {
  // Dos copias idénticas para el bucle continuo; la segunda (y las cintas decorativas) se ocultan a lectores
  const list = (copy: number) => {
    const hidden = !announce || copy > 0;
    return (
      <ul
        key={copy}
        aria-hidden={hidden ? true : undefined}
        aria-label={hidden ? undefined : 'Servicios de JF Consultoría Web'}
        className="flex items-center gap-12 pr-12 shrink-0"
      >
        {logos.map((logo) => (
          <li key={logo.abbr} className="flex items-center gap-3 shrink-0 group">
            {/* Seal icon */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `${logo.color}18`, border: `1px solid ${logo.color}30` }}
              aria-hidden="true"
            >
              <span className="text-[8px] font-bold" style={{ color: logo.color }}>✦</span>
            </div>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: logo.color, opacity: 0.7 }}
            >
              {logo.abbr}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="services-strip py-3">
      <div className="logo-strip overflow-hidden">
        <div className="services-marquee flex w-max whitespace-nowrap">
          {list(0)}
          {list(1)}
        </div>
      </div>
    </div>
  );
}
