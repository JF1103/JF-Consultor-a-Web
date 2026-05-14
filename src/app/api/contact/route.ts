import { NextRequest, NextResponse } from 'next/server';

const DELIVERY_DAYS: Record<string, number> = {
  'Inicial - USD 180': 5,
  'Profesional - USD 320': 7,
  'Premium - USD 550': 12,
};

const REVISION_DAYS: Record<string, string> = {
  'Inicial - USD 180': '-',
  'Profesional - USD 320': '-',
  'Premium - USD 550': '30 días',
};

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
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
    const deliveryDays = DELIVERY_DAYS[body.plan] ?? 7;
    const deliveryDate = addBusinessDays(today, deliveryDays);

    const payload = {
      fecha_consulta: today.toLocaleDateString('es-AR'),
      nombre: body.nombre,
      whatsapp: body.whatsapp,
      email: body.email || '-',
      plan: body.plan,
      mensaje: body.mensaje,
      entrega_estimada: deliveryDate.toLocaleDateString('es-AR'),
      revision_incluida: REVISION_DAYS[body.plan] ?? '-',
      // columnas de seguimiento — Make.com las enviará vacías para completar manualmente
      abono_50: '',
      abono_100: '',
      web_subida: '',
      estado: 'Consulta recibida',
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
