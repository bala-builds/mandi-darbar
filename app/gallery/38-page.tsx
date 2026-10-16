const pics = [["hero", "Chicken mandi"], ["mutton", "Mutton mandi"], ["seafood", "Fish and prawns"], ["platter", "Family tray"], ["grills", "Grills"], ["desserts", "Kunafa"], ["drinks", "Coolers"], ["sides", "Sides"], ["veg", "Paneer mandi"]];
export default function Gallery() {
  return (<div className="mx-auto max-w-6xl px-4 py-10"><h1 className="font-display text-4xl">Gallery</h1><div className="mt-6 columns-2 gap-3 md:columns-3">{pics.map(([f, a], i) => /* eslint-disable-next-line @next/next/no-img-element */ <img key={f} src={`/img/${f}.jpg`} alt={a} loading="lazy" className={`mb-3 w-full rounded-2xl object-cover ${i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"}`} />)}</div></div>);
}
