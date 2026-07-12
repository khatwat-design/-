import { Reveal } from "./Reveal";

const audience = [
  {
    title: "من يعاني من رائحة التعرق",
    desc: "حل فعال يمنحك ثقة أكبر طوال اليوم.",
  },
  {
    title: "من يتعرق أثناء العمل أو الرياضة",
    desc: "حماية تستمر معك في أكثر الأوقات نشاطًا.",
  },
  {
    title: "من يبحث عن حماية طويلة الأمد",
    desc: "دون الحاجة لتكرار الاستخدام يوميًا.",
  },
];

export function Audience() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-black">
            مناسب <span className="text-[#ff3b3b]">لمن؟</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-3">
          {audience.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="rounded-xl bg-[#0d0d0d] border border-white/10 p-4">
                <h3 className="text-sm font-bold text-white">{a.title}</h3>
                <p className="mt-1 text-xs leading-6 text-white/60">
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
