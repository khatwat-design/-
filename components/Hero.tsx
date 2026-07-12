"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProductShot } from "./ProductShot";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-10 px-4">
      <div className="grid-fade absolute inset-0 -z-10" />
      <div className="absolute -top-24 right-1/2 -z-10 h-72 w-72 translate-x-1/2 rounded-full bg-[#e01414]/25 blur-[90px]" />

      <div className="mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#e01414]/40 bg-[#e01414]/10 px-3 py-1.5 text-[11px] font-semibold text-red-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b3b]" />
          معتمد من وزارة الصحة – إقليم كردستان
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="shimmer-text text-5xl font-black leading-tight sm:text-6xl"
        >
          درع روكلس
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-balance text-xl font-bold text-white sm:text-2xl"
        >
          حماية من رائحة التعرق تدوم حتى{" "}
          <span className="text-[#ff3b3b]">10 أيام</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-4 max-w-sm text-balance text-sm leading-7 text-white/70"
        >
          تقنية متطورة للرجال تساعد على تقليل التعرق ومحاربة رائحة العرق
          المزعجة، لتمنحك شعورًا بالثقة والانتعاش لعدة أيام مع استخدام واحد.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-8 max-w-xs"
        >
          <ProductShot
            src="/product-1.jpg"
            alt="عبوة درع روكلس مفتوحة تظهر الأكياس"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-4"
        >
          <Link
            href="/checkout"
            className="pulse-cta inline-flex w-full max-w-xs items-center justify-center rounded-2xl bg-gradient-to-b from-[#ff2a2a] to-[#c40f0f] px-8 py-4 text-base font-extrabold text-white shadow-[0_10px_30px_rgba(224,20,20,0.35)] active:scale-95 transition-transform"
          >
            اطلب الآن وابدأ التغيير
          </Link>
          <p className="mt-3 text-[11px] text-white/45">
            توصيل سريع • دفع عند الاستلام
          </p>
        </motion.div>
      </div>
    </section>
  );
}
