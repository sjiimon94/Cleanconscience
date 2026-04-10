/* ------------------------------------------------------------------ */
/*  Typer                                                             */
/* ------------------------------------------------------------------ */

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  x?: string;
  facebook?: string;
}

export interface ShopifyConfig {
  /** T.ex. "dinbutik.myshopify.com" */
  domain: string;
  /** Fallback-länk till fullständig Shopify-butik */
  buyButtonFallbackUrl: string;
  /** Produkt-ID:n för inbäddning (valfritt) */
  productIds?: string[];
  /** Kollektion-ID:n per kategori (valfritt) */
  collectionIds?: {
    bocker?: string;
    vattenfiltrering?: string;
    merch?: string;
  };
}

export interface TeachableCourse {
  slug: string;
  title: string;
  description: string;
  url: string;
  image?: string;
}

export interface TeachableConfig {
  schoolUrl: string;
  courses: TeachableCourse[];
}

export interface PodcastConfig {
  /** Hämtas från process.env.PODCAST_RSS_URL – hårdkoda INTE */
  rssUrl: string;
  spotifyShowId?: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  locale: string;
  currency: string;
  contactEmail: string;
  description: string;
  social: SocialLinks;
  shopify: ShopifyConfig;
  teachable: TeachableConfig;
  podcast: PodcastConfig;
}

/* ------------------------------------------------------------------ */
/*  Konfiguration                                                     */
/* ------------------------------------------------------------------ */

export const siteConfig: SiteConfig = {
  siteName: "Cleanconscience",
  siteUrl: "https://TODO_DOMAIN",
  locale: "sv-SE",
  currency: "SEK",
  contactEmail: "sjiimon94@gmail.com",
  description:
    "Cleanconscience – medvetna val för en renare framtid. Barnböcker, vattenfiltrering, kurser och mer.",

  /* Sociala medier – fyll i de som är aktuella, lämna resten tomma */
  social: {
    instagram: "https://www.instagram.com/ceciliastrandevall/",
    tiktok: undefined,
    youtube: "https://www.youtube.com/@ceciliaberg2701?app=desktop",
    x: undefined,
    facebook: "https://www.facebook.com/cecilia.berg.3/",
  },

  /* Shopify Buy Button / inbäddning */
  shopify: {
    domain:
      process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "dinbutik.myshopify.com",
    buyButtonFallbackUrl:
      process.env.NEXT_PUBLIC_SHOPIFY_FALLBACK_URL ??
      "https://dinbutik.myshopify.com",
    productIds: [],
    collectionIds: {
      bocker: undefined,
      vattenfiltrering: undefined,
      merch: undefined,
    },
  },

  /* Teachable – länka ut till kurser */
  teachable: {
    schoolUrl:
      process.env.NEXT_PUBLIC_TEACHABLE_URL ??
      "https://cleanconscience.teachable.com",
    courses: [
      {
        slug: "barnvaccinationer",
        title: "Barnvaccinationer",
        description:
          "En omfattande videoserie om barnvaccinationer – fakta, forskning och föräldraperspektiv.",
        url: "https://cleanconscience.teachable.com/p/barnvaccinationer",
        image: "/images/courses/barnvaccinationer.jpg",
      },
    ],
  },

  /* Podcast – RSS-URL:en MÅSTE sättas via env var PODCAST_RSS_URL */
  podcast: {
    rssUrl: process.env.PODCAST_RSS_URL ?? "",
    spotifyShowId:
      process.env.NEXT_PUBLIC_SPOTIFY_SHOW_ID ?? "063j4LSHHIJaPbjSsCElDW",
  },
};
