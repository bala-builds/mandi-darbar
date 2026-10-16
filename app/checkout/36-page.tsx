"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { useData } from "@/store/orders";
import { computeTotals, zoneFor } from "@/lib/pricing";
import { inr } from "@/lib/format";
import { config } from "@/restaurant.config";
import { dishes } from "@/data/dishes";
import { toast } from "@/components/Toast";
export default function Checkout() {
  const router = useRouter();
  const { lines, clear } = useCart(); const addOrder = useData((s) => s.addOrder);
  const [type, setType] = useState<"delivery" | "pickup" | "dinein">("delivery");
  const [f, setF] = useState({ name: "", phone: "", address: "", pin: "", table: "" });
  const [coupon, setCoupon] = useState(""); const [applied, setApplied] = useState(""); const [tip, setTip] = useState(0);
  const [pay, setPay] = useState("UPI"); const [paid, setPaid] = useState(false); const [errs, setErrs] = useState<Record<string, string>>({});
  const zone = zoneFor(f.pin);
  const t = computeTotals(lines, { type, coupon: applied, tip, fee: zone?.fee });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const upd = (k: string) => errs[k] ? <p role="alert" className="mt-1 text-xs text-red-400">{errs[k]}</p> : null;
  if (lines.length === 0) return <div className="py-32 text-center"><p className="text-6xl">🍛</p><p className="mt-3 text-cream/70">Your cart is empty.</p><Link href="/menu" className="btn btn-gold mt-5">Browse the menu</Link></div>;
  const place = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Enter your name.";
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number.";
    if (type === "delivery") { if (f.address.trim().length < 8) e.address = "Enter your full delivery address."; if (!zone) e.pin = "We do not deliver to this pincode yet."; else if (t.subtotal < zone.min) e.pin = `Minimum order for ${zone.area} is ${inr(zone.min)}.`; }
    if (type === "dinein" && !f.table) e.table = "Enter your table number.";
    if (pay === "UPI" && !paid) e.pay = "Scan the QR and tap 'I've paid'.";
    setErrs(e); if (Object.keys(e).length) { toast("Please fix the highlighted fields", "err"); return; }
    const id = "MD" + Math.floor(5000 + Math.random() * 4999);
    addOrder({ id, at: Date.now(), name: f.name, phone: f.phone, type, address: type === "delivery" ? `${f.address}, ${zone!.area} ${f.pin}` : "", table: f.table, pay, lines, totals: t, stage: 0 });
    clear(); router.push(`/order/${id}?new=1`);
  };
  const seg = (v: typeof type, l: string) => <button key={v} onClick={() => setType(v)} aria-pressed={type === v} className={`flex-1 rounded-xl border px-3 py-3 text-sm ${type === v ? "border-saffron bg-saffron/15 text-saffron font-semibold" : "border-cream/20"}`}>{l}</button>;
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <h1 className="font-display text-4xl">Checkout</h1>
        <section className="card space-y-4 p-5"><h2 className="font-display text-xl">How would you like it?</h2><div className="flex gap-2">{seg("delivery", "Delivery")}{seg("pickup", "Pickup")}{seg("dinein", "Dine-in")}</div>
          <div className="grid gap-4 sm:grid-cols-2"><label><span className="label">Name</span><input className="input" value={f.name} onChange={set("name")} autoComplete="name" />{upd("name")}</label><label><span className="label">Mobile number</span><input className="input" inputMode="numeric" maxLength={10} value={f.phone} onChange={set("phone")} autoComplete="tel" />{upd("phone")}</label></div>
          {type === "delivery" && <><label className="block"><span className="label">Delivery address</span><textarea className="input" rows={2} value={f.address} onChange={set("address")} autoComplete="street-address" />{upd("address")}</label>
            <label className="block"><span className="label">Pincode (try 500081, 500034)</span><input className="input" inputMode="numeric" maxLength={6} value={f.pin} onChange={set("pin")} />{zone && <p className="mt-1 text-xs text-green-400">✓ {zone.area}: delivery {inr(zone.fee)}, minimum {inr(zone.min)}</p>}{upd("pin")}</label></>}
          {type === "dinein" && <label className="block"><span className="label">Table number</span><input className="input" value={f.table} onChange={set("table")} />{upd("table")}</label>}
        </section>
        <section className="card space-y-4 p-5"><h2 className="font-display text-xl">Payment (simulated)</h2><div className="flex gap-2">{["UPI", "Card", "COD"].map((p) => <button key={p} onClick={() => setPay(p)} aria-pressed={pay === p} className={`flex-1 rounded-xl border px-3 py-3 text-sm ${pay === p ? "border-saffron bg-saffron/15 text-saffron font-semibold" : "border-cream/20"}`}>{p === "COD" ? "Cash on delivery" : p}</button>)}</div>
          {pay === "UPI" && <div className="flex items-center gap-4"><div aria-label="Demo QR code" className="grid h-28 w-28 shrink-0 grid-cols-8 gap-px rounded-lg bg-white p-2">{Array.from({ length: 64 }, (_, i) => <span key={i} className={((i * 7 + (i >> 3) * 3) % 5 < 2 || [0,1,8,9,6,7,14,15,48,49,56,57].includes(i)) ? "bg-black" : "bg-white"} />)}</div><div><p className="text-sm text-cream/70">Scan with any UPI app (demo only), then confirm.</p><button onClick={() => setPaid(true)} className={`btn mt-2 ${paid ? "btn-ghost" : "btn-gold"}`}>{paid ? "✓ Payment marked" : "I've paid"}</button>{upd("pay")}</div></div>}
          {pay === "Card" && <p className="rounded-xl bg-char p-3 text-sm text-cream/70">Test card 4242 4242 4242 4242 will be accepted in this demo.</p>}
          {pay === "COD" && <p className="rounded-xl bg-char p-3 text-sm text-cream/70">Pay in cash when your order arrives.</p>}
        </section>
      </div>
      <aside className="card h-fit space-y-4 p-5 lg:sticky lg:top-24"><h2 className="font-display text-xl">Order summary</h2>
        <ul className="space-y-1.5 text-sm">{lines.map((l) => <li key={l.key} className="flex justify-between gap-2"><span>{l.qty} × {dishes.find((d) => d.slug === l.slug)!.name} <span className="text-cream/50">({l.portion})</span></span></li>)}</ul>
        <div className="flex gap-2"><input className="input" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} aria-label="Coupon code" /><button className="btn btn-ghost" onClick={() => setApplied(coupon)}>Apply</button></div>
        {applied && (t.couponError ? <p role="alert" className="text-xs text-red-400">{t.couponError}</p> : <p className="text-xs text-green-400">✓ {applied.toUpperCase()} applied</p>)}
        <div className="flex items-center gap-2 text-sm"><span className="text-cream/60">Tip</span>{[0, 20, 50].map((v) => <button key={v} onClick={() => setTip(v)} aria-pressed={tip === v} className={`rounded-full border px-3 py-1 ${tip === v ? "border-saffron text-saffron" : "border-cream/20"}`}>{v ? inr(v) : "None"}</button>)}</div>
        <dl className="space-y-1.5 border-t border-saffron/15 pt-3 text-sm">{([["Subtotal", t.subtotal], ["Discount", -t.discount], [`GST ${config.gstPct}%`, t.gst], ["Packaging", t.packaging], ["Delivery", t.delivery], ["Tip", t.tip]] as const).filter(([, v]) => v !== 0).map(([k, v]) => <div key={k} className="flex justify-between"><dt className="text-cream/65">{k}</dt><dd>{v < 0 ? "-" : ""}{inr(Math.abs(v))}</dd></div>)}<div className="flex justify-between border-t border-saffron/15 pt-3 text-lg font-bold"><dt>Total</dt><dd className="text-saffron">{inr(t.total)}</dd></div></dl>
        <button onClick={place} className="btn btn-gold w-full">Place order · {inr(t.total)}</button>
      </aside>
    </div>
  );
}
