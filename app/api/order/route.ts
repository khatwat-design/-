import { NextRequest, NextResponse } from "next/server";
import { getPackage, formatIQD, UNIT_PRICE } from "@/lib/pricing";
import {
  ROCKLIS_CLOUD_API_URL,
  ROCKLIS_CLOUD_PRODUCT_ID,
  ROCKLIS_CLOUD_PAYMENT_METHOD_ID,
  ROCKLIS_CLOUD_SOURCE,
} from "@/lib/rocklisCloud";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { packageId, name, phone, governorate, city, address, notes } = body;

  if (!packageId || !name || !phone || !governorate || !city || !address) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }

  const pkg = getPackage(Number(packageId));

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      {
        error:
          "لم يتم إعداد استقبال الطلبات بعد. الرجاء التواصل معنا مباشرة لإتمام الطلب.",
      },
      { status: 500 }
    );
  }

  const text = [
    "🛒 طلب جديد - درع روكلس",
    "",
    `📦 الباقة: ${pkg.title}`,
    `💰 السعر: ${formatIQD(pkg.price)} + توصيل ${formatIQD(pkg.delivery)} = ${formatIQD(pkg.total)}`,
    "",
    `👤 الاسم: ${name}`,
    `📱 الهاتف: ${phone}`,
    `📍 المحافظة: ${governorate}`,
    `🏙️ المدينة: ${city}`,
    `🏠 العنوان: ${address}`,
    notes ? `📝 ملاحظات: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );

  if (!telegramRes.ok) {
    return NextResponse.json(
      { error: "تعذر إرسال الطلب، حاول مجددًا." },
      { status: 502 }
    );
  }

  // Best-effort sync to the RKS ERP (rocklis.cloud). Never blocks the
  // customer's confirmation — Telegram above is the source of truth.
  try {
    const erpRes = await fetch(ROCKLIS_CLOUD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        items: [
          {
            product_id: ROCKLIS_CLOUD_PRODUCT_ID,
            quantity: pkg.qty,
            price: UNIT_PRICE,
          },
        ],
        shipping_address: {
          name,
          phone,
          address,
          city,
          governorate,
        },
        payment_method: "cash",
        payment_method_id: ROCKLIS_CLOUD_PAYMENT_METHOD_ID,
        subtotal: pkg.originalPrice,
        shipping: pkg.delivery,
        discount: pkg.savings,
        isDiscount: pkg.savings > 0,
        total: pkg.total,
        notes: notes || null,
        source: ROCKLIS_CLOUD_SOURCE,
      }),
    });

    if (!erpRes.ok) {
      const errorBody = await erpRes.text();
      console.error(
        `rocklis.cloud ERP sync failed (${erpRes.status}):`,
        errorBody
      );
    }
  } catch (err) {
    console.error("rocklis.cloud ERP sync failed:", err);
  }

  return NextResponse.json({ ok: true });
}
