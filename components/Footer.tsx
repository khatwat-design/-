import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 pb-24 sm:pb-8">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center">
        <Image
          src="/logo.jpg"
          alt="روكلس RKS"
          width={40}
          height={40}
          className="rounded-md opacity-90"
        />
        <p className="text-[11px] leading-6 text-white/40">
          معتمد من وزارة الصحة في إقليم كردستان – العراق. قد تختلف مدة
          الفعالية من شخص لآخر حسب طبيعة الجسم.
        </p>
        <p className="text-[11px] text-white/30">
          © {new Date().getFullYear()} RKS روكلس. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
