import Link from "next/link";
import { Reveal } from "./Reveal";
import { ProductShot } from "./ProductShot";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(224,20,20,0.18),transparent)]" />
      <div className="mx-auto max-w-lg text-center">
        <Reveal>
          <div className="mx-auto max-w-[220px]">
            <ProductShot src="/product-3.jpg" alt="درع روكلس" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-2xl font-black text-balance">
            جاهز تحس بثقة تدوم <span className="text-[#ff3b3b]">10 أيام؟</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/60">
            استخدام واحد، وحماية تكفيك لفترة طويلة. اطلب الآن قبل نفاد الكمية.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/checkout"
            className="pulse-cta mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-2xl bg-gradient-to-b from-[#ff2a2a] to-[#c40f0f] px-8 py-4 text-base font-extrabold text-white shadow-[0_10px_30px_rgba(224,20,20,0.35)] active:scale-95 transition-transform"
          >
            اطلب درع روكلس الآن
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
