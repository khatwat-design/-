export type PackageId = 1 | 2 | 3;

export interface PricingPackage {
  id: PackageId;
  title: string;
  qty: number;
  originalPrice: number;
  price: number;
  discountPercent: number;
  delivery: number;
  total: number;
  savings: number;
  unitPrice: number;
  badge?: string;
  highlight?: boolean;
}

export const UNIT_PRICE = 25000;
const DELIVERY = 5000;

function buildPackage(
  id: PackageId,
  title: string,
  qty: number,
  price: number,
  discountPercent: number,
  extra?: Partial<Pick<PricingPackage, "badge" | "highlight">>
): PricingPackage {
  const originalPrice = qty * UNIT_PRICE;
  return {
    id,
    title,
    qty,
    originalPrice,
    price,
    discountPercent,
    delivery: DELIVERY,
    total: price + DELIVERY,
    savings: originalPrice - price,
    unitPrice: Math.round(price / qty),
    ...extra,
  };
}

export const PACKAGES: PricingPackage[] = [
  buildPackage(1, "علبة واحدة", 1, 25000, 0),
  buildPackage(2, "علبتان", 2, 43000, 14, { badge: "الأكثر طلبًا" }),
  buildPackage(3, "3 علب – العرض الذهبي", 3, 54000, 28, {
    badge: "أفضل قيمة 🔥",
    highlight: true,
  }),
];

export function getPackage(id: number): PricingPackage {
  return PACKAGES.find((p) => p.id === id) ?? PACKAGES[2];
}

export function formatIQD(value: number): string {
  return `${value.toLocaleString("en-US")} د.ع`;
}
