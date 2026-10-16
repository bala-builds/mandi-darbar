"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { CartLines } from "@/components/CartDrawer";
import { computeTotals } from "@/lib/pricing";
import { inr } from "@/lib/format";
export default function Cart() {
  const lines = useCart((s) => s.lines);
  const t = computeTotals(lines, { type: "pickup" });
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl">Your cart</h1>
      {lines.length === 0 ? <div className="py-24 text-center text-cream/60"><p className="text-6xl">🍛</p><p className="mt-3">Nothing here yet.</p><Link href="/menu" className="btn btn-gold mt-5">Browse the menu</Link></div> :
        <div className="card mt-6 p-5"><CartLines /><div className="mt-5 flex justify-between border-t border-saffron/15 pt-4 text-lg"><span>Subtotal</span><b>{inr(t.subtotal)}</b></div><Link href="/checkout" className="btn btn-gold mt-4 w-full">Continue to checkout</Link></div>}
    </div>
  );
}
