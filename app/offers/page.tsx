export default function Offers() {
  const items = [
    ["Family hall", "Book the family hall for 6 or more and ask us about the group tray."],
    ["Catering", "Planning an event? Use the catering calculator for a quick estimate."],
    ["Weekday lunch", "Ask at the counter about weekday lunch specials."],
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl">Offers</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map(([t, d]) => (
          <div key={t} className="card border-dashed p-5"><p className="font-display text-2xl font-bold text-saffron">{t}</p><p className="mt-1 text-cream/75">{d}</p></div>
        ))}
      </div>
    </div>
  );
}
