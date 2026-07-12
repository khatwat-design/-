"use client";

import Link from "next/link";
import { useCountdown } from "@/lib/useCountdown";

export function StickyMobileCTA() {
  const time = useCountdown();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-md sm:hidden">
      <Link
        href="/checkout"
        className="pulse-cta flex w-full flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#ff2a2a] to-[#c40f0f] py-2.5 leading-tight text-white active:scale-95 transition-transform"
      >
        <span className="text-sm font-extrabold">اطلب درع روكلس الآن</span>
        <span className="text-[11px] font-bold text-white/80">
          ⏱ العرض ينتهي خلال {time}
        </span>
      </Link>
    </div>
  );
}
