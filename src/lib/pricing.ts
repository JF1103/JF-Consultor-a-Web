// Precios de los planes en pesos argentinos (ARS), precio único por el desarrollo.
// Para actualizar la lista de precios, modificá solo PLAN_PRICES (importes enteros, sin decimales).
export type PlanKey = 'inicial' | 'profesional' | 'premium';

export const CURRENCY = 'ARS';

export const PLAN_PRICES: Record<PlanKey, number> = {
  inicial: 279900,
  profesional: 499900,
  premium: 799900,
};

export const PLAN_LABELS: Record<PlanKey, string> = {
  inicial: 'Inicial',
  profesional: 'Profesional',
  premium: 'Premium',
};

export const PLAN_KEYS: PlanKey[] = ['inicial', 'profesional', 'premium'];

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: CURRENCY,
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// 279900 → "$279.900" (se quita el espacio que agrega Intl entre símbolo e importe)
export const formatPrice = (amount: number) =>
  priceFormatter
    .formatToParts(amount)
    .filter((part) => part.type !== 'literal')
    .map((part) => part.value)
    .join('');

// 279900 → "ARS $279.900", usado en textos de WhatsApp, formulario y Make
export const formatPriceWithCurrency = (amount: number) =>
  `${CURRENCY} ${formatPrice(amount)}`;

// Texto de la opción de plan del formulario, p. ej. "Profesional - ARS $499.900"
export const PLAN_OPTIONS: Record<PlanKey, string> = {
  inicial: `${PLAN_LABELS.inicial} - ${formatPriceWithCurrency(PLAN_PRICES.inicial)}`,
  profesional: `${PLAN_LABELS.profesional} - ${formatPriceWithCurrency(PLAN_PRICES.profesional)}`,
  premium: `${PLAN_LABELS.premium} - ${formatPriceWithCurrency(PLAN_PRICES.premium)}`,
};
