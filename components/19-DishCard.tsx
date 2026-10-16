"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dish, addOns } from "@/data/dishes";
import { useCart } from "@/store/cart";
import { useData } from "@/store/orders";
import { inr } from "@/lib/format";
import { Plate, Spice, Veg } from "./Plate";
import { toast } from "./Toast";
export function DishCard({ dish, onOpen }: { dish: Dish; onOpen: (d: Dish) => void }) {
  const { add, favs, toggleFav } = useCart();
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
          <button disabled={soldOut} onClick={() => dish.portions.length === 1 ? (add({ slug: dish.slug, portion: dish.portions[0].label, qty: 1, addOns: [], note: "" }), toast(`${dish.name} added`)) : onOpen(dish)} className="btn btn-gold !px-5 !py-2 disabled:opacity-40">{dish.portions.length === 1 ? "Add" : "Choose"}</button>
        </div>
      </div>
    </motion.article>
  );
}
export function DishModal({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const add = useCart((s) => s.add);
  const [portion, setPortion] = useState(0); const [extras, setExtras] = useState<string[]>([]); const [note, setNote] = useState(""); const [qty, setQty] = useState(1);
  const [prev, setPrev] = useState<string | null>(null);
  if (dish && prev !== dish.slug) { setPrev(dish.slug); setPortion(0); setExtras([]); setNote(""); setQty(1); }
  const unit = dish ? dish.portions[portion].price + extras.reduce((s, id) => s + addOns.find((a) => a.id === id)!.price, 0) : 0;
  const canAddons = dish && !["Desserts", "Beverages", "Sides & Breads"].includes(dish.cat);
  return (
    <AnimatePresence>
      {dish && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-label={dish.name} onClick={(e) => e.stopPropagation()} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-char2 md:grid md:max-h-[85vh] md:grid-cols-2 md:flex-none md:rounded-3xl" initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }}>
            <div className="relative h-44 shrink-0 md:h-auto"><Plate dish={dish} size="lg" /><button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-xl">×</button></div>
            <div className="flex min-h-0 flex-col overflow-y-auto p-5">
              <div className="flex items-center gap-2"><Veg veg={dish.veg} /><Spice n={dish.spice} />{dish.tags.map((t) => <span key={t} className="rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase text-ink">{t}</span>)}</div>
              <h3 className="mt-2 font-display text-2xl font-bold">{dish.name}</h3>
              <p className="mt-2 text-sm text-cream/70">{dish.desc}</p>
              {dish.portions.length > 1 && (<fieldset className="mt-4"><legend className="label">Portion</legend><div className="grid grid-cols-3 gap-2">{dish.portions.map((p, i) => <button key={p.label} onClick={() => setPortion(i)} aria-pressed={portion === i} className={`rounded-xl border px-2 py-2 text-sm ${portion === i ? "border-saffron bg-saffron/15 text-saffron" : "border-cream/20"}`}>{p.label}<br /><b>{inr(p.price)}</b></button>)}</div></fieldset>)}
              {canAddons && (<fieldset className="mt-4"><legend className="label">Add-ons</legend>{addOns.map((a) => <label key={a.id} className="flex min-h-11 items-center justify-between text-sm"><span className="flex items-center gap-2"><input type="checkbox" checked={extras.includes(a.id)} onChange={() => setExtras((e) => e.includes(a.id) ? e.filter((x) => x !== a.id) : [...e, a.id])} className="h-4 w-4 accent-[#E8A317]" />{a.name}</span><span className="text-cream/60">+{inr(a.price)}</span></label>)}</fieldset>)}
              <label className="mt-4 block"><span className="label">Special instructions</span><input value={note} onChange={(e) => setNote(e.target.value)} maxLength={80} placeholder="Less spicy, no onions..." className="input" /></label>
              <div className="mt-auto flex items-center gap-3 pt-5">
                <div className="inline-flex items-center rounded-full border border-saffron/40"><button aria-label="Decrease" className="h-11 w-10 text-lg" onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span className="w-6 text-center font-semibold">{qty}</span><button aria-label="Increase" className="h-11 w-10 text-lg" onClick={() => setQty(qty + 1)}>+</button></div>
                <button onClick={() => { add({ slug: dish.slug, portion: dish.portions[portion].label, qty, addOns: extras, note }); toast(`${dish.name} added`); onClose(); }} className="btn btn-gold flex-1">Add · {inr(unit * qty)}</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
