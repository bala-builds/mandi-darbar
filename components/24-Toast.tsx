"use client";
import { useEffect, useState } from "react";
type T = { id: number; msg: string; kind: "ok" | "err" };
let push: (m: string, k?: "ok" | "err") => void = () => {};
export const toast = (m: string, k: "ok" | "err" = "ok") => push(m, k);
export function Toaster() {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => { push = (msg, kind = "ok") => { const id = Date.now() + Math.random(); setItems((s) => [...s, { id, msg, kind }]); setTimeout(() => setItems((s) => s.filter((x) => x.id !== id)), 2600); }; }, []);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex flex-col items-center gap-2 px-4">
      {items.map((t) => <div key={t.id} className={`pointer-events-auto rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl ${t.kind === "ok" ? "bg-saffron text-ink" : "bg-red-600 text-white"}`}>{t.kind === "ok" ? "✓ " : ""}{t.msg}</div>)}
    </div>
  );
}
