import { coupons } from "@/data/dishes";
export default function Offers() {
  return <div className="mx-auto max-w-4xl px-4 py-10"><h1 className="font-display text-4xl">Offers and rewards</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{coupons.map((c) => <div key={c.code} className="card border-dashed p-5"><p className="font-display text-2xl font-bold text-saffron">{c.code}</p><p className="mt-1 text-cream/75">{c.desc}</p></div>)}</div>
    <div className="card mt-8 p-6"><h2 className="font-display text-2xl">Mandi Points</h2><p className="mt-2 text-cream/75">Earn 1 point for every ₹10 you spend. 1 point is worth ₹1 on your next order.</p></div></div>;
}
