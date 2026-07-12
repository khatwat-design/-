import { Reveal } from "./Reveal";

const stats = [
  { value: "10", suffix: "أيام", label: "حماية من رائحة التعرق" },
  { value: "+100", suffix: "يوم", label: "تكفيها العبوة الواحدة" },
  { value: "8", suffix: "ساعات", label: "فقط قبل أول استحمام" },
  { value: "✓", suffix: "", label: "معتمد من وزارة الصحة" },
];

export function StatsBar() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-black text-[#ff3b3b]">
                  {s.value}
                </span>
                {s.suffix && (
                  <span className="text-sm font-bold text-white/80">
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs leading-5 text-white/60">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
