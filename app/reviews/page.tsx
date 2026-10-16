"use client";
import { useState } from "react";
const base = [
  ["Ayesha K.", 5, "The Fahm Mandi is the real deal. Smoky, juicy, and the rice alone is worth the order.", "Thank you Ayesha! See you soon."],
  ["Imran S.", 5, "Booked the majlis seating for 8. Sitting on the floor sharing one tray felt like Yemen in Jubilee Hills.", ""],
  ["Rahul V.", 4, "Delivery in 35 minutes and still piping hot. The zhug is dangerous.", ""],
  ["Fatima Z.", 5, "Kunafa was molten and perfect. Mutton haneeth fell apart at a touch.", "So glad you loved it!"],
  ["Karthik R.", 4, "Great portions. Half mandi easily fed two of us. Wish there was more raita.", "Noted, we added a raita add-on."],
  ["Sana F.", 5, "Best paneer mandi in the city. Finally a veg option that is not an afterthought.", ""],
  ["Vikram R.", 3, "Food was great but waited 20 minutes for our table despite booking.", "Sorry Vikram, we are adding more slots."],
  ["Meera D.", 5, "Ordered the Royal Family Tray for a birthday. Everyone was fighting over the last rib.", ""],
] as const;
export default function Reviews() {
  const [star, setStar] = useState(0);
  const avg = base.reduce((s, r) => s + r[1], 0) / base.length;
  const list = base.filter((r) => !star || r[1] === star);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10"><h1 className="font-display text-4xl">Reviews</h1>
      <div className="card mt-6 flex flex-wrap items-center gap-6 p-5"><div><p className="font-display text-5xl text-saffron">{avg.toFixed(1)}</p><p className="text-saffron" aria-hidden>★★★★★</p><p className="text-xs text-cream/50">{base.length} reviews</p></div>
        <div className="min-w-48 flex-1 space-y-1.5">{[5, 4, 3, 2, 1].map((n) => { const c = base.filter((r) => r[1] === n).length; return <button key={n} onClick={() => setStar(star === n ? 0 : n)} aria-pressed={star === n} className="flex w-full items-center gap-2 text-xs"><span className="w-6">{n}★</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-cream/10"><span className="block h-full bg-saffron" style={{ width: `${(c / base.length) * 100}%` }} /></span><span className="w-4 text-right">{c}</span></button>; })}</div></div>
      <div className="mt-6 space-y-4">{list.map(([n, s, t, r]) => <article key={n} className="card p-5"><p className="text-saffron" aria-label={`${s} stars`}>{"★".repeat(s)}{"☆".repeat(5 - s)}</p><p className="mt-2 text-cream/85">{t}</p><p className="mt-2 text-sm text-cream/50">{n}</p>{r && <p className="mt-3 rounded-lg bg-char p-3 text-sm"><b className="text-saffron">Owner reply:</b> {r}</p>}</article>)}</div></div>
  );
}
