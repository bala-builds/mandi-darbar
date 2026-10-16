"use client";
import { Icon } from "./Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { config } from "@/restaurant.config";
const links = [["Menu", "/menu"], ["Reserve", "/reservations"], ["Catering", "/catering"], ["Offers", "/offers"], ["Our story", "/about"], ["Contact", "/contact"]];
export function Header() {
  const path = usePathname();
  const lines = useCart((s) => s.lines); const setOpen = useCart((s) => s.setOpen);
  const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []);
  const count = mounted ? lines.reduce((s, l) => s + l.qty, 0) : 0;
  if (path.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-char/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap" aria-label={config.name + " home"}>
                    <span className="font-display text-lg uppercase tracking-[0.18em] sm:text-xl">{config.name}</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map(([n, h]) => <Link key={h} href={h} className={`text-sm transition hover:text-saffron ${path === h ? "text-saffron" : "text-cream/80"}`}>{n}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="btn btn-ghost relative !px-4" aria-label={`Open cart, ${count} items`}>
            <Icon n="cart" /><span className="hidden sm:inline">Cart</span>
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-xs font-bold text-ink">{count}</span>}
          </button>
          <Link href="/menu" className="btn btn-gold hidden whitespace-nowrap sm:inline-flex">Order now</Link>
        </div>
      </div>
    </header>
  );
}
export function MobileNav() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  const items = [["home", "Home", "/"], ["menu", "Menu", "/menu"], ["cal", "Reserve", "/reservations"], ["tag", "Offers", "/offers"], ["pin", "Contact", "/contact"]] as const;
  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-saffron/20 bg-char/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
      {items.map(([i, n, h]) => (
        <Link key={h} href={h} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] ${path === h ? "text-saffron" : "text-cream/70"}`}><Icon n={i} size={22} />{n}</Link>
      ))}
    </nav>
  );
}
export function Floaters() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <div className="fixed bottom-20 right-4 z-30 flex flex-col gap-3 lg:bottom-6">
      <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-md ring-1 ring-black/10"><Icon n="chat" size={22} /></a>
      <a href={`tel:${config.phone.replace(/\s/g, "")}`} aria-label="Call the restaurant" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-md"><Icon n="phone" size={22} /></a>
    </div>
  );
}
export function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 border-t border-black/10 bg-white pb-28 pt-12 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4">
        <div className="md:col-span-2"><p className="font-display text-2xl font-bold">{config.name}</p><p className="mt-2 max-w-sm text-cream/70">{config.tagline}</p><p className="mt-4 text-sm text-cream/60">{config.address}</p><p className="text-sm text-cream/60">{config.hours}</p></div>
        <div><p className="mb-3 text-sm font-semibold text-saffron">Explore</p><ul className="space-y-2 text-sm text-cream/75">{links.map(([n, h]) => <li key={h}><Link href={h} className="hover:text-saffron">{n}</Link></li>)}</ul></div>
        <div><p className="mb-3 text-sm font-semibold text-saffron">More</p><ul className="space-y-2 text-sm text-cream/75"><li><Link href="/reviews" className="hover:text-saffron">Reviews</Link></li><li><Link href="/gallery" className="hover:text-saffron">Gallery</Link></li><li><Link href="/privacy" className="hover:text-saffron">Privacy</Link></li><li><Link href="/terms" className="hover:text-saffron">Terms</Link></li><li><Link href="/admin" className="hover:text-saffron">Owner login</Link></li></ul></div>
      </div>
      <p className="mt-10 text-center text-xs text-cream/40">Demo website. Payments, OTP and notifications are simulated.</p>
    </footer>
  );
}
