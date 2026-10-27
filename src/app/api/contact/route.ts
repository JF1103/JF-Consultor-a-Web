import { NextRequest, NextResponse } from 'next/server';
import { PLAN_KEYS, PLAN_OPTIONS } from '@/lib/pricing';

type PlanKey = 'inicial' | 'profesional' | 'premium';

function formatDateAR(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}/${date.getFullYear()}`;
}

function detectPlan(plan: string): PlanKey {
  const lower = plan.toLowerCase();
  if (lower.includes('premium')) return 'premium';
  if (lower.includes('profesional')) return 'profesional';
  if (lower.includes('inicial')) return 'inicial';
  return 'profesional';
}

const DELIVERY_DAYS: Record<PlanKey, number> = {
  inicial: 5,
  profesional: 7,
  premium: 12,
};

// Política comercial: los tres planes incluyen una sola ronda de ajustes (columna H de Google Sheets)
const REVISION_INCLUIDA = '1 ronda de ajustes';

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return result;
}

// Límites de cada campo (el formulario ya limita el mensaje a 500; el diseño elegido suma una línea)
const MAX_BODY_BYTES = 8_000;
const MAX_LENGTH = { nombre: 80, whatsapp: 25, email: 120, mensaje: 800 } as const;
const ALLOWED_PLANS = [...PLAN_KEYS.map((key) => PLAN_OPTIONS[key]), 'No estoy seguro'];
const WEBHOOK_TIMEOUT_MS = 8_000;

type ContactData = { nombre: string; whatsapp: string; email: string; plan: string; mensaje: string };

// Quita caracteres de control (salvo saltos de línea) y espacios sobrantes
const clean = (value: unknown) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '').trim() : null;

function validate(body: unknown): { data: ContactData } | { invalid: string[] } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { invalid: ['body'] };
  const raw = body as Record<string, unknown>;
  const nombre = clean(raw.nombre);
  const whatsapp = clean(raw.whatsapp);
  const email = raw.email === undefined ? '' : clean(raw.email);
  const plan = clean(raw.plan);
  const mensaje = clean(raw.mensaje);
  const invalid: string[] = [];

  if (!nombre || nombre.length < 2 || nombre.length > MAX_LENGTH.nombre) invalid.push('nombre');
  const digits = whatsapp?.replace(/\D/g, '') ?? '';
  if (!whatsapp || whatsapp.length > MAX_LENGTH.whatsapp || !/^[+0-9\s\-()]+$/.test(whatsapp) || digits.length < 8 || digits.length > 15)
    invalid.push('whatsapp');
  if (email === null || email.length > MAX_LENGTH.email || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) invalid.push('email');
  if (!plan || !ALLOWED_PLANS.includes(plan)) invalid.push('plan');
  if (!mensaje || mensaje.length > MAX_LENGTH.mensaje) invalid.push('mensaje');

  if (invalid.length) return { invalid };
  return { data: { nombre: nombre!, whatsapp: whatsapp!, email: email!, plan: plan!, mensaje: mensaje! } };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
    }

    const result = validate(parsed);
    if ('invalid' in result) {
      // Solo se registran los nombres de los campos, nunca sus valores
      console.warn('[contact] solicitud rechazada, campos inválidos:', result.invalid.join(','));
      return NextResponse.json({ error: 'Datos inválidos', campos: result.invalid }, { status: 400 });
    }
    const body = result.data;

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[contact] MAKE_WEBHOOK_URL no configurada');
      return NextResponse.json({ error: 'Registro no disponible' }, { status: 503 });
    }

    const today = new Date();
    const planKey = detectPlan(body.plan);
    const deliveryDate = addBusinessDays(today, DELIVERY_DAYS[planKey]);

    const payload = {
      fecha_consulta: formatDateAR(today),
      nombre: body.nombre,
      whatsapp: body.whatsapp,
      email: body.email || '-',
      plan: body.plan,
      mensaje: body.mensaje,
      entrega_estimada: formatDateAR(deliveryDate),
      revision_incluida: REVISION_INCLUIDA,
      estado: 'Consulta recibida',
      abono_50: 'No',
      abono_100: 'No',
      web_subida: 'No',
    };

    // Opcional: si el webhook de Make está protegido con API Key, se envía en x-make-apikey
    const apiKey = process.env.MAKE_WEBHOOK_API_KEY?.trim();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['x-make-apikey'] = apiKey;

    let res: Response;
    try {
      res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      });
    } catch (err) {
      // Sin URL ni datos personales en el log: solo el tipo de falla
      const e = err as Error & { cause?: { code?: string } };
      const timedOut = e.name === 'TimeoutError' || e.name === 'AbortError';
      console.error('[contact] webhook no disponible:', timedOut ? 'timeout' : e.cause?.code ?? e.name);
      return NextResponse.json({ error: 'Registro no disponible' }, { status: timedOut ? 504 : 502 });
    }

    if (!res.ok) {
      // En errores de autenticación se indica si la clave se envió y su largo, nunca su valor
      // y el motivo breve que devuelve Make (no contiene datos del formulario)
      const isAuthError = res.status === 401 || res.status === 403;
      const reason = isAuthError ? (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 120) : '';
      const authInfo = isAuthError
        ? ` (x-make-apikey: ${apiKey ? `enviada, ${apiKey.length} caracteres` : 'NO enviada: MAKE_WEBHOOK_API_KEY vacía o no definida'}; respuesta de Make: "${reason}")`
        : '';
      console.error(`[contact] webhook respondió con status ${res.status}${authInfo}`);
      return NextResponse.json({ error: 'Registro no confirmado' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error interno:', (err as Error)?.name ?? 'desconocido');
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
