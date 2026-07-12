import { Reveal } from "./Reveal";

const steps = [
  "تأكد أن منطقة الإبط نظيفة وجافة تمامًا.",
  "استخدم كيسًا واحدًا للإبطين.",
  "يفضل استخدامه مساءً قبل النوم، ويمكن استخدامه نهارًا عند الحاجة.",
  "لا تغسل المنطقة أو تستحم لمدة 8 ساعات بعد الاستخدام لضمان أفضل نتيجة.",
  "كرر الاستخدام بعد انتهاء مدة الفعالية، والتي قد تصل إلى 10 أيام أو أكثر حسب طبيعة الجسم.",
];

export function UsageSteps() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-black">
            طريقة <span className="text-[#ff3b3b]">الاستخدام</span>
          </h2>
        </Reveal>

        <div className="relative mt-8">
          <div className="absolute right-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#e01414]/60 via-white/15 to-transparent" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e01414]/50 bg-[#150404] text-sm font-black text-[#ff3b3b]">
                    {i + 1}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-white/80">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
