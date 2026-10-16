"use client";
import { useMemo, useState } from "react";
import { dishes, cats, Dish } from "@/data/dishes";
import { DishCard, DishModal } from "@/components/DishCard";
export default function Menu() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [diet, setDiet] = useState<"all" | "veg" | "non">("all");
  const [maxSpice, setMaxSpice] = useState(3); const [best, setBest] = useState(false); const [sort, setSort] = useState("pop"); const [open, setOpen] = useState<Dish | null>(null);
  const list = useMemo(() => {
    let r = dishes.filter((d) => (cat === "All" || d.cat === cat) && (diet === "all" || (diet === "veg") === d.veg) && d.spice <= maxSpice && (!best || d.tags.includes("Bestseller")) && (d.name + d.desc + d.cat).toLowerCase().includes(q.toLowerCase()));
    if (sort === "lo") r = [...r].sort((a, b) => a.portions[0].price - b.portions[0].price);
    if (sort === "hi") r = [...r].sort((a, b) => b.portions[0].price - a.portions[0].price);
    return r;
  }, [q, cat, diet, maxSpice, best, sort]);
  const chip = (on: boolean) => `shrink-0 rounded-full border px-4 py-2 text-sm transition min-h-10 ${on ? "border-saffron bg-saffron text-ink font-semibold" : "border-cream/25 hover:border-saffron"}`;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl md:text-5xl">The menu</h1>
      <p className="mt-2 text-cream/65">{dishes.length} dishes. Browse the full menu and portion prices. Call or book a table to enjoy it.</p>
      <div className="sticky top-16 z-30 -mx-4 mt-6 space-y-3 bg-char/95 px-4 py-3 backdrop-blur">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mandi, kebab, kunafa..." aria-label="Search the menu" className="input" />
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">{["All", ...cats].map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={chip(cat === c)}>{c}</button>)}</div>
        <div className="flex flex-wrap items-center gap-2">
          {([["all", "All"], ["veg", "Veg"], ["non", "Non-veg"]] as const).map(([k, l]) => <button key={k} onClick={() => setDiet(k)} aria-pressed={diet === k} className={chip(diet === k)}>{l}</button>)}
          <button onClick={() => setBest(!best)} aria-pressed={best} className={chip(best)}>Bestsellers</button>
          <label className="flex items-center gap-2 text-sm text-cream/70">Spice ≤ {maxSpice}<input type="range" min={0} max={3} value={maxSpice} onChange={(e) => setMaxSpice(+e.target.value)} className="w-20 accent-[#E8A317]" aria-label="Maximum spice level" /></label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className="input !w-auto"><option value="pop">Popular</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select>
        </div>
      </div>
      {list.length === 0 ? <div className="py-24 text-center text-cream/60"><p className="text-5xl">🔍</p><p className="mt-3">Nothing matches. Try clearing a filter.</p></div> :
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((d) => <DishCard key={d.slug} dish={d} onOpen={setOpen} />)}</div>}
      <DishModal dish={open} onClose={() => setOpen(null)} />
    </div>
  );
}
