import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { fetchEpisodes } from "@/lib/podcast";
import { siteConfig } from "../config/site";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";

export const metadata: Metadata = {
  title: "Start",
  description: siteConfig.description,
};

const ctaCards = [
  {
    title: "Butik",
    description: "Böcker, vattenfiltrering och mer – fraktas inom Sverige.",
    href: "/butik",
    emoji: "🛒",
  },
  {
    title: "Kurser",
    description: "Videokurser som ger dig kunskap att fatta medvetna beslut.",
    href: "/kurser",
    emoji: "🎓",
  },
  {
    title: "Podcast",
    description: "Lyssna på samtal om hälsa, medvetenhet och samhälle.",
    href: "/podcast",
    emoji: "🎙️",
  },
  {
    title: "Blogg",
    description: "Artiklar och tankar kring en renare livsstil.",
    href: "/blogg",
    emoji: "📝",
  },
];

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  const episodes = await fetchEpisodes();
  const latestEpisode = episodes.length > 0 ? episodes[0] : null;

  /* Use configured product IDs, or placeholder IDs for demo */
  const productIds =
    siteConfig.shopify.productIds && siteConfig.shopify.productIds.length > 0
      ? siteConfig.shopify.productIds.slice(0, 6)
      : ["placeholder-1", "placeholder-2", "placeholder-3"];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-white px-4 py-20 text-center sm:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Medvetna val för en renare framtid
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {siteConfig.description}
          </p>
          <Link
            href="/butik"
            className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Utforska butiken
          </Link>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ctaCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{card.emoji}</span>
              <h2 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                {card.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Utvalda produkter */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900">Utvalda produkter</h2>
          <p className="mt-1 text-sm text-gray-500">
            Frakt inom Sverige. Handla direkt eller besök vår butik.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productIds.map((id) => (
              <div key={id} className="rounded-lg border border-gray-200 bg-white p-4">
                <ShopifyBuyButton productId={id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senaste podcastavsnittet */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Senaste podcastavsnittet</h2>
        {latestEpisode ? (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              <Link href={`/podcast/${latestEpisode.slug}`} className="hover:text-emerald-600">
                {latestEpisode.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-400">{latestEpisode.date}</p>
            <p className="mt-2 text-sm text-gray-600">{latestEpisode.description}</p>
            {latestEpisode.audioUrl && (
              <audio controls preload="none" className="mt-4 w-full">
                <source src={latestEpisode.audioUrl} />
              </audio>
            )}
            <Link
              href="/podcast"
              className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Alla avsnitt →
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Inga podcastavsnitt tillgängliga just nu. Kom tillbaka snart!
          </p>
        )}
      </section>

      {/* Senaste blogginläggen */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900">Senaste blogginläggen</h2>
          {posts.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogg/${post.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-xs text-gray-400">{post.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              Inga blogginlägg publicerade ännu. Kom tillbaka snart!
            </p>
          )}
          {posts.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                href="/blogg"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Läs alla inlägg →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
