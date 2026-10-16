export function Divider() { return <hr aria-hidden className="mx-auto max-w-7xl border-black/10" />; }
export const Heading = ({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) => (
  <div className="mb-8 text-center">
    {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-saffron">{eyebrow}</p>}
    <h2 className="font-display text-3xl font-normal md:text-5xl">{title}</h2>
    {sub && <p className="mx-auto mt-3 max-w-xl text-cream/70">{sub}</p>}
  </div>
);
