import { Reveal } from "./Reveal";
import { ProductShot } from "./ProductShot";

export function PackageDuration() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[#e01414]/30 bg-gradient-to-b from-[#170505] to-[#0a0a0a] p-6 text-center">
            <h2 className="text-xl font-black">
              كم <span className="text-[#ff3b3b]">تكفي العبوة؟</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/70">
              تحتوي العبوة على عدد من الأكياس يكفي معظم المستخدمين لأكثر من
              100 يوم عند الالتزام بطريقة الاستخدام الموصى بها.
            </p>
            <div className="mx-auto mt-5 max-w-[180px]">
              <ProductShot
                src="/product-4.jpg"
                alt="عبوة درع روكلس مفتوحة"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
