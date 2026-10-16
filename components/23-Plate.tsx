import type { Dish } from "@/data/dishes";
import { dishPhoto } from "@/data/photos";
const img: Record<string, string> = {
  "Mandi - Chicken": "chicken", "Mandi - Mutton": "mutton", "Mandi - Seafood": "seafood", "Mandi - Veg": "veg",
  "Family Platters": "platter", "Starters & Grills": "grills", "Sides & Breads": "sides", "Desserts": "desserts", "Beverages": "drinks",
};
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
export function Plate({ dish, size = "md" }: { dish: Pick<Dish, "cat" | "emoji" | "name"> & { slug?: string }; size?: "sm" | "md" | "lg" }) {
  const h = hash(dish.name);
  const x = 20 + (h % 61), y = 25 + ((h >> 3) % 51), z = size === "sm" ? 2.2 : 1.05 + ((h >> 6) % 4) * 0.12;
  return (
    <div role="img" aria-label={dish.name} className="relative h-full w-full overflow-hidden bg-char2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/img/${(dish.slug && dishPhoto[dish.slug]) || img[dish.cat]}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: `${x}% ${y}%`, transform: `scale(${z})` }} />
      
    </div>
  );
}
export const Veg = ({ veg }: { veg: boolean }) => (
  <span title={veg ? "Vegetarian" : "Non-vegetarian"} aria-label={veg ? "Vegetarian" : "Non-vegetarian"} className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border-2 ${veg ? "border-green-500" : "border-red-500"}`}>
    <span className={`h-2 w-2 rounded-full ${veg ? "bg-green-500" : "bg-red-500"}`} />
  </span>
);
export const Spice = ({ n }: { n: number }) => n ? <span aria-label={`Spice level ${n} of 3`} className="inline-flex gap-0.5">{Array.from({ length: 3 }, (_, i) => <svg key={i} width="10" height="14" viewBox="0 0 10 14" aria-hidden><path d="M5 0C5 4 9 6 9 9.5A4 4 0 0 1 1 9.5C1 7 3 6 3 4c1 1 2 1 2-4z" fill={i < n ? "#E8622A" : "#ffffff22"} /></svg>)}</span> : null;
