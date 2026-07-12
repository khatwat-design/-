import { Reveal } from "./Reveal";
import { ProductShot } from "./ProductShot";

export function HowItWorks() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-black">
            كيف <span className="text-[#ff3b3b]">يعمل؟</span>
          </h2>
        </Reveal>

        <div className="mt-7 grid grid-cols-5 items-center gap-3">
          <Reveal delay={0.05} className="col-span-2">
            <ProductShot
              src="/product-2.jpg"
              alt="عبوة درع روكلس مغلقة"
            />
          </Reveal>
          <Reveal delay={0.15} className="col-span-3">
            <p className="text-sm leading-7 text-white/75">
              يتفاعل درع روكلس مع البشرة ليقلل إفراز العرق تدريجيًا ويساعد
              على الحد من الروائح غير المرغوبة، مما يمنحك شعورًا بالنظافة
              والثقة لفترة طويلة.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
