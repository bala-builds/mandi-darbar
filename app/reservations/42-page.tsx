"use client";
import { useState } from "react";
import { useData } from "@/store/orders";
import { toast } from "@/components/Toast";
const slots = ["12:30 PM", "1:30 PM", "2:30 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];
const CAP = 30;
export default function Reserve() {
  const { reservations, addReservation } = useData();
  const today = new Date().toISOString().slice(0, 10);
  const [f, setF] = useState({ name: "", phone: "", date: today, slot: "", size: 2, area: "Family hall", note: "" });
  const [done, setDone] = useState<string | null>(null); const [err, setErr] = useState("");
  const used = (slot: string) => reservations.filter((r) => r.date === f.date && r.slot === slot && r.status !== "Declined").reduce((s, r) => s + r.size, 0);
  const left = (slot: string) => CAP - used(slot);
  const submit = () => {
    if (!f.name.trim() || !/^[6-9]\d{9}$/.test(f.phone)) return setErr("Enter your name and a valid 10-digit mobile number.");
    if (!f.slot) return setErr("Choose a time slot.");
    if (left(f.slot) < f.size) return setErr("That slot cannot fit your party. Pick another.");
    const id = "RS" + Math.floor(300 + Math.random() * 699);
    addReservation({ id, at: Date.now(), ...f, status: "Pending" }); setDone(id); setErr(""); toast("Table requested");
  };
  const ics = () => { const d = f.date.replace(/-/g, ""); const blob = new Blob([`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Mandi Darbar table for ${f.size}\nDTSTART;VALUE=DATE:${d}\nEND:VEVENT\nEND:VCALENDAR`], { type: "text/calendar" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "reservation.ics"; a.click(); };
  if (done) return <div className="mx-auto max-w-lg px-4 py-24 text-center"><p className="text-6xl">🎉</p><h1 className="mt-3 font-display text-4xl">You're on the list</h1><p className="mt-2 text-cream/70">Booking <b className="text-saffron">{done}</b> for {f.size} on {f.date} at {f.slot}. We will confirm on WhatsApp.</p><button onClick={ics} className="btn btn-gold mt-6">Add to calendar</button></div>;
  return (
    <div className="mx-auto max-w-2xl px-4 py-10"><h1 className="font-display text-4xl">Book a table</h1><p className="mt-2 text-cream/65">Family hall, floor-seating majlis, or outdoors.</p>
      <div className="card mt-6 space-y-5 p-5">
        <div className="grid gap-4 sm:grid-cols-2"><label><span className="label">Name</span><input className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label><label><span className="label">Mobile</span><input className="input" inputMode="numeric" maxLength={10} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
          <label><span className="label">Date</span><input type="date" min={today} className="input" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value, slot: "" })} /></label><label><span className="label">Party size: {f.size}</span><input type="range" min={1} max={20} value={f.size} onChange={(e) => setF({ ...f, size: +e.target.value })} className="mt-3 w-full accent-[#E8A317]" /></label></div>
        <fieldset><legend className="label">Time</legend><div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{slots.map((s) => { const full = left(s) < f.size; return <button key={s} disabled={full} onClick={() => setF({ ...f, slot: s })} aria-pressed={f.slot === s} className={`rounded-xl border px-2 py-2.5 text-sm disabled:opacity-35 ${f.slot === s ? "border-saffron bg-saffron/15 text-saffron" : "border-cream/20"}`}>{s}<br /><span className="text-[10px] text-cream/50">{full ? "Full" : `${left(s)} seats`}</span></button>; })}</div></fieldset>
        <fieldset><legend className="label">Seating</legend><div className="grid gap-2 sm:grid-cols-3">{["Family hall", "Floor-seating majlis", "Outdoor"].map((a) => <button key={a} onClick={() => setF({ ...f, area: a })} aria-pressed={f.area === a} className={`rounded-xl border px-3 py-3 text-sm ${f.area === a ? "border-saffron bg-saffron/15 text-saffron" : "border-cream/20"}`}>{a}</button>)}</div></fieldset>
        <label className="block"><span className="label">Occasion or note (optional)</span><input className="input" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></label>
        {err && <p role="alert" className="text-sm text-red-400">{err}</p>}
        <button onClick={submit} className="btn btn-gold w-full">Request table</button>
      </div></div>
  );
}
