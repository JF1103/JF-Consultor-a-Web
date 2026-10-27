'use client';
import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { navItems } from '@/components/Header';
import { scrollToSection } from '@/lib/scroll';

// Mismos destinos que el navbar
const footerLinks = navItems.map(({ label, target }) => ({ label, target }));

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-deep';

const handleLink = (target: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToSection(target);
};

export default function Footer() {
  return (
    <footer className="border-t border-frost/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Pattern 3 — Vercel Horizontal Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <a
            href="#home"
            onClick={handleLink('home')}
            aria-label="JF Consultoría Web, ir al inicio"
            className={`${focusRing} rounded-lg min-h-[44px] flex items-center`}
          >
            <AppLogo size={32} text="JF Consultoría Web" className="text-frost" />
          </a>

          <nav
            aria-label="Pie de página"
            className="grid grid-cols-2 justify-items-center sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-x-6 gap-y-1 text-sm font-medium text-chrome-dim"
          >
            {footerLinks.map((link, i) => (
              <React.Fragment key={link.target}>
                {i > 0 && <span className="text-slate-light hidden sm:inline" aria-hidden="true">·</span>}
                <a
                  href={`#${link.target}`}
                  onClick={handleLink(link.target)}
                  className={`${focusRing} inline-flex items-center min-h-[44px] rounded hover:text-frost transition-colors`}
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

         <div className="flex items-center gap-4">
  <a
    href="https://www.linkedin.com/in/julian-fernandez-7423a9208/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className={`${focusRing} inline-flex items-center justify-center w-11 h-11 rounded-full text-chrome-dim hover:text-sky transition-colors`}
  >
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.602 0 4.267 2.371 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  </a>
</div>
        </div>

        <div className="mt-8 pt-6 border-t border-frost/5 text-center">
          <p className="text-chrome-dim text-xs tracking-wide">
            © 2026 JF Consultoría Web. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
