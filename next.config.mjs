export default {
  reactStrictMode: true,
  images: { unoptimized: true },
  async rewrites() {
    return { fallback: [
{ source: "/img/c65.jpg", destination: "/img/46-c65.jpg" },
{ source: "/img/chai.jpg", destination: "/img/47-chai.jpg" },
{ source: "/img/chicken.jpg", destination: "/img/48-chicken.jpg" },
{ source: "/img/desserts.jpg", destination: "/img/49-desserts.jpg" },
{ source: "/img/drinks.jpg", destination: "/img/50-drinks.jpg" },
{ source: "/img/fahm.jpg", destination: "/img/51-fahm.jpg" },
{ source: "/img/falooda.jpg", destination: "/img/52-falooda.jpg" },
{ source: "/img/grills.jpg", destination: "/img/53-grills.jpg" },
{ source: "/img/haneeth.jpg", destination: "/img/54-haneeth.jpg" },
{ source: "/img/hero.jpg", destination: "/img/55-hero.jpg" },
{ source: "/img/hummus.jpg", destination: "/img/56-hummus.jpg" },
{ source: "/img/kunafa.jpg", destination: "/img/57-kunafa.jpg" },
{ source: "/img/mutton.jpg", destination: "/img/58-mutton.jpg" },
{ source: "/img/platter.jpg", destination: "/img/59-platter.jpg" },
{ source: "/img/prawns.jpg", destination: "/img/60-prawns.jpg" },
{ source: "/img/ribs.jpg", destination: "/img/61-ribs.jpg" },
{ source: "/img/seafood.jpg", destination: "/img/62-seafood.jpg" },
{ source: "/img/shawarma.jpg", destination: "/img/63-shawarma.jpg" },
{ source: "/img/sides.jpg", destination: "/img/64-sides.jpg" },
{ source: "/img/tikka.jpg", destination: "/img/65-tikka.jpg" },
{ source: "/img/tray.jpg", destination: "/img/66-tray.jpg" },
{ source: "/img/veg.jpg", destination: "/img/67-veg.jpg" }
    ] };
  },
};
