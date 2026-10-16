import { describe, it, expect } from "vitest";
import { computeTotals, Line } from "./pricing";
const l = (slug: string, portion: string, qty = 1): Line => ({ key: slug, slug, portion, qty, addOns: [], note: "" });
describe("pricing", () => {
  it("gst 5% and packaging", () => {
    const t = computeTotals([l("chicken-mandi", "Half")], { type: "pickup" });
    expect(t.subtotal).toBe(449); expect(t.gst).toBe(22); expect(t.packaging).toBe(20); expect(t.total).toBe(491);
  });
  it("MANDI20 capped at 200", () => {
    const t = computeTotals([l("mutton-mandi", "Full", 2)], { type: "pickup", coupon: "MANDI20" });
    expect(t.discount).toBe(200);
  });
  it("MANDI20 minimum", () => {
    const t = computeTotals([l("chicken-mandi", "Quarter")], { type: "pickup", coupon: "MANDI20" });
    expect(t.discount).toBe(0); expect(t.couponError).toMatch(/more/);
  });
  it("FAMILY15 only on platters", () => {
    const t = computeTotals([l("chicken-mandi", "Full")], { type: "pickup", coupon: "FAMILY15" });
    expect(t.couponError).toBeTruthy();
  });
  it("delivery fee waived above threshold", () => {
    expect(computeTotals([l("mutton-mandi", "Full")], { type: "delivery", fee: 40 }).delivery).toBe(0);
    expect(computeTotals([l("chicken-mandi", "Half")], { type: "delivery", fee: 40 }).delivery).toBe(40);
  });
});
