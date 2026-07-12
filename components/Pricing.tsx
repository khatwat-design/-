import Link from "next/link";
import { PACKAGES, formatIQD } from "@/lib/pricing";
import { Reveal } from "./Reveal";

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white/40">
      <path
        d="M3 7h11v8H3V7Zm11 3h4l3 3v2h-7v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="1.6" fill="currentColor" />
      <circle cx="17" cy="18" r="1.6" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-black text-balance">
            اختار الي يناسب <span className="text-[#ff3b3b]">رجولتك</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-5">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={0.08 + i * 0.08}>
              <Link
                href={`/checkout?pkg=${pkg.id}`}
                className={`group relative block overflow-hidden rounded-3xl border p-5 transition-transform active:scale-[0.98] ${
                  pkg.highlight
                    ? "border-[#e01414] bg-gradient-to-b from-[#1a0505] via-[#120404] to-[#0a0a0a] shadow-[0_0_40px_rgba(224,20,20,0.3)] ring-1 ring-[#e01414]/50"
                    : "border-white/10 bg-[#0d0d0d]"
                }`}
              >
                {pkg.highlight && (
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ff3b3b] to-transparent" />
                )}

                {pkg.badge && (
                  <span
                    className={`absolute top-0 right-0 rounded-bl-2xl px-3.5 py-1.5 text-[11px] font-extrabold ${
                      pkg.highlight
                        ? "bg-[#e01414] text-white"
                        : "bg-white/10 text-white/80"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                )}

                <div className="mt-5 flex items-center gap-2.5">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                      pkg.highlight
                        ? "bg-[#e01414] text-white"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    ×{pkg.qty}
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {pkg.title}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span className="text-3xl font-black text-[#ff3b3b]">
                    {formatIQD(pkg.price)}
                  </span>
                  {pkg.discountPercent > 0 && (
                    <>
                      <span className="text-sm text-white/35 line-through">
                        {formatIQD(pkg.originalPrice)}
                      </span>
                      <span className="rounded-full bg-[#e01414]/15 px-2.5 py-1 text-[11px] font-bold text-red-300">
                        خصم {pkg.discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {pkg.qty > 1 && (
                  <p className="mt-1.5 text-[11px] text-white/40">
                    {formatIQD(pkg.unitPrice)} للعلبة الواحدة
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <TruckIcon />
                    توصيل {formatIQD(pkg.delivery)}
                  </span>
                  <span className="font-extrabold text-white/85">
                    الإجمالي {formatIQD(pkg.total)}
                  </span>
                </div>

                {pkg.savings > 0 && (
                  <div className="mt-3 rounded-xl bg-green-500/10 px-3 py-2 text-center text-xs font-bold text-green-400">
                    🎉 توفّر {formatIQD(pkg.savings)}
                  </div>
                )}

                <div
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-extrabold transition-colors ${
                    pkg.highlight
                      ? "bg-gradient-to-b from-[#ff2a2a] to-[#c40f0f] text-white"
                      : "border border-white/15 text-white/90 group-active:border-[#e01414]/50"
                  }`}
                >
                  اطلب الآن
                  <ArrowIcon />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-4 text-center text-[11px] text-white/40">
            الدفع عند الاستلام • توصيل لجميع محافظات العراق
          </p>
        </Reveal>
      </div>
    </section>
  );
}
