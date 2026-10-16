export type Cat = "Mandi - Chicken" | "Mandi - Mutton" | "Mandi - Seafood" | "Mandi - Veg" | "Family Platters" | "Starters & Grills" | "Sides & Breads" | "Desserts" | "Beverages";
export type Dish = {
  slug: string; name: string; cat: Cat; desc: string; veg: boolean; spice: 0 | 1 | 2 | 3;
  tags: ("Bestseller" | "Chef's Pick" | "New")[]; emoji: string;
  portions: { label: string; price: number }[]; inStock: boolean;
};
export const addOns = [
  { id: "rice", name: "Extra mandi rice", price: 60 },
  { id: "raita", name: "Extra raita", price: 25 },
  { id: "shorba", name: "Extra shorba", price: 40 },
  { id: "zhug", name: "Zhug dip", price: 20 },
];
const QHF = (q: number, h: number, f: number) => [{ label: "Quarter", price: q }, { label: "Half", price: h }, { label: "Full", price: f }];
const one = (p: number, label = "Regular") => [{ label, price: p }];
const d = (slug: string, name: string, cat: Cat, emoji: string, veg: boolean, spice: 0 | 1 | 2 | 3, portions: Dish["portions"], desc: string, tags: Dish["tags"] = []): Dish =>
  ({ slug, name, cat, emoji, veg, spice, portions, desc, tags, inStock: true });
export const dishes: Dish[] = [
  d("chicken-mandi", "Chicken Mandi", "Mandi - Chicken", "🍗", false, 1, QHF(249, 449, 849), "Tender chicken steamed over fragrant basmati with whole spices, finished with smoky char and fried onions.", ["Bestseller"]),
  d("chicken-fahm-mandi", "Chicken Fahm Mandi", "Mandi - Chicken", "🔥", false, 1, QHF(299, 549, 999), "Charcoal-grilled whole chicken laid over smoked rice. Deep, dark, and juicy.", ["Chef's Pick"]),
  d("chicken-juicy-mandi", "Chicken Juicy Mandi", "Mandi - Chicken", "🍗", false, 1, QHF(269, 489, 899), "Marinated overnight in yogurt and saffron, slow-cooked until it falls off the bone."),
  d("chicken-65-mandi", "Chicken 65 Mandi", "Mandi - Chicken", "🌶️", false, 2, QHF(279, 499, 929), "Hyderabadi crisp chicken 65 piled on mandi rice. Curry leaf crackle in every bite.", ["New"]),
  d("spicy-chicken-mandi", "Spicy Chicken Mandi", "Mandi - Chicken", "🌶️", false, 3, QHF(259, 469, 879), "Red chilli paste, black lemon and a slow heat that builds. For the brave."),
  d("mutton-mandi", "Mutton Mandi", "Mandi - Mutton", "🍖", false, 1, QHF(349, 649, 1199), "Goat shoulder cooked for six hours in a sealed pot, served on saffron rice.", ["Bestseller"]),
  d("mutton-fahm-mandi", "Mutton Fahm Mandi", "Mandi - Mutton", "🔥", false, 1, QHF(379, 699, 1299), "Charcoal-smoked mutton with a crisp edge and a melting centre."),
  d("mutton-haneeth", "Mutton Haneeth", "Mandi - Mutton", "🍖", false, 1, QHF(399, 749, 1399), "Slow-roasted leg of lamb in the Hadrami style. Sweet spices, no shortcuts.", ["Chef's Pick"]),
  d("lamb-ribs-mandi", "Lamb Ribs Mandi", "Mandi - Mutton", "🥩", false, 2, QHF(429, 799, 1499), "Fall-apart lamb ribs over smoked rice with a tamarind glaze."),
  d("fish-mandi", "Fish Mandi", "Mandi - Seafood", "🐟", false, 1, one(449, "Full"), "Seer fish marinated in lemon and garlic, steamed on a bed of mandi rice."),
  d("prawns-mandi", "Prawns Mandi", "Mandi - Seafood", "🦐", false, 2, one(549, "Full"), "Juicy tiger prawns tossed in coastal spices over aromatic rice.", ["New"]),
  d("paneer-mandi", "Paneer Mandi", "Mandi - Veg", "🧀", true, 1, QHF(229, 399, 749), "Smoked paneer slabs on saffron rice. The vegetarian showstopper.", ["Bestseller"]),
  d("mixed-veg-mandi", "Mixed Veg Mandi", "Mandi - Veg", "🥕", true, 1, QHF(199, 349, 649), "Seasonal vegetables roasted with whole spices, layered over mandi rice."),
  d("mushroom-mandi", "Mushroom Mandi", "Mandi - Veg", "🍄", true, 1, QHF(219, 379, 699), "Earthy button mushrooms in black lemon and cardamom."),
  d("royal-family-tray", "Royal Family Tray", "Family Platters", "👑", false, 1, one(1799, "Serves 4"), "Chicken fahm, mutton mandi, extra rice, two dips, raita and four mojitos.", ["Bestseller"]),
  d("darbar-feast-tray", "Darbar Feast Tray", "Family Platters", "🍽️", false, 1, one(2599, "Serves 6"), "Two meats, a grilled starter platter, rice, salad, sides and a kunafa to share."),
  d("sultan-mega-tray", "Sultan Mega Tray", "Family Platters", "🏆", false, 2, one(3999, "Serves 10"), "The full spread: three meats, grills, rice, sides, desserts and drinks.", ["Chef's Pick"]),
  d("alfaham-chicken", "Alfaham Chicken", "Starters & Grills", "🍗", false, 2, QHF(179, 329, 619), "Smoky charcoal grilled chicken with garlic mayo.", ["Bestseller"]),
  d("chicken-tikka", "Chicken Tikka", "Starters & Grills", "🍢", false, 2, one(279), "Yogurt marinated, tandoor charred, squeeze of lemon."),
  d("malai-tikka", "Malai Tikka", "Starters & Grills", "🍢", false, 0, one(299), "Creamy cashew marinade, mild and melt-in-mouth."),
  d("mutton-seekh-kebab", "Mutton Seekh Kebab", "Starters & Grills", "🍢", false, 2, one(329), "Hand-minced mutton with herbs, grilled on skewers."),
  d("grilled-fish", "Grilled Fish", "Starters & Grills", "🐟", false, 1, one(399), "Whole fillet with lemon, garlic and zhug."),
  d("paneer-tikka", "Paneer Tikka", "Starters & Grills", "🧀", true, 1, one(259), "Charred paneer and peppers in a spiced marinade."),
  d("chicken-shawarma-plate", "Chicken Shawarma Plate", "Starters & Grills", "🌯", false, 1, one(249), "Shaved spit chicken, pickles, garlic sauce, fries and khubz."),
  d("hummus-khubz", "Hummus with Khubz", "Starters & Grills", "🫓", true, 0, one(179), "Silky chickpea hummus, olive oil, warm khubz.", ["New"]),
  d("mutabbal", "Mutabbal", "Starters & Grills", "🍆", true, 1, one(189), "Smoked aubergine, tahini and pomegranate."),
  d("fattoush-salad", "Fattoush Salad", "Starters & Grills", "🥗", true, 0, one(169), "Crisp greens, sumac, toasted pita."),
  d("lentil-shorba", "Lentil Shorba", "Starters & Grills", "🍲", true, 1, one(129), "Warming red lentil soup with cumin and lemon."),
  d("mandi-rice", "Mandi Rice", "Sides & Breads", "🍚", true, 0, one(99, "Portion"), "Saffron basmati cooked in meat stock, with raisins and almonds."),
  d("khubz", "Khubz", "Sides & Breads", "🫓", true, 0, one(25, "Piece"), "Soft Arabian flatbread baked fresh."),
  d("garlic-mayo", "Garlic Mayo Dip", "Sides & Breads", "🧄", true, 0, one(30), "Whipped garlic, lemon, oil."),
  d("zhug", "Zhug", "Sides & Breads", "🌿", true, 3, one(30), "Green chilli and coriander fire sauce."),
  d("daqoos", "Daqoos", "Sides & Breads", "🍅", true, 2, one(30), "Tangy tomato and chilli sauce."),
  d("raita", "Raita", "Sides & Breads", "🥣", true, 0, one(40), "Cooling yogurt with cucumber and mint."),
  d("arabic-salad", "Arabic Salad", "Sides & Breads", "🥗", true, 0, one(79), "Cucumber, tomato, parsley, lemon."),
  d("kunafa", "Kunafa", "Desserts", "🍮", true, 0, one(199), "Crisp shredded pastry over molten cheese, soaked in rose syrup.", ["Bestseller"]),
  d("basbousa", "Basbousa", "Desserts", "🍰", true, 0, one(129), "Semolina cake soaked in sugar syrup, topped with almonds."),
  d("umm-ali", "Umm Ali", "Desserts", "🥧", true, 0, one(159), "Warm bread pudding with milk, nuts and cardamom.", ["Chef's Pick"]),
  d("qubani-ka-meetha", "Qubani ka Meetha", "Desserts", "🍑", true, 0, one(149), "Hyderabad's apricot dessert with cream."),
  d("double-ka-meetha", "Double ka Meetha", "Desserts", "🍞", true, 0, one(129), "Fried bread in saffron milk, a Nizami classic."),
  d("lemon-mint", "Lemon Mint", "Beverages", "🍋", true, 0, one(89), "Fresh lemon, mint, crushed ice."),
  d("blue-mojito", "Blue Mojito", "Beverages", "🧊", true, 0, one(109), "Blue curacao syrup, lime, mint, soda."),
  d("jallab", "Jallab", "Beverages", "🥤", true, 0, one(129), "Dates, grape molasses and rose water with pine nuts."),
  d("rooh-afza-falooda", "Rooh Afza Falooda", "Beverages", "🍧", true, 0, one(149), "Rose syrup, basil seeds, vermicelli, ice cream."),
  d("sulaimani-chai", "Sulaimani Chai", "Beverages", "🍵", true, 0, one(49), "Black tea with lemon, cardamom and clove."),
  d("karak-chai", "Karak Chai", "Beverages", "☕", true, 0, one(59), "Strong milk tea simmered with cardamom."),
  d("fresh-lime-soda", "Fresh Lime Soda", "Beverages", "🥂", true, 0, one(69), "Sweet, salted or mixed."),
  d("buttermilk", "Buttermilk", "Beverages", "🥛", true, 0, one(49), "Spiced chaas, perfect against the heat."),
];
export const cats: Cat[] = ["Mandi - Chicken", "Mandi - Mutton", "Mandi - Seafood", "Mandi - Veg", "Family Platters", "Starters & Grills", "Sides & Breads", "Desserts", "Beverages"];
export const coupons = [
  { code: "FIRST50", desc: "Rs 50 off your first order", kind: "flat" as const, value: 50, min: 0 },
  { code: "MANDI20", desc: "20% off above Rs 799, up to Rs 200", kind: "pct" as const, value: 20, min: 799, cap: 200 },
  { code: "FAMILY15", desc: "15% off family platters", kind: "pct" as const, value: 15, min: 0, onlyCat: "Family Platters" as Cat },
];
