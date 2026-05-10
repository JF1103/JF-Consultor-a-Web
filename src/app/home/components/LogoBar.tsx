'use client';
import React, { useRef, useEffect } from 'react';

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

export default function LogoBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const speed = 0.4;

    const animate = () => {
      pos -= speed;
      const totalW = track.scrollWidth / 2;
      if (Math.abs(pos) >= totalW) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const allLogos = [...logos, ...logos]; // duplicate for seamless loop

  return (
    <div className="logo-strip overflow-hidden py-5 border-y border-frost/5">
      <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap will-change-transform">
        {allLogos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center gap-3 shrink-0 group"
          >
            {/* Seal icon */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `${logo.color}18`, border: `1px solid ${logo.color}30` }}
            >
              <span className="text-[8px] font-bold" style={{ color: logo.color }}>✦</span>
            </div>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: logo.color, opacity: 0.7 }}
            >
              {logo.abbr}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}