"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useData, STAGES } from "@/store/orders";
import { dishes } from "@/data/dishes";
import { inr } from "@/lib/format";
import { config } from "@/restaurant.config";
export default function Track() {
  const { id } = useParams<{ id: string }>();
  const order = useData((s) => s.orders.find((o) => o.id === id)); const advance = useData((s) => s.advance);
  const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto || !order || order.stage >= 4 || order.rejected) return; const t = setTimeout(() => advance(order.id), 8000); return () => clearTimeout(t); }, [auto, order, advance]);
  const [ready, setReady] = useState(false); useEffect(() => setReady(true), []);
  if (!ready) return null;
  if (!order) return <div className="py-32 text-center"><p className="text-5xl">🤔</p><p className="mt-3 text-cream/70">We could not find order {id}.</p><Link href="/menu" className="btn btn-gold mt-5">Back to the menu</Link></div>;
  const stages = order.type === "pickup" ? ["Placed", "Confirmed", "Preparing", "Ready for pickup", "Picked up"] : order.type === "dinein" ? ["Placed", "Confirmed", "Preparing", "Ready", "Served"] : STAGES;
  const eta = order.stage >= 4 ? "Done" : `${Math.max(5, (4 - order.stage) * 9)} min`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`I ordered from ${config.name}. Order ${order.id}, total ${inr(order.totals.total)}.`)}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center"><p className="text-5xl">{order.rejected ? "😔" : order.stage >= 4 ? "🎉" : "🍛"}</p><h1 className="mt-2 font-display text-4xl font-bold">{order.rejected ? "Order declined" : order.stage >= 4 ? "Enjoy your meal" : "Order placed"}</h1><p className="text-cream/65">Order <b className="text-saffron">{order.id}</b> · ETA {eta}</p></div>
      {order.rejected ? <p className="card mt-6 p-5 text-center">The kitchen could not take this order: {order.rejected}</p> :
        <ol className="card mt-8 p-6">{stages.map((s, i) => <li key={s} className="flex gap-4"><div className="flex flex-col items-center"><span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${i <= order.stage ? "bg-saffron text-ink" : "border border-cream/25 text-cream/40"}`}>{i < order.stage ? "✓" : i + 1}</span>{i < stages.length - 1 && <span className={`h-8 w-0.5 ${i < order.stage ? "bg-saffron" : "bg-cream/15"}`} />}</div><p className={`pt-1 ${i <= order.stage ? "font-semibold" : "text-cream/45"}`}>{s}{i === order.stage && order.stage < 4 && <span className="ml-2 animate-pulse text-xs text-saffron">now</span>}</p></li>)}</ol>}
      <div className="card mt-6 p-5"><h2 className="font-display text-xl">Summary</h2><ul className="mt-3 space-y-1 text-sm">{order.lines.map((l) => <li key={l.key}>{l.qty} × {dishes.find((d) => d.slug === l.slug)?.name} ({l.portion})</li>)}</ul><p className="mt-3 flex justify-between border-t border-saffron/15 pt-3 font-bold"><span>Total ({order.pay})</span><span className="text-saffron">{inr(order.totals.total)}</span></p>{order.address && <p className="mt-2 text-sm text-cream/60">Delivering to {order.address}</p>}</div>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost">Share on WhatsApp</a><button onClick={() => window.print()} className="btn btn-ghost">Download invoice</button><Link href="/menu" className="btn btn-gold">Reorder</Link></div>
      <label className="mt-6 flex items-center justify-center gap-2 text-xs text-cream/50"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="accent-[#E8A317]" />Demo mode: auto-advance status every 8s (or advance from the admin board)</label>
    </div>
  );
}
