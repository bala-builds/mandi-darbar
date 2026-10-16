"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useData, STAGES, Order } from "@/store/orders";
import { dishes } from "@/data/dishes";
import { inr } from "@/lib/format";
import { toast } from "@/components/Toast";
const creds: Record<string, { pw: string; role: "owner" | "staff" }> = { "admin@mandidarbar.demo": { pw: "admin123", role: "owner" }, "staff@mandidarbar.demo": { pw: "staff123", role: "staff" } };
export default function Admin() {
  const [role, setRole] = useState<null | "owner" | "staff">(null); const [ready, setReady] = useState(false);
  useEffect(() => { setRole((sessionStorage.getItem("md-role") as "owner" | "staff") || null); setReady(true); }, []);
  const [email, setEmail] = useState("admin@mandidarbar.demo"); const [pw, setPw] = useState(""); const [err, setErr] = useState("");
  if (!ready) return null;
  if (!role) return (
    <div className="grid min-h-screen place-items-center px-4"><form onSubmit={(e) => { e.preventDefault(); const c = creds[email]; if (c && c.pw === pw) { sessionStorage.setItem("md-role", c.role); setRole(c.role); } else setErr("Wrong email or password."); }} className="card w-full max-w-sm space-y-4 p-6">
      <h1 className="font-display text-3xl font-bold">Owner login</h1><p className="text-sm text-cream/60">Demo: admin@mandidarbar.demo / admin123<br />Staff: staff@mandidarbar.demo / staff123</p>
      <label className="block"><span className="label">Email</span><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="block"><span className="label">Password</span><input type="password" className="input" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
      {err && <p role="alert" className="text-sm text-red-400">{err}</p>}<button className="btn btn-gold w-full">Sign in</button><Link href="/" className="block text-center text-sm text-cream/60">Back to site</Link></form></div>);
  return <Dash role={role} out={() => { sessionStorage.removeItem("md-role"); setRole(null); }} />;
}
function Dash({ role, out }: { role: "owner" | "staff"; out: () => void }) {
  const tabs = role === "owner" ? ["Overview", "Live orders", "Menu", "Reservations", "Enquiries", "Settings"] : ["Live orders", "Reservations"];
  const [tab, setTab] = useState(tabs[0]);
  const d = useData();
  const newCount = d.orders.filter((o) => o.stage === 0 && !o.rejected).length;
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[230px_1fr]">
      <aside className="border-b border-saffron/15 bg-char2 p-3 lg:min-h-screen lg:border-b-0 lg:border-r lg:p-5">
        <div className="mb-3 flex items-center justify-between lg:mb-6 lg:block"><p className="font-display text-xl font-bold">Mandi Darbar</p><span className="text-xs text-cream/50 lg:block">{role === "owner" ? "Owner" : "Staff"} console</span></div>
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} aria-current={tab === t} className={`flex shrink-0 items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm ${tab === t ? "bg-saffron font-semibold text-ink" : "hover:bg-cream/10"}`}>{t}{t === "Live orders" && newCount > 0 && <span className="ml-2 rounded-full bg-copper px-2 text-xs text-white">{newCount}</span>}</button>)}</nav>
        <div className="mt-3 flex gap-2 lg:mt-8 lg:flex-col"><Link href="/" className="btn btn-ghost !min-h-10 !py-1 text-sm">View site</Link><button onClick={out} className="btn btn-ghost !min-h-10 !py-1 text-sm">Sign out</button></div>
      </aside>
      <section className="min-w-0 p-4 lg:p-8">
        {tab === "Overview" && <Overview />}{tab === "Live orders" && <Board />}{tab === "Menu" && <MenuMgr />}{tab === "Reservations" && <Resv />}{tab === "Enquiries" && <Enq />}{tab === "Settings" && <Settings />}
      </section>
    </div>
  );
}
const H = ({ t, children }: { t: string; children?: React.ReactNode }) => <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="font-display text-3xl font-bold">{t}</h1>{children}</div>;
function Overview() {
  const { orders, reservations, soldOut } = useData();
  const today = orders.filter((o) => new Date(o.at).toDateString() === new Date().toDateString() && !o.rejected);
  const rev = today.reduce((s, o) => s + o.totals.total, 0); const all = orders.filter((o) => !o.rejected);
  const aov = all.length ? all.reduce((s, o) => s + o.totals.total, 0) / all.length : 0;
  const days = Array.from({ length: 14 }, (_, i) => { const dt = new Date(Date.now() - (13 - i) * 864e5).toDateString(); return { l: new Date(dt).getDate(), v: all.filter((o) => new Date(o.at).toDateString() === dt).reduce((s, o) => s + o.totals.total, 0) }; });
  const mx = Math.max(1, ...days.map((x) => x.v));
  const counts: Record<string, number> = {}; all.forEach((o) => o.lines.forEach((l) => (counts[l.slug] = (counts[l.slug] || 0) + l.qty)));
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const resToday = reservations.filter((r) => r.date === new Date().toISOString().slice(0, 10)).length;
  return (<><H t="Overview" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Orders today", today.length], ["Revenue today", inr(rev)], ["Avg order", inr(aov)], ["Reservations today", resToday]].map(([k, v]) => <div key={k as string} className="card p-4"><p className="text-xs text-cream/55">{k}</p><p className="mt-1 font-display text-2xl font-bold text-saffron">{v}</p></div>)}</div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3"><div className="card p-5 lg:col-span-2"><h2 className="font-display text-lg">Sales, last 14 days</h2><div className="mt-4 flex h-44 items-stretch gap-1.5" role="img" aria-label="Sales bar chart">{days.map((x, i) => <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1"><div className="flex w-full flex-1 items-end"><div className="w-full rounded-t bg-ink/80" style={{ height: `${(x.v / mx) * 100}%`, minHeight: x.v ? 4 : 1 }} title={inr(x.v)} /></div><span className="text-[10px] text-cream/50">{x.l}</span></div>)}</div></div>
      <div className="card p-5"><h2 className="font-display text-lg">Top dishes</h2><ol className="mt-3 space-y-2 text-sm">{top.map(([s, n]) => <li key={s} className="flex justify-between"><span>{dishes.find((x) => x.slug === s)?.name}</span><b>{n}</b></li>)}</ol>{soldOut.length > 0 && <p className="mt-4 rounded-lg bg-copper/20 p-2 text-xs">⚠ Sold out: {soldOut.length} dishes</p>}</div></div></>);
}
const cols = [["New", [0]], ["Preparing", [1, 2]], ["Out / Ready", [3]], ["Done", [4]]] as const;
function Board() {
  const { orders, advance, reject, addOrder } = useData();
  const kot = (o: Order) => { const w = window.open("", "_blank", "width=320,height=480"); if (!w) return; w.document.write(`<pre style="font:14px monospace">KOT ${o.id}\n${o.type.toUpperCase()}\n----------\n${o.lines.map((l) => `${l.qty} x ${dishes.find((d) => d.slug === l.slug)?.name} (${l.portion})${l.note ? "\n  *" + l.note : ""}`).join("\n")}</pre>`); w.print(); };
  const simulate = () => { const dsh = dishes[Math.floor(Math.random() * 14)]; const p = dsh.portions[0].price; const g = Math.round(p * 0.05); addOrder({ id: "MD" + Math.floor(6000 + Math.random() * 999), at: Date.now(), name: ["Zoya", "Arjun", "Nasreen"][Math.floor(Math.random() * 3)], phone: "9876500000", type: "delivery", address: "Kondapur, Hyderabad", pay: "UPI", lines: [{ key: dsh.slug, slug: dsh.slug, portion: dsh.portions[0].label, qty: 1, addOns: [], note: "" }], totals: { subtotal: p, discount: 0, gst: g, packaging: 20, delivery: 40, tip: 0, total: p + g + 60 }, stage: 0 }); toast("New order received"); };
  const live = orders.filter((o) => !o.rejected && (o.stage < 4 || Date.now() - o.at < 36e5));
  return (<><H t="Live orders"><button onClick={simulate} className="btn btn-gold !py-2">Simulate incoming order</button></H>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cols.map(([name, st]) => { const items = live.filter((o) => (st as readonly number[]).includes(o.stage)); return (
      <div key={name} className="rounded-2xl bg-char2/60 p-3"><p className="mb-3 flex justify-between text-sm font-semibold">{name}<span className="rounded-full bg-cream/10 px-2 text-xs">{items.length}</span></p>
        <div className="space-y-3">{items.length === 0 && <p className="py-6 text-center text-xs text-cream/40">Nothing here</p>}{items.slice(0, 8).map((o) => (
          <div key={o.id} className="card p-3 text-sm"><div className="flex justify-between"><b>{o.id}</b><span className="text-saffron">{inr(o.totals.total)}</span></div><p className="text-cream/60">{o.name} · {o.type}</p><p className="mt-1 text-xs text-cream/50">{o.lines.map((l) => `${l.qty}× ${dishes.find((d) => d.slug === l.slug)?.name}`).join(", ")}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{o.stage < 4 && <button onClick={() => advance(o.id)} className="rounded-full bg-saffron px-3 py-1.5 text-xs font-semibold text-ink">{o.stage === 0 ? "Accept" : `Mark ${STAGES[o.stage + 1]}`}</button>}{o.stage === 0 && <button onClick={() => { const w = prompt("Reason for rejecting?"); if (w) reject(o.id, w); }} className="rounded-full border border-red-400/50 px-3 py-1.5 text-xs text-red-300">Reject</button>}<button onClick={() => kot(o)} className="rounded-full border border-cream/25 px-3 py-1.5 text-xs">KOT</button><Link href={`/order/${o.id}`} className="rounded-full border border-cream/25 px-3 py-1.5 text-xs">Track</Link></div></div>))}</div></div>); })}</div></>);
}
function MenuMgr() {
  const { soldOut, toggleStock } = useData(); const [q, setQ] = useState("");
  return (<><H t="Menu manager"><input className="input !w-64" placeholder="Search dishes" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search dishes" /></H>
    <div className="card divide-y divide-saffron/10">{dishes.filter((x) => x.name.toLowerCase().includes(q.toLowerCase())).map((x) => { const off = soldOut.includes(x.slug); return <div key={x.slug} className="flex items-center gap-3 p-3"><span className="text-2xl">{x.emoji}</span><div className="min-w-0 flex-1"><p className="truncate font-medium">{x.name}</p><p className="text-xs text-cream/50">{x.cat} · from {inr(x.portions[0].price)}</p></div><button role="switch" aria-checked={!off} onClick={() => { toggleStock(x.slug); toast(off ? `${x.name} back in stock` : `${x.name} marked sold out`); }} className={`relative h-7 w-12 shrink-0 rounded-full transition ${off ? "bg-cream/20" : "bg-saffron"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-char transition-all ${off ? "left-1" : "left-6"}`} /><span className="sr-only">In stock</span></button></div>; })}</div></>);
}
function Resv() {
  const { reservations, setRes } = useData();
  return (<><H t="Reservations" /><div className="space-y-3">{reservations.map((r) => <div key={r.id} className="card flex flex-wrap items-center gap-3 p-4"><div className="min-w-0 flex-1"><p className="font-semibold">{r.name} <span className="text-cream/50">· party of {r.size}</span></p><p className="text-sm text-cream/60">{r.date} · {r.slot} · {r.area}{r.note ? ` · ${r.note}` : ""}</p></div><span className={`rounded-full px-3 py-1 text-xs ${r.status === "Confirmed" ? "bg-green-600/30 text-green-300" : r.status === "Pending" ? "bg-saffron/20 text-saffron" : "bg-cream/10"}`}>{r.status}</span>{(["Confirmed", "Declined", "Seated", "No-show"] as const).map((s) => <button key={s} onClick={() => { setRes(r.id, s); toast(`${r.id}: ${s}`); }} className="rounded-full border border-cream/25 px-3 py-1.5 text-xs">{s === "Confirmed" ? "Confirm" : s === "Declined" ? "Decline" : s}</button>)}</div>)}</div></>);
}
function Enq() {
  const { enquiries, setEnq } = useData();
  return (<><H t="Catering enquiries" /><div className="grid gap-4 md:grid-cols-4">{(["New", "Contacted", "Won", "Lost"] as const).map((s) => <div key={s} className="rounded-2xl bg-char2/60 p-3"><p className="mb-2 text-sm font-semibold">{s}</p><div className="space-y-2">{enquiries.filter((e) => e.status === s).map((e) => <div key={e.id} className="card p-3 text-sm"><p className="font-medium">{e.name}</p><p className="text-xs text-cream/60">{e.guests} guests · {e.date}</p><select value={e.status} onChange={(ev) => setEnq(e.id, ev.target.value as typeof s)} aria-label="Status" className="input mt-2 !min-h-9 !py-1 text-xs">{["New", "Contacted", "Won", "Lost"].map((x) => <option key={x}>{x}</option>)}</select></div>)}</div></div>)}</div></>);
}
function Settings() {
  const reset = useData((s) => s.reset);
  return (<><H t="Settings" /><div className="card max-w-xl space-y-4 p-5"><p className="text-cream/70">Brand, hours, tax and delivery zones live in <code>restaurant.config.ts</code>.</p><button onClick={() => { reset(); toast("Demo data reset"); }} className="btn btn-ghost">Reset demo data</button></div></>);
}
