'use client';
import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-frost/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Pattern 3 — Vercel Horizontal Flow */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <AppLogo size={32} text="JF Consultoría Web" iconName="AcademicCapIcon" className="text-sky-DEFAULT" />

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-chrome-dim">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-frost transition-colors cursor-pointer">Inicio</a>
            <span className="text-slate-light hidden sm:inline">·</span>
            <a href="#curriculum" className="hover:text-frost transition-colors">Servicios</a>
            <span className="text-slate-light hidden sm:inline">·</span>
            <a href="#testimonials" className="hover:text-frost transition-colors">Opiniones</a>
            <span className="text-slate-light hidden sm:inline">·</span>
            <a href="#pricing" className="hover:text-frost transition-colors">Planes</a>
            <span className="text-slate-light hidden sm:inline">·</span>
            <a href="#download" className="hover:text-frost transition-colors">Contacto</a>
          </nav>

         <div className="flex items-center gap-4">
  <a
    href="https://www.linkedin.com/in/julian-fernandez-7423a9208/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="text-chrome-dim hover:text-sky-DEFAULT transition-colors"
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