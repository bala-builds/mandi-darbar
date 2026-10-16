"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dish } from "@/data/dishes";
import { useCart } from "@/store/cart";
import { config } from "@/restaurant.config";
import { useData } from "@/store/orders";
import { inr } from "@/lib/format";
import { Plate, Spice, Veg } from "./Plate";
export function DishCard({ dish, onOpen }: { dish: Dish; onOpen: (d: Dish) => void }) {
  const { favs, toggleFav } = useCart();
  const soldOut = useData((s) => s.soldOut.includes(dish.slug));
  const fav = favs.includes(dish.slug);
  const from = Math.min(...dish.portions.map((p) => p.price));
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card group flex flex-col overflow-hidden transition hover:shadow-md">
      <button onClick={() => onOpen(dish)} className="relative aspect-[4/3] overflow-hidden text-left" aria-label={`View ${dish.name}`}>
        <div className={`h-full w-full transition duration-500 group-hover:scale-105 ${soldOut ? "grayscale opacity-50" : ""}`}><Plate dish={dish} /></div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">{dish.tags.map((t) => <span key={t} className="rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">{t}</span>)}</div>
        {soldOut && <span className="absolute inset-0 grid place-items-center bg-black/50 font-semibold">Sold out today</span>}
      </button>
      <button onClick={() => toggleFav(dish.slug)} aria-pressed={fav} aria-label={fav ? "Remove from favourites" : "Add to favourites"} className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-lg"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill={fav ? "#E8622A" : "none"} stroke={fav ? "#E8622A" : "#FFF6E5"} strokeWidth="2"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg></button>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2"><Veg veg={dish.veg} /><Spice n={dish.spice} /></div>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">{dish.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-cream/65">{dish.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p><span className="text-xs text-cream/50">{dish.portions.length > 1 ? "from " : ""}</span><span className="text-lg font-bold text-saffron">{inr(from)}</span></p>
          <button onClick={() => onOpen(dish)} className="btn btn-ghost !px-5 !py-2">View</button>
        </div>
      </div>
    </motion.article>
  );
}
export function DishModal({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const [portion, setPortion] = useState(0);
  const [prev, setPrev] = useState<string | null>(null);
  if (dish && prev !== dish.slug) { setPrev(dish.slug); setPortion(0); }
  const wa = dish ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hi, I would like to know more about ${dish.name}.`)}` : "";
  return (
    <AnimatePresence>
      {dish && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-label={dish.name} onClick={(e) => e.stopPropagation()} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-char2 md:grid md:max-h-[85vh] md:grid-cols-2 md:flex-none md:rounded-3xl" initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }}>
            <div className="relative h-44 shrink-0 md:h-auto"><Plate dish={dish} size="lg" /><button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-xl text-white">×</button></div>
            <div className="flex min-h-0 flex-col overflow-y-auto p-5">
              <div className="flex items-center gap-2"><Veg veg={dish.veg} /><Spice n={dish.spice} />{dish.tags.map((t) => <span key={t} className="rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase text-ink">{t}</span>)}</div>
              <h3 className="mt-2 font-display text-2xl font-bold">{dish.name}</h3>
              <p className="mt-2 text-sm text-cream/70">{dish.desc}</p>
              {dish.portions.length > 1 && (<fieldset className="mt-4"><legend className="label">Portion</legend><div className="grid grid-cols-3 gap-2">{dish.portions.map((p, i) => <button key={p.label} onClick={() => setPortion(i)} aria-pressed={portion === i} className={`rounded-xl border px-2 py-2 text-sm ${portion === i ? "border-saffron bg-saffron/15 text-saffron" : "border-cream/20"}`}>{p.label}<br /><b>{inr(p.price)}</b></button>)}</div></fieldset>)}
              <p className="mt-4 text-2xl font-bold text-saffron">{inr(dish.portions[portion].price)}</p>
              <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                <a href={`tel:${config.phone.replace(/\s/g, "")}`} className="btn btn-gold">Call us</a>
                <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost">WhatsApp</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
