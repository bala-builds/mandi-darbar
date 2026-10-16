import { config } from "@/restaurant.config";
import { coupons, dishes, addOns } from "@/data/dishes";
export type Line = { key: string; slug: string; portion: string; qty: number; addOns: string[]; note: string };
export const lineUnit = (l: Line) => {
  const dish = dishes.find((x) => x.slug === l.slug);
  const base = dish?.portions.find((p) => p.label === l.portion)?.price ?? 0;
  const extra = l.addOns.reduce((s, id) => s + (addOns.find((a) => a.id === id)?.price ?? 0), 0);
  return base + extra;
};
export type Totals = { subtotal: number; discount: number; gst: number; packaging: number; delivery: number; tip: number; total: number; couponError?: string };
export function computeTotals(lines: Line[], opts: { coupon?: string; tip?: number; type: "delivery" | "pickup" | "dinein"; fee?: number; points?: number }): Totals {
  const subtotal = lines.reduce((s, l) => s + lineUnit(l) * l.qty, 0);
  let discount = 0; let couponError: string | undefined;
  if (opts.coupon) {
    const c = coupons.find((x) => x.code === opts.coupon!.trim().toUpperCase());
    if (!c) couponError = "That code is not valid.";
    else if (subtotal < c.min) couponError = `Add ₹${c.min - subtotal} more to use ${c.code}.`;
    else {
      const eligible = "onlyCat" in c && c.onlyCat
        ? lines.filter((l) => dishes.find((d) => d.slug === l.slug)?.cat === c.onlyCat).reduce((s, l) => s + lineUnit(l) * l.qty, 0)
        : subtotal;
      if (eligible === 0) couponError = `${c.code} needs a family platter in your cart.`;
      else if (c.kind === "flat") discount = c.value;
      else discount = Math.min(Math.round((eligible * c.value) / 100), "cap" in c && c.cap ? c.cap : Infinity);
    }
  }
  discount = Math.min(discount + (opts.points ?? 0), subtotal);
  const taxable = subtotal - discount;
  const gst = Math.round((taxable * config.gstPct) / 100);
  const packaging = subtotal > 0 && opts.type !== "dinein" ? config.packaging : 0;
  const delivery = opts.type === "delivery" && subtotal > 0 && subtotal < config.freeDeliveryAbove ? opts.fee ?? 0 : 0;
  const tip = opts.tip ?? 0;
  return { subtotal, discount, gst, packaging, delivery, tip, total: taxable + gst + packaging + delivery + tip, couponError };
}
export const zoneFor = (pin: string) => config.zones.find((z) => z.pin === pin.trim());
