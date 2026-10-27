'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { buildWhatsAppUrl } from '@/lib/contact';
import { absoluteTop, headerBarHeight, scrollToSection } from '@/lib/scroll';

export interface NavItem {
  label: string;
  // Sección que activa el ítem durante el scroll
  section: string;
  // Elemento al que se desplaza al hacer clic
  target: string;
}

// También los usa el footer, para que ambos menús lleven a los mismos destinos
export const navItems: NavItem[] = [
  { label: 'Diseños', section: 'curriculum', target: 'catalogo' },
  { label: 'Cómo trabajamos', section: 'how-we-work', target: 'how-we-work' },
  { label: 'Planes', section: 'pricing', target: 'pricing' },
  { label: 'Preguntas frecuentes', section: 'faq', target: 'faq' },
];

// Todas las secciones de la página, en orden, para saber cuál se está viendo
const trackedSections = ['home', 'curriculum', 'how-we-work', 'pricing', 'por-que-elegirnos', 'faq', 'download'];

const whatsappUrl = buildWhatsAppUrl(
  'Hola, vi la web de JF Consultoría Web y quiero hacer una consulta sobre una página web para mi negocio.'
);

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-deep';

// Sección visible: la última cuyo borde superior ya pasó la línea de lectura (30% bajo la barra)
function currentSection() {
  const doc = document.documentElement;
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
    return trackedSections[trackedSections.length - 1];
  }
  const line = window.scrollY + headerBarHeight() + window.innerHeight * 0.3;
  let current = trackedSections[0];
  for (const id of trackedSections) {
    const el = document.getElementById(id);
    if (el && absoluteTop(el) <= line) current = id;
  }
  return current;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollLock = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
      if (!scrollLock.current) setActiveSection(currentSection());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Menú móvil: cerrar con Escape, al tocar fuera o al pasar a escritorio
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const navigateTo = useCallback((target: string, section: string) => {
    setMenuOpen(false);
    if (!document.getElementById(target)) return;

    // Durante el desplazamiento programado se fija el ítem elegido para que no parpadee
    setActiveSection(section);
    scrollLock.current = true;
    let timer = 0;
    const release = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scrollend', release);
      scrollLock.current = false;
      setActiveSection(currentSection());
    };
    window.addEventListener('scrollend', release, { once: true });
    timer = window.setTimeout(release, 1200);

    scrollToSection(target);
  }, []);

  const handleLink = (target: string, section: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(target, section);
  };

  const whatsappIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <header
      ref={headerRef}
      // Fondo opaco siempre (también antes de hidratar): el contenido nunca se ve detrás
      className={`fixed top-0 left-0 right-0 z-50 bg-slate-deep border-b border-frost/5 transition-shadow duration-500 ${
        scrolled || menuOpen ? 'shadow-[0_4px_32px_rgba(0,0,0,0.4)]' : ''
      }`}
    >
      <div
        id="site-header-bar"
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4"
      >
        {/* Logo → Inicio */}
        <a
          href="#home"
          onClick={handleLink('home', 'home')}
          aria-label="JF Consultoría Web, ir al inicio"
          className={`${focusRing} flex items-center gap-3 shrink-0 rounded-lg min-h-[44px]`}
        >
          <AppLogo size={36} text="JF Consultoría Web" className="text-frost" />
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Principal" className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <a
                key={item.section}
                href={`#${item.target}`}
                onClick={handleLink(item.target, item.section)}
                aria-current={isActive ? 'location' : undefined}
                className={`${focusRing} nav-link inline-flex items-center min-h-[44px] rounded text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                  isActive ? 'text-frost active' : 'text-chrome hover:text-frost'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#download"
            onClick={handleLink('download', 'download')}
            className={`${focusRing} btn-primary hidden sm:inline-flex items-center min-h-[44px] px-5 rounded-full text-sm font-semibold text-slate-deep tracking-wide whitespace-nowrap`}
          >
            Pedir presupuesto
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp a JF Consultoría Web (se abre en una pestaña nueva)"
            title="WhatsApp"
            className={`${focusRing} hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full glass-card text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-colors`}
          >
            {whatsappIcon}
          </a>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            className={`${focusRing} lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-chrome hover:text-frost hover:bg-frost/[0.06] transition-colors`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="lg:hidden bg-slate-deep border-t border-frost/10 shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
      >
        <nav aria-label="Principal" className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <a
                key={item.section}
                href={`#${item.target}`}
                onClick={handleLink(item.target, item.section)}
                aria-current={isActive ? 'location' : undefined}
                className={`${focusRing} flex items-center min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'text-frost bg-frost/[0.06] border-l-2 border-periwinkle'
                    : 'text-chrome hover:text-frost hover:bg-frost/[0.04]'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="sm:hidden grid grid-cols-[1fr_auto] gap-2 mt-3">
            <a
              href="#download"
              onClick={handleLink('download', 'download')}
              className={`${focusRing} btn-primary flex items-center justify-center min-h-[48px] px-5 rounded-full text-sm font-semibold text-slate-deep`}
            >
              Pedir presupuesto
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp a JF Consultoría Web (se abre en una pestaña nueva)"
              className={`${focusRing} flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-full glass-card text-[#25D366] text-sm font-semibold`}
            >
              {whatsappIcon}
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
