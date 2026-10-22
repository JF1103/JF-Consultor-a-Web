import { NextRequest, NextResponse } from 'next/server';

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

const REVISION_DAYS: Record<PlanKey, string> = {
  inicial: '7 días hábiles',
  profesional: '15 días hábiles',
  premium: '30 días hábiles',
};

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[contact] MAKE_WEBHOOK_URL no configurada');
      return NextResponse.json({ error: 'Webhook no configurado' }, { status: 500 });
    }

    const today = new Date();
    const planKey = detectPlan(body.plan ?? '');
    const deliveryDate = addBusinessDays(today, DELIVERY_DAYS[planKey]);

    const payload = {
      fecha_consulta: formatDateAR(today),
      nombre: body.nombre,
      whatsapp: body.whatsapp,
      email: body.email || '-',
      plan: body.plan,
      mensaje: body.mensaje,
      entrega_estimada: formatDateAR(deliveryDate),
      revision_incluida: REVISION_DAYS[planKey],
      estado: 'Consulta recibida',
      abono_50: 'No',
      abono_100: 'No',
      web_subida: 'No',
    };

    // Opcional: si el webhook de Make está protegido con API Key, se envía en x-make-apikey
    const apiKey = process.env.MAKE_WEBHOOK_API_KEY?.trim();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['x-make-apikey'] = apiKey;

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Webhook respondió con status ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
