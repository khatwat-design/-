"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PACKAGES, getPackage, formatIQD, type PackageId } from "@/lib/pricing";
import { IRAQ_GOVERNORATES } from "@/lib/governorates";
import { trackPixelEvent } from "./MetaPixel";

type Step = 1 | 2 | 3;
type SubmitStatus = "idle" | "submitting" | "error";

const STEP_LABELS: Record<Step, string> = {
  1: "اختر الكمية",
  2: "بياناتك",
  3: "تم الطلب",
};

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {([1, 2, 3] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              s <= step
                ? "bg-[#e01414] text-white"
                : "bg-white/10 text-white/40"
            }`}
          >
            {s}
          </div>
          <span
            className={`text-[11px] font-bold ${
              s <= step ? "text-white/80" : "text-white/30"
            }`}
          >
            {STEP_LABELS[s]}
          </span>
          {i < 2 && <div className="mx-1 h-px w-4 bg-white/15" />}
        </div>
      ))}
    </div>
  );
}

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const initialId = Number(searchParams.get("pkg")) || 3;

  const [step, setStep] = useState<Step>(1);
  const [selectedId, setSelectedId] = useState<PackageId>(
    (PACKAGES.some((p) => p.id === initialId) ? initialId : 3) as PackageId
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const selectedPackage = getPackage(selectedId);

  useEffect(() => {
    trackPixelEvent("InitiateCheckout", {
      value: selectedPackage.total,
      currency: "IQD",
      content_name: selectedPackage.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToDetails() {
    setStep(2);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !governorate || !city.trim() || !address.trim()) {
      setErrorMsg("الرجاء تعبئة جميع الحقول المطلوبة.");
      return;
    }
    setErrorMsg("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedId,
          name: name.trim(),
          phone: phone.trim(),
          governorate,
          city: city.trim(),
          address: address.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "حدث خطأ أثناء إرسال الطلب.");
        return;
      }

      trackPixelEvent("Purchase", {
        value: selectedPackage.total,
        currency: "IQD",
        content_name: selectedPackage.title,
      });
      setStatus("idle");
      setStep(3);
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    } catch {
      setStatus("error");
      setErrorMsg("تعذر الاتصال بالخادم. تأكد من الإنترنت وحاول مجددًا.");
    }
  }

  if (step === 3) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e01414]/15 text-3xl">
          ✓
        </div>
        <h1 className="mt-4 text-xl font-black">تم استلام طلبك بنجاح</h1>
        <p className="mt-2 text-sm leading-6 text-white/60">
          سنتواصل معك هاتفيًا قريبًا لتأكيد الطلب والتوصيل. شكرًا لثقتك
          بدرع روكلس.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white/90"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-white/50"
      >
        ← العودة للصفحة الرئيسية
      </Link>

      <div className="mt-4 mb-6 flex items-center gap-3">
        <Image
          src="/logo.jpg"
          alt="روكلس RKS"
          width={40}
          height={40}
          className="rounded-md"
        />
        <h1 className="text-xl font-black">إتمام الطلب</h1>
      </div>

      <StepIndicator step={step} />

      {step === 1 && (
        <div>
          <div className="space-y-4">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedId(pkg.id)}
                className={`relative w-full overflow-hidden rounded-2xl border p-5 text-right transition-colors ${
                  selectedId === pkg.id
                    ? "border-[#e01414] bg-gradient-to-b from-[#1a0505] to-[#0d0d0d] shadow-[0_0_30px_rgba(224,20,20,0.25)]"
                    : "border-white/10 bg-[#0d0d0d]"
                }`}
              >
                {pkg.badge && (
                  <span
                    className={`absolute top-0 left-0 rounded-br-xl px-3 py-1 text-[11px] font-bold ${
                      pkg.highlight
                        ? "bg-[#e01414] text-white"
                        : "bg-white/10 text-white/80"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        selectedId === pkg.id
                          ? "border-[#e01414]"
                          : "border-white/25"
                      }`}
                    >
                      {selectedId === pkg.id && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#e01414]" />
                      )}
                    </span>
                    <div>
                      <h3 className="text-base font-extrabold text-white">
                        {pkg.title}
                      </h3>
                      {pkg.discountPercent > 0 && (
                        <p className="mt-0.5 text-xs text-white/40 line-through">
                          {formatIQD(pkg.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-black text-[#ff3b3b]">
                      {formatIQD(pkg.price)}
                    </p>
                    {pkg.discountPercent > 0 && (
                      <p className="text-[11px] font-bold text-green-400">
                        خصم {pkg.discountPercent}%
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-sm">
            <div className="flex justify-between text-white/60">
              <span>سعر المنتج</span>
              <span>{formatIQD(selectedPackage.price)}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-white/60">
              <span>التوصيل</span>
              <span>{formatIQD(selectedPackage.delivery)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-extrabold text-white">
              <span>الإجمالي</span>
              <span>{formatIQD(selectedPackage.total)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={goToDetails}
            className="pulse-cta mt-6 flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#ff2a2a] to-[#c40f0f] px-8 py-4 text-base font-extrabold text-white shadow-[0_10px_30px_rgba(224,20,20,0.35)] active:scale-95 transition-transform"
          >
            التالي: بيانات التوصيل
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mb-4 text-xs font-bold text-white/50"
          >
            ← تعديل الكمية
          </button>

          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-sm">
            <div className="flex justify-between text-white/80">
              <span className="font-bold">{selectedPackage.title}</span>
              <span>{formatIQD(selectedPackage.price)}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-white/60">
              <span>التوصيل</span>
              <span>{formatIQD(selectedPackage.delivery)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-extrabold text-white">
              <span>الإجمالي</span>
              <span>{formatIQD(selectedPackage.total)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/70">
                الاسم الكامل
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#e01414]"
                placeholder="مثال: أحمد محمد"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/70">
                رقم الهاتف
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                required
                dir="ltr"
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#e01414]"
                placeholder="07xxxxxxxxx"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/70">
                المحافظة
              </label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#e01414]"
              >
                <option value="" disabled>
                  اختر المحافظة
                </option>
                {IRAQ_GOVERNORATES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/70">
                المدينة / القضاء
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                required
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#e01414]"
                placeholder="مثال: الكرادة، أبو الخصيب، عنكاوا"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/70">
                العنوان التفصيلي
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                required
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#e01414]"
                placeholder="المنطقة، الشارع، أقرب نقطة دالة"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/70">
                ملاحظات (اختياري)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#e01414]"
              />
            </div>

            {errorMsg && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="pulse-cta flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#ff2a2a] to-[#c40f0f] px-8 py-4 text-base font-extrabold text-white shadow-[0_10px_30px_rgba(224,20,20,0.35)] active:scale-95 transition-transform disabled:opacity-60"
            >
              {status === "submitting"
                ? "جاري إرسال الطلب..."
                : `تأكيد الطلب • ${formatIQD(selectedPackage.total)}`}
            </button>
            <p className="text-center text-[11px] text-white/40">
              الدفع عند الاستلام. سيتصل بك فريقنا لتأكيد الطلب.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
