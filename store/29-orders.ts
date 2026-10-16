"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Line, Totals } from "@/lib/pricing";
export const STAGES = ["Placed", "Confirmed", "Preparing", "On the way", "Delivered"] as const;
export type Order = { id: string; at: number; name: string; phone: string; type: "delivery" | "pickup" | "dinein"; address: string; table?: string; pay: string; lines: Line[]; totals: Totals; stage: number; rejected?: string };
export type Reservation = { id: string; at: number; name: string; phone: string; date: string; slot: string; size: number; area: string; note: string; status: "Pending" | "Confirmed" | "Declined" | "Seated" | "No-show" };
export type Enquiry = { id: string; at: number; name: string; phone: string; guests: number; date: string; note: string; status: "New" | "Contacted" | "Won" | "Lost" };
type S = {
  orders: Order[]; reservations: Reservation[]; enquiries: Enquiry[]; soldOut: string[];
  addOrder: (o: Order) => void; advance: (id: string) => void; reject: (id: string, why: string) => void;
  addReservation: (r: Reservation) => void; setRes: (id: string, s: Reservation["status"]) => void;
  addEnquiry: (e: Enquiry) => void; setEnq: (id: string, s: Enquiry["status"]) => void;
  toggleStock: (slug: string) => void; reset: () => void;
};
const daysAgo = (d: number, h: number) => Date.now() - d * 864e5 - h * 36e5;
export const seedOrders = (): Order[] => Array.from({ length: 15 }, (_, i) => {
  const slugs = [["chicken-mandi", "Half"], ["mutton-mandi", "Full"], ["paneer-mandi", "Half"], ["royal-family-tray", "Serves 4"], ["alfaham-chicken", "Full"]];
  const [slug, portion] = slugs[i % 5];
  const prices: Record<string, number> = { "chicken-mandi": 449, "mutton-mandi": 1199, "paneer-mandi": 399, "royal-family-tray": 1799, "alfaham-chicken": 619 };
  const sub = prices[slug] * (1 + (i % 2));
  const gst = Math.round(sub * 0.05);
  return { id: "MD" + (4100 + i), at: daysAgo(14 - i, i % 5), name: ["Ayesha K", "Imran S", "Rahul V", "Fatima Z", "Karthik R"][i % 5], phone: "98xxxxxx" + (10 + i), type: i % 3 ? "delivery" : "pickup", address: "Madhapur, Hyderabad", pay: ["UPI", "COD", "Card"][i % 3], lines: [{ key: slug, slug, portion, qty: 1 + (i % 2), addOns: [], note: "" }], totals: { subtotal: sub, discount: 0, gst, packaging: 20, delivery: 0, tip: 0, total: sub + gst + 20 }, stage: 4 };
});
export const seedRes = (): Reservation[] => [
  { id: "RS201", at: daysAgo(1, 0), name: "Imran Shaikh", phone: "9812345670", date: new Date(Date.now() + 864e5).toISOString().slice(0, 10), slot: "8:00 PM", size: 8, area: "Family hall", note: "Birthday", status: "Confirmed" },
  { id: "RS202", at: daysAgo(0, 3), name: "Sana Fathima", phone: "9812345671", date: new Date().toISOString().slice(0, 10), slot: "9:00 PM", size: 4, area: "Floor-seating majlis", note: "", status: "Pending" },
  { id: "RS203", at: daysAgo(0, 2), name: "Vikram Rao", phone: "9812345672", date: new Date().toISOString().slice(0, 10), slot: "7:30 PM", size: 2, area: "Outdoor", note: "Anniversary", status: "Pending" },
];
export const seedEnq = (): Enquiry[] => [
  { id: "EN301", at: daysAgo(2, 0), name: "Techwave HR", phone: "9900011122", guests: 40, date: "Next Friday", note: "Office lunch", status: "New" },
  { id: "EN302", at: daysAgo(3, 0), name: "Meera Reddy", phone: "9900011133", guests: 25, date: "This Sunday", note: "Engagement lunch", status: "Contacted" },
];
export const useData = create<S>()(persist((set) => ({
  orders: seedOrders(), reservations: seedRes(), enquiries: seedEnq(), soldOut: [],
  addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
  advance: (id) => set((s) => ({ orders: s.orders.map((o) => o.id === id && o.stage < 4 ? { ...o, stage: o.stage + 1 } : o) })),
  reject: (id, why) => set((s) => ({ orders: s.orders.map((o) => o.id === id ? { ...o, rejected: why } : o) })),
  addReservation: (r) => set((s) => ({ reservations: [r, ...s.reservations] })),
  setRes: (id, st) => set((s) => ({ reservations: s.reservations.map((r) => r.id === id ? { ...r, status: st } : r) })),
  addEnquiry: (e) => set((s) => ({ enquiries: [e, ...s.enquiries] })),
  setEnq: (id, st) => set((s) => ({ enquiries: s.enquiries.map((e) => e.id === id ? { ...e, status: st } : e) })),
  toggleStock: (slug) => set((s) => ({ soldOut: s.soldOut.includes(slug) ? s.soldOut.filter((x) => x !== slug) : [...s.soldOut, slug] })),
  reset: () => set({ orders: seedOrders(), reservations: seedRes(), enquiries: seedEnq(), soldOut: [] }),
}), { name: "md-data" }));
// cross-tab sync: rehydrate when another tab writes
if (typeof window !== "undefined") window.addEventListener("storage", (e) => { if (e.key === "md-data") useData.persist.rehydrate(); });
