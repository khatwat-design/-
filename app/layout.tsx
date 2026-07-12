import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "درع روكلس | حماية من رائحة التعرق تدوم حتى 10 أيام",
  description:
    "درع روكلس RKS - تقنية متطورة للرجال تقلل التعرق وتحارب رائحة العرق المزعجة. حماية تدوم حتى 10 أيام باستخدام واحد. معتمد من وزارة الصحة في إقليم كردستان - العراق.",
  icons: {
    icon: "/logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans antialiased bg-black text-white">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
