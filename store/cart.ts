"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Line } from "@/lib/pricing";
type S = {
  lines: Line[]; open: boolean; favs: string[];
  add: (l: Omit<Line, "key">) => void; setQty: (key: string, q: number) => void; clear: () => void;
  setOpen: (o: boolean) => void; toggleFav: (slug: string) => void;
};
export const useCart = create<S>()(persist((set) => ({
  lines: [], open: false, favs: [],
  add: (l) => set((s) => {
    const key = [l.slug, l.portion, [...l.addOns].sort().join("+"), l.note].join("|");
    const ex = s.lines.find((x) => x.key === key);
    return { lines: ex ? s.lines.map((x) => x.key === key ? { ...x, qty: x.qty + l.qty } : x) : [...s.lines, { ...l, key }] };
  }),
  setQty: (key, q) => set((s) => ({ lines: q <= 0 ? s.lines.filter((x) => x.key !== key) : s.lines.map((x) => x.key === key ? { ...x, qty: q } : x) })),
  clear: () => set({ lines: [] }),
  setOpen: (open) => set({ open }),
  toggleFav: (slug) => set((s) => ({ favs: s.favs.includes(slug) ? s.favs.filter((f) => f !== slug) : [...s.favs, slug] })),
}), { name: "md-cart", partialize: (s) => ({ lines: s.lines, favs: s.favs }) }));
