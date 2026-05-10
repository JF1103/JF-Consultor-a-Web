// Número de WhatsApp en formato internacional para Argentina
// Para actualizar el número, modificá NEXT_PUBLIC_WHATSAPP_NUMBER en .env.local (local) y en Netlify (producción)
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491170593618';

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
