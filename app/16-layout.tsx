import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header, MobileNav, Floaters, Footer } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "@/components/Toast";
import { config } from "@/restaurant.config";
export const metadata: Metadata = { title: `${config.name} | Mandi in ${config.city}`, description: config.tagline, robots: { index: false, follow: false } };
export const viewport: Viewport = { themeColor: "#16120F", width: "device-width", initialScale: 1 };
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-saffron focus:p-3 focus:text-ink">Skip to content</a>
      <Header /><main id="main" className="min-h-[70vh] pb-20 lg:pb-0">{children}</main><Footer /><MobileNav /><Floaters /><CartDrawer /><Toaster />
    </body></html>
  );
}
