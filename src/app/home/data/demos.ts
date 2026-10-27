import { PLAN_KEYS, PLAN_LABELS, PLAN_OPTIONS, PLAN_PRICES, type PlanKey } from '@/lib/pricing';

export { PLAN_KEYS, type PlanKey };

export interface CatalogPlan {
  key: PlanKey;
  label: string;
  price: number;
  // Debe coincidir con las opciones del formulario de contacto (DownloadSection)
  planOption: string;
}

export interface Demo {
  code: string;
  plan: PlanKey;
  name: string;
  description: string;
  url: string;
  image: string;
}

// Detalle enviado al formulario cuando el visitante elige un diseño
export interface SelectedDesign {
  plan: string;
  planLabel: string;
  code: string;
  name: string;
  price: number;
}

// Precios y textos de plan centralizados en src/lib/pricing.ts
export const PLANS = Object.fromEntries(
  PLAN_KEYS.map((key) => [
    key,
    { key, label: PLAN_LABELS[key], price: PLAN_PRICES[key], planOption: PLAN_OPTIONS[key] },
  ])
) as Record<PlanKey, CatalogPlan>;

const demo = (code: string, plan: PlanKey, name: string, description: string): Demo => {
  const slug = code.toLowerCase();
  return {
    code,
    plan,
    name,
    description,
    url: `https://jf-${slug}.netlify.app/`,
    image: `/assets/demos/${slug}.webp`,
  };
};

export const DEMOS: Demo[] = [
  demo(
    'INICIAL-01',
    'inicial',
    'Estudio Ledesma',
    'Estudio contable e impositivo en CABA. Sobrio, confiable y pensado para recibir consultas.'
  ),
  demo(
    'INICIAL-02',
    'inicial',
    'Masa Madre',
    'Pastelería artesanal en Córdoba. Cálida, con productos destacados y pedidos por WhatsApp.'
  ),
  demo(
    'INICIAL-03',
    'inicial',
    'Nodo Tech',
    'Soporte IT y redes para pymes. Clara, técnica y orientada a servicios.'
  ),
  demo(
    'PROFESIONAL-01',
    'profesional',
    'Atelier Norte',
    'Estudio de arquitectura y diseño interior. Editorial, con proyectos y portfolio.'
  ),
  demo(
    'PROFESIONAL-02',
    'profesional',
    'Alma Bienestar',
    'Centro de estética y bienestar. Suave, con tratamientos, experiencias y contacto directo.'
  ),
  demo(
    'PROFESIONAL-03',
    'profesional',
    'Casa Raíz',
    'Muebles de madera y decoración. Catálogo visual de productos y colecciones.'
  ),
  demo(
    'PREMIUM-01',
    'premium',
    'AUREA',
    'Hotel boutique frente al mar. Experiencia inmersiva, habitaciones y consultas de disponibilidad.'
  ),
  demo(
    'PREMIUM-02',
    'premium',
    'NEXORA',
    'Software, cloud, datos e IA. Corporativa, moderna y de alto impacto.'
  ),
  demo(
    'PREMIUM-03',
    'premium',
    'ORIGEN',
    'Estudio de branding y comunicación. Creativa, editorial y con portfolio.'
  ),
];
