import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="روكلس RKS"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
          <span className="text-sm font-extrabold tracking-wide text-white">
            درع <span className="text-[#e01414]">روكلس</span>
          </span>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-[#e01414] px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(224,20,20,0.5)] active:scale-95 transition-transform"
        >
          اطلب الآن
        </Link>
      </div>
    </header>
  );
}
