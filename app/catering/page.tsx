"use client";
import { useState } from "react";
import { useData } from "@/store/orders";
import { toast } from "@/components/Toast";
import { inr } from "@/lib/format";
export default function Catering() {
  const add = useData((s) => s.addEnquiry);
  const [g, setG] = useState(20); const [f, setF] = useState({ name: "", phone: "", date: "", note: "" }); const [sent, setSent] = useState(false);
  const trays = Math.ceil(g / 4); const mutton = Math.floor(trays / 3); const chicken = trays - mutton;
  const est = chicken * 1799 / 1 * 0.9 + mutton * 2300;
  return (
    <div className="mx-auto max-w-5xl px-4 py-10"><h1 className="font-display text-4xl">Catering and family trays</h1><p className="mt-2 text-cream/65">One tray feeds about 4. We bring it hot, you bring the people.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="card p-5"><h2 className="font-display text-xl">How many guests?</h2><p className="mt-2 font-display text-5xl text-saffron">{g}</p><input type="range" min={4} max={200} step={2} value={g} onChange={(e) => setG(+e.target.value)} aria-label="Guests" className="mt-3 w-full accent-[#E8A317]" />
          <ul className="mt-4 space-y-1 text-sm"><li>🍗 {chicken} × Chicken mandi tray</li>{mutton > 0 && <li>🍖 {mutton} × Mutton mandi tray</li>}<li>🥗 Salad, raita and dips for {g}</li><li>🍮 Kunafa for the table</li></ul>
          <p className="mt-4 border-t border-saffron/15 pt-3">Estimate <b className="text-saffron">{inr(Math.round(est / 50) * 50)}</b> <span className="text-xs text-cream/50">+ GST, final quote on call</span></p></section>
        <section className="card space-y-3 p-5"><h2 className="font-display text-xl">Send an enquiry</h2>
          {sent ? <p className="py-10 text-center text-lg">✓ Thank you. We will call you within the hour.</p> : <>
            {(["name", "phone", "date", "note"] as const).map((k) => <label key={k} className="block"><span className="label">{{ name: "Name", phone: "Mobile", date: "Event date", note: "Notes" }[k]}</span><input className="input" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} /></label>)}
            <button className="btn btn-gold w-full" onClick={() => { if (!f.name || !/^[6-9]\d{9}$/.test(f.phone)) return toast("Name and a valid mobile number are needed", "err"); add({ id: "EN" + Math.floor(400 + Math.random() * 500), at: Date.now(), ...f, guests: g, status: "New" }); setSent(true); }}>Send enquiry for {g} guests</button></>}
        </section></div></div>
  );
}
