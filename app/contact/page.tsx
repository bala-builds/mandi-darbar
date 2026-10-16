"use client";
import { useState } from "react";
import Link from "next/link";
import { config } from "@/restaurant.config";
const tel = `tel:${config.phone.replace(/\s/g, "")}`;
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.name + " " + config.address)}`;
const embed = `https://maps.google.com/maps?q=${encodeURIComponent(config.address)}&z=15&output=embed`;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export default function Contact() {
  const [name, setName] = useState(""); const [msg, setMsg] = useState("");
  const wa = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hi, this is ${name || "a guest"}. ${msg}`)}`;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Contact</p>
      <h1 className="mt-3 font-display text-4xl md:text-6xl">Come hungry.<br />We will take care of the rest.</h1>
      <p className="mt-4 max-w-xl text-cream/70">Call us, message on WhatsApp, or drop in. For tables of six or more, please book ahead.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={tel} className="btn btn-gold">Call {config.phone}</a>
        <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost">WhatsApp</a>
        <Link href="/reservations" className="btn btn-ghost">Book a table</Link>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <section className="card p-6"><h2 className="font-display text-xl">Visit</h2><p className="mt-2 text-cream/75">{config.address}</p><a href={maps} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-saffron underline underline-offset-4">Get directions</a></section>
          <section className="card p-6"><h2 className="font-display text-xl">Opening hours</h2><p className="mt-1 text-sm text-cream/60">{config.hours}</p>
            <ul className="mt-3 divide-y divide-black/5 text-sm">{days.map((d) => <li key={d} className="flex justify-between py-2"><span>{d}</span><span className="text-cream/70">12:00 PM - 11:30 PM</span></li>)}</ul></section>
          <section className="card p-6"><h2 className="font-display text-xl">Send a message</h2>
            <label className="mt-3 block"><span className="label">Your name</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
            <label className="mt-3 block"><span className="label">Message</span><textarea className="input" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Table for 6 on Saturday, or a catering question" /></label>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-gold mt-4 w-full">Send on WhatsApp</a></section>
        </div>
        <div className="card overflow-hidden lg:col-span-3">
          <iframe title="Map to Mandi Darbar" src={embed} loading="lazy" className="h-80 w-full border-0 lg:h-full lg:min-h-[560px]" />
        </div>
      </div>
    </div>
  );
}
