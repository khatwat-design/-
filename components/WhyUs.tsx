import { Reveal } from "./Reveal";

const points = [
  "حماية من رائحة التعرق تدوم حتى 10 أيام",
  "يساعد على تقليل التعرق بشكل ملحوظ",
  "استخدام واحد يكفي لعدة أيام",
  "عبوة تكفي لأكثر من 100 يوم لمعظم المستخدمين",
  "معتمد من وزارة الصحة في إقليم كردستان – العراق",
  "مناسب للاستخدام اليومي",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0 text-[#ff3b3b]"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhyUs() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-black">
            لماذا <span className="text-[#ff3b3b]">درع روكلس؟</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-3">
          {points.map((p, i) => (
            <Reveal key={p} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] p-3.5">
                <CheckIcon />
                <p className="text-sm leading-6 text-white/85">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-4 text-center text-[11px] text-white/40">
            * قد تختلف مدة الفعالية من شخص لآخر
          </p>
        </Reveal>
      </div>
    </section>
  );
}
