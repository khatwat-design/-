"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "هل يوقف التعرق نهائيًا؟",
    a: "لا، يساعد على تقليل التعرق بشكل ملحوظ ويحد من رائحة العرق، وقد تختلف النتيجة حسب طبيعة الجسم.",
  },
  {
    q: "كم تدوم النتيجة؟",
    a: "قد تصل إلى 10 أيام أو أكثر حسب طبيعة الجسم ومستوى التعرق.",
  },
  {
    q: "هل يجب استخدامه ليلًا؟",
    a: "يفضل استخدامه مساءً، لكن يمكن استخدامه نهارًا أيضًا.",
  },
  {
    q: "هل يجب أن تكون البشرة جافة؟",
    a: "نعم، يجب أن تكون منطقة الإبط جافة تمامًا قبل الاستخدام.",
  },
  {
    q: "هل يمكن الاستحمام مباشرة؟",
    a: "لا، يفضل الانتظار 8 ساعات قبل غسل المنطقة للحصول على أفضل فعالية.",
  },
  {
    q: "هل المنتج معتمد؟",
    a: "نعم، المنتج حاصل على موافقة وزارة الصحة في إقليم كردستان – العراق.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0 text-[#ff3b3b]"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-black">
            الأسئلة <span className="text-[#ff3b3b]">الشائعة</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-2.5">
          {faqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-right"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-white/90">
                      {f.q}
                    </span>
                    <ChevronIcon open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-4 pb-4 text-xs leading-6 text-white/60">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
