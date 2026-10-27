import React from 'react';

interface GridBackdropProps {
  // Capas intermedias opcionales (por ejemplo, los blobs del hero) entre el degradado y la cuadrícula
  children?: React.ReactNode;
  // Por defecto queda detrás del contenido de una sección con `relative isolate`
  className?: string;
}

// Fondo del hero reutilizable: degradado azul oscuro + cuadrícula cian sutil.
// Es decorativo y ocupa toda la altura real de la sección contenedora.
export default function GridBackdrop({ children, className = '-z-10' }: GridBackdropProps) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-deep via-slate to-slate-deep" />

      {children}

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(86,204,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(86,204,242,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
