'use client';

import React from 'react';

const testimonials = [
  {
    name: 'Mariana P.',
    role: 'Emprendedora · Plan Inicial',
    color: 'from-sky to-periwinkle',
    comment:
      'En menos de una semana tenía mi página online. Mis clientes ahora me encuentran en Google y me escriben directo por WhatsApp. Simple y efectivo.',
  },
  {
    name: 'Lucas R.',
    role: 'Almacén · Plan Profesional',
    color: 'from-cyan-400 to-sky',
    comment:
      'Antes dependíamos solo de redes. Con la web empezamos a recibir consultas de gente que nos encontró buscando en Google. Un cambio real.',
  },
  {
    name: 'Sofía M.',
    role: 'Psicóloga · Plan Profesional',
    color: 'from-periwinkle to-purple-500',
    comment:
      'El diseño quedó muy profesional y ahora puedo compartir el link con nuevos pacientes en vez de explicarles todo desde cero. Me ahorró mucho tiempo.',
  },
  {
    name: 'Martín G.',
    role: 'Servicio técnico · Plan Inicial',
    color: 'from-blue-400 to-indigo-500',
    comment:
      'Tardaron 5 días y quedó exactamente lo que pedí. Rápida, clara y con el botón de WhatsApp bien visible. Empecé a recibir más consultas enseguida.',
  },
  {
    name: 'Carla D.',
    role: 'Fotógrafa · Plan Premium',
    color: 'from-violet-400 to-fuchsia-500',
    comment:
      'Tenía todo disperso entre Instagram y el teléfono. La web me dio una imagen mucho más seria. Varios clientes me dijeron que les generó más confianza.',
  },
  {
    name: 'Nicolás A.',
    role: 'Contador · Plan Profesional',
    color: 'from-sky to-blue-600',
    comment:
      'Trabajo con empresas y necesitaba algo que me represente bien. El resultado es prolijo, profesional y me sirve para presentarme sin decir una palabra.',
  },
  {
    name: 'Valentina S.',
    role: 'Academia de inglés · Plan Profesional',
    color: 'from-cyan-300 to-teal-400',
    comment:
      'Mostramos los cursos, los horarios y el formulario de inscripción todo en un lugar. Desde que salió la web las consultas aumentaron notablemente.',
  },
  {
    name: 'Federico L.',
    role: 'Diseñador gráfico · Plan Inicial',
    color: 'from-indigo-400 to-periwinkle',
    comment:
      'Necesitaba algo rápido y a buen precio para mostrar mi portfolio. En menos de una semana lo tenía online. Ideal para empezar con buen pie.',
  },
  {
    name: 'Paula B.',
    role: 'Tienda de ropa · Plan Profesional',
    color: 'from-sky to-cyan-300',
    comment:
      'Mucho más cómodo que el Instagram para que la gente vea los productos. El proceso fue muy ordenado y el equipo estuvo disponible todo el tiempo.',
  },
  {
    name: 'Diego T.',
    role: 'Empresa de limpieza · Plan Premium',
    color: 'from-purple-400 to-indigo-500',
    comment:
      'Queríamos algo más profesional para cerrar contratos con empresas. El resultado superó lo que esperábamos. Se nota otra categoría.',
  },
  {
    name: 'Romina C.',
    role: 'Centro estético · Plan Profesional',
    color: 'from-pink-400 to-periwinkle',
    comment:
      'Servicios, precios y turno online en un solo lugar. Desde el celular se ve genial. Los clientes la encuentran fácil y ya no tengo que explicar todo por mensaje.',
  },
  {
    name: 'Andrés V.',
    role: 'Electricista · Plan Inicial',
    color: 'from-cyan-400 to-blue-500',
    comment:
      'No esperaba que fuera tan sencillo el proceso. Me pidieron la info, armaron todo y en 5 días estaba publicado. Ahora tengo más llamados de zona.',
  },
];

const row1 = testimonials.slice(0, 6);
const row2 = testimonials.slice(6, 12);

const Stars = () => (
  <div className="flex items-center gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FCD34D">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

function TestimonialCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <article className="glass-card rounded-2xl p-5 flex-shrink-0 flex flex-col justify-between gap-4 w-[260px] sm:w-[300px]">
      <div>
        <Stars />
        <p className="text-chrome text-sm font-light leading-relaxed">
          "{item.comment}"
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-frost/5">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-extrabold shadow-[0_0_16px_rgba(86,204,242,0.2)]`}
        >
          {item.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-frost text-sm font-bold leading-none mb-0.5">{item.name}</h3>
          <p className="text-chrome-dim text-xs">{item.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee-left 38s linear infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .marquee-track-right {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee-right 42s linear infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .marquee-wrap:hover .marquee-track-left,
        .marquee-wrap:hover .marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="section-divider mb-24" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-sky absolute top-[-15%] right-[15%] w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] lg:w-[520px] lg:h-[520px] rounded-full opacity-20" />
        <div className="blob-periwinkle absolute bottom-[-20%] left-[10%] w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-DEFAULT mb-3 block">
              Comentarios
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-frost tracking-tight leading-tight mb-4">
              Opiniones de clientes.
              <br />
              <span className="font-display italic font-light gradient-text-sky">
                Confianza antes del primer clic.
              </span>
            </h2>
          </div>
          <p className="text-chrome text-sm font-light max-w-sm md:text-right">
            Emprendedores, comercios y profesionales que apostaron por tener presencia online y notaron la diferencia.
          </p>
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-3 gap-4 mb-14 max-w-2xl mx-auto">
          {[
            { value: '15+', label: 'Sitios publicados' },
            { value: '5★', label: 'Calificación promedio' },
            { value: '100%', label: 'Clientes satisfechos' },
          ].map((m, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 text-center">
              <div className="text-2xl font-extrabold gradient-text-sky mb-0.5">{m.value}</div>
              <div className="text-chrome-dim text-xs font-light">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee full-bleed */}
      <div
        className="marquee-wrap relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        {/* Row 1 — desliza hacia la izquierda */}
        <div className="overflow-hidden mb-4">
          <div className="marquee-track-left">
            {[...row1, ...row1].map((item, i) => (
              <TestimonialCard key={`r1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 — desliza hacia la derecha */}
        <div className="overflow-hidden">
          <div className="marquee-track-right">
            {[...row2, ...row2].map((item, i) => (
              <TestimonialCard key={`r2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Badge de conteo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mt-12 flex justify-center">
        <div className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky to-periwinkle inline-block" />
          <span className="text-xs font-semibold text-chrome tracking-wider">
            {testimonials.length} clientes comparten su experiencia
          </span>
        </div>
      </div>
    </section>
  );
}
