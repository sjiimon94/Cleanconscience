export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceInOre: number; // Stripe uses smallest currency unit (öre for SEK)
  priceFormatted: string; // "179 kr"
  image: string; // path under /public
  category: "bocker" | "merch";
  inStock: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export const products: Product[] = [
  {
    id: "stina-och-mamma-stadar",
    slug: "stina-och-mamma-stadar",
    name: "Stina och mamma städar",
    shortDescription:
      "En varm och igenkännbar bilderbok om vardagslivet i en familj.",
    description: `Stina tycker att vuxna är lite tråkiga ibland. De bara jobbar, handlar och städar.

Själv tycker Stina att livet borde handla mer om att leka och ha roligt. Men en dag visar mamma att städning faktiskt kan vara något helt annat än ett tråkigt måste. Med musik i högtalaren, dans i köket och lite hjälp från Stina förvandlas vardagssysslorna till något lekfullt.

Stina och mamma städar är en varm och igenkännbar bilderbok om vardagslivet i en familj – om samarbete, skratt och om hur vardagspusslet kan blir något fint när man gör det tillsammans.`,
    priceInOre: 17900,
    priceFormatted: "179 kr",
    image: "/images/books/stina-och-mamma-stadar.svg",
    category: "bocker",
    inStock: true,
    seoTitle: "Stina och mamma städar – Bilderbok",
    seoDescription:
      "En varm bilderbok om vardagslivet i en familj – om samarbete, skratt och hur vardagen kan bli rolig när man gör det tillsammans. 179 kr. Gratis frakt i Sverige.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category);
}
