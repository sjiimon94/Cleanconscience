export const siteConfig = {
  siteName: "Cleanconscience",
  siteUrl: "https://TODO_DOMAIN",
  locale: "sv-SE",
  currency: "SEK",
  contactEmail: "sjiimon94@gmail.com",
  description: "Cleanconscience – medvetna val för en renare framtid. Barnböcker, vattenfiltrering, kurser och mer.",
  social: {
    instagram: "https://instagram.com/cleanconscience",
    tiktok: "https://tiktok.com/@cleanconscience",
    youtube: "https://youtube.com/@cleanconscience",
    x: "https://x.com/cleanconscience",
    facebook: "https://facebook.com/cleanconscience",
  },
  shopify: {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "dinbutik.myshopify.com",
    buyButtonFallbackUrl: process.env.NEXT_PUBLIC_SHOPIFY_FALLBACK_URL || "https://dinbutik.myshopify.com",
    productIds: [] as string[],
    collectionIds: {
      bocker: "",
      vattenfiltrering: "",
      merch: "",
    },
  },
  teachable: {
    schoolUrl: process.env.NEXT_PUBLIC_TEACHABLE_URL || "https://cleanconscience.teachable.com",
    courses: [
      {
        slug: "barnvaccinationer",
        title: "Barnvaccinationer",
        description: "En omfattande videoserie om barnvaccinationer – fakta, forskning och föräldraperspektiv.",
        url: "https://cleanconscience.teachable.com/p/barnvaccinationer",
        image: "/images/courses/barnvaccinationer.jpg",
      },
    ],
  },
  podcast: {
    rssUrl: process.env.PODCAST_RSS_URL || "",
    spotifyShowId: process.env.NEXT_PUBLIC_SPOTIFY_SHOW_ID || "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
