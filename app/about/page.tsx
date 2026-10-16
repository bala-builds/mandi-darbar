import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
const steps = [
  ["Marinate", "Meat rests overnight in yogurt, garlic and whole spices."],
  ["Pit-steam", "Hung over rice in a sealed pit so the juices drip into every grain."],
  ["Rest", "Left to settle before it reaches the tray, never rushed."],
];
const values = [
  ["Aged basmati", "Long-grain rice aged for a year, so it stays separate and fragrant."],
  ["Fresh meat", "Sourced every morning. We cook what arrived today."],
  ["Slow fire", "A tray takes hours. You can taste them."],
];
export default function About() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Our story</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">From the valleys of Hadramaut to Hyderabad.</h1>
          <p className="mt-5 text-lg text-cream/75">Mandi began as a shepherd's feast: meat hung in a sealed pit above rice, so its juices drip down and perfume every grain. We brought that method to a city that knows its biryani, and gave it our own spice.</p>
        </div>
        <div className="overflow-hidden rounded-3xl"><img src="/img/tray.jpg" alt="A royal family tray of mandi" className="aspect-[4/3] w-full object-cover" /></div>
      </section>
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl">How it is made</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">{steps.map(([t, d], i) => <li key={t}><span className="font-display text-4xl text-saffron">0{i + 1}</span><h3 className="mt-2 font-display text-xl">{t}</h3><p className="mt-1 text-cream/70">{d}</p></li>)}</ol>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4"><img src="/img/fahm.jpg" alt="Fahm mandi" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" /><img src="/img/hummus.jpg" alt="Hummus and sides" loading="lazy" className="mt-8 aspect-square w-full rounded-2xl object-cover" /></div>
        <div>
          <h2 className="font-display text-3xl">What we care about</h2>
          <ul className="mt-6 space-y-5">{values.map(([t, d]) => <li key={t} className="border-l-2 border-saffron pl-4"><p className="font-semibold">{t}</p><p className="text-cream/70">{d}</p></li>)}</ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="card flex flex-col items-start justify-between gap-4 p-8 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl">Join us at the table</h2><p className="text-cream/70">Family hall, floor-seating majlis and outdoor seating.</p></div>
          <div className="flex gap-3"><Link href="/reservations" className="btn btn-gold">Book a table</Link><Link href="/menu" className="btn btn-ghost">View menu</Link></div>
        </div>
      </section>
    </div>
  );
}
