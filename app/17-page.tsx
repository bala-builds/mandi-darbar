"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { dishes, Dish, coupons } from "@/data/dishes";
import { DishCard, DishModal } from "@/components/DishCard";
import { Plate } from "@/components/Plate";
import { Divider, Heading } from "@/components/Divider";
import { config } from "@/restaurant.config";
import { inr } from "@/lib/format";
const reviews = [
  ["Ayesha K.", "The Fahm Mandi is the real deal. Smoky, juicy, and the rice alone is worth the order.", 5],
  ["Imran S.", "Booked the majlis seating for 8. Sitting on the floor, sharing one tray. Felt like Yemen in Jubilee Hills.", 5],
  ["Rahul V.", "Delivery in 35 minutes and still piping hot. The zhug is dangerous.", 4],
] as const;
export default function Home() {
  const [open, setOpen] = useState<Dish | null>(null);
  const sig = dishes.filter((d) => d.tags.includes("Bestseller") || d.tags.includes("Chef's Pick")).slice(0, 8);
  const special = dishes.find((d) => d.slug === "mutton-haneeth")!;
  return (
    <>
      <section className="arabesque relative overflow-hidden">
        
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:py-24 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Hyderabad's Mandi house</p>
            <h1 className="font-display text-5xl font-medium leading-[1.05] md:text-7xl">Slow-cooked.<br />Smoke-kissed.<br />Served royal.</h1>
            <p className="mt-5 max-w-lg text-lg text-cream/75">Basmati steamed in meat stock, whole spices, and meat that falls off the bone. Order online or book a table for the family.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/menu" className="btn btn-gold">Order now</Link><Link href="/reservations" className="btn btn-ghost">Book a table</Link></div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center"><div><dt className="text-xs text-cream/50">Rating</dt><dd className="font-display text-2xl">4.8★</dd></div><div><dt className="text-xs text-cream/50">Delivery</dt><dd className="font-display text-2xl">35 min</dd></div><div><dt className="text-xs text-cream/50">Open</dt><dd className="font-display text-2xl">12 - 11:30</dd></div></dl>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative mx-auto aspect-square w-full max-w-md">
            
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/hero.jpg" alt="Chicken mandi on a copper platter" className="h-full w-full scale-110 object-cover" /></div>
                        <div className="absolute -bottom-4 left-4 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/10"><p className="text-xs text-cream/60">Most ordered</p><p className="font-display font-bold">Chicken Fahm Mandi</p></div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="card flex flex-col items-start gap-4 p-6 md:flex-row md:items-center">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl"><Plate dish={special} /></div>
          <div className="flex-1"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Today's special</p><h2 className="font-display text-2xl font-bold">{special.name}</h2><p className="text-cream/70">{special.desc}</p></div>
          <button onClick={() => setOpen(special)} className="btn btn-gold">Order · from {inr(special.portions[0].price)}</button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Heading eyebrow="Signature dishes" title="What everyone orders" />
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {sig.map((d) => <div key={d.slug} className="w-[78%] shrink-0 snap-start md:w-auto"><DishCard dish={d} onOpen={setOpen} /></div>)}
        </div>
        <div className="mt-8 text-center"><Link href="/menu" className="btn btn-ghost">See the full menu</Link></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20"><Divider />
        <div className="mt-14 grid items-start gap-10 md:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-saffron">The Mandi story</p><h2 className="mt-2 font-display text-4xl">Born in Hadramaut. Perfected in Hyderabad.</h2>
            <p className="mt-4 text-cream/75">Mandi means "dew" in Arabic, for the moisture of meat steamed slowly in a sealed pit. We cook ours the same way, over charcoal, with long-grain basmati and a spice mix we have not changed in years.</p></div>
          <ol className="space-y-3">{[["1", "Marinate", "Meat rests overnight in yogurt, garlic and spice."], ["2", "Pit-steam", "Hung over rice in a sealed pit for hours, dripping flavour."], ["3", "Smoke", "A coal finish gives the signature smoky edge."], ["4", "Serve", "Piled on saffron rice with raisins, almonds and zhug."]].map(([n, t, s]) => <li key={n} className="flex items-center gap-4 border-b border-black/10 py-4"><span className="font-display text-2xl text-saffron">{n}</span><div><p className="font-semibold">{t}</p><p className="text-sm text-cream/60">{s}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Heading eyebrow="Offers" title="Save on your next tray" />
        <div className="grid gap-4 md:grid-cols-3">{coupons.map((c) => <div key={c.code} className="card p-5"><p className="font-display text-2xl text-saffron">{c.code}</p><p className="mt-1 text-cream/75">{c.desc}</p><button onClick={() => navigator.clipboard?.writeText(c.code)} className="mt-3 text-sm underline">Copy code</button></div>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Heading eyebrow="Guests say" title="Loved across Hyderabad" />
        <div className="grid gap-4 md:grid-cols-3">{reviews.map(([n, t, s]) => <figure key={n} className="card p-5"><p className="text-saffron" aria-label={`${s} stars`}>{"★".repeat(s)}{"☆".repeat(5 - s)}</p><blockquote className="mt-2 text-cream/85">"{t}"</blockquote><figcaption className="mt-3 text-sm text-cream/55">{n}</figcaption></figure>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="card grid gap-6 p-6 md:grid-cols-2 md:p-10"><div><h2 className="font-display text-3xl font-bold">Come hungry</h2><p className="mt-3 text-cream/75">{config.address}</p><p className="text-cream/75">{config.hours}</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/reservations" className="btn btn-gold">Reserve a table</Link><Link href="/contact" className="btn btn-ghost">Directions</Link></div></div>
          <div className="arabesque grid min-h-40 place-items-center rounded-2xl bg-char text-center text-cream/60"><div><p className="text-4xl">📍</p><p>Jubilee Hills, Hyderabad</p></div></div></div>
      </section>
      <DishModal dish={open} onClose={() => setOpen(null)} />
    </>
  );
}
