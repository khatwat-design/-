import Image from "next/image";

export function ProductShot({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="absolute inset-0 scale-90 rounded-full bg-[radial-gradient(closest-side,rgba(224,20,20,0.35),transparent)] blur-2xl" />
      <div
        className="relative"
        style={{
          maskImage:
            "radial-gradient(ellipse 62% 62% at 50% 50%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 62% at 50% 50%, black 55%, transparent 100%)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1000}
          height={667}
          priority={priority}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
