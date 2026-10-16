"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { dishes } from "@/data/dishes";
import { computeTotals, lineUnit } from "@/lib/pricing";
import { inr } from "@/lib/format";
import { Plate } from "./Plate";
export function Qty({ q, on }: { q: number; on: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-saffron/40">
      <button aria-label="Decrease" className="h-9 w-9 text-lg" onClick={() => on(q - 1)}>−</button>
      <span className="w-7 text-center text-sm font-semibold" aria-live="polite">{q}</span>
      <button aria-label="Increase" className="h-9 w-9 text-lg" onClick={() => on(q + 1)}>+</button>
    </div>
  );
}
export function CartLines() {
  const { lines, setQty } = useCart();
  return (
    <ul className="space-y-4">
      {lines.map((l) => {
        const d = dishes.find((x) => x.slug === l.slug)!;
        return (
          <li key={l.key} className="flex gap-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl"><Plate dish={d} size="sm" /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{d.name}</p>
              <p className="text-xs text-cream/60">{l.portion}{l.addOns.length ? ` + ${l.addOns.length} add-on` : ""}{l.note ? ` · "${l.note}"` : ""}</p>
              <div className="mt-1 flex items-center justify-between"><Qty q={l.qty} on={(n) => setQty(l.key, n)} /><span className="font-semibold">{inr(lineUnit(l) * l.qty)}</span></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
export function CartDrawer() {
  const { lines, open, setOpen } = useCart();
  const t = computeTotals(lines, { type: "pickup" });
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside role="dialog" aria-label="Your cart" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-char2 shadow-2xl" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}>
            <div className="flex items-center justify-between border-b border-saffron/15 p-4"><h2 className="font-display text-2xl">Your order</h2><button aria-label="Close cart" className="h-10 w-10 text-2xl" onClick={() => setOpen(false)}>×</button></div>
            <div className="flex-1 overflow-y-auto p-4">
              {lines.length === 0 ? <div className="grid h-full place-items-center text-center text-cream/60"><div><p className="text-5xl">🍛</p><p className="mt-3">Your cart is empty.</p><Link href="/menu" onClick={() => setOpen(false)} className="btn btn-gold mt-4">Browse the menu</Link></div></div> : <CartLines />}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-saffron/15 p-4">
                <div className="mb-3 flex justify-between"><span className="text-cream/70">Subtotal</span><span className="font-semibold">{inr(t.subtotal)}</span></div>
                <p className="mb-3 text-xs text-cream/50">GST, packaging and delivery are added at checkout.</p>
                <div className="grid grid-cols-2 gap-2"><Link href="/cart" onClick={() => setOpen(false)} className="btn btn-ghost">View cart</Link><Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-gold">Checkout</Link></div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
