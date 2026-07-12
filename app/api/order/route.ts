import { NextRequest, NextResponse } from "next/server";
import { getPackage, formatIQD } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { packageId, name, phone, governorate, address, notes } = body;

  if (!packageId || !name || !phone || !governorate || !address) {
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

  return NextResponse.json({ ok: true });
}
