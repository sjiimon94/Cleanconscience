import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { fetchEpisodes } from "@/lib/podcast";
import { siteConfig } from "../config/site";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import WaveDivider from "@/components/WaveDivider";

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
    title: "Mina kurser",
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
      {/* Hero — full-width with nature gradient overlay */}
      <section className="relative overflow-hidden bg-deep-forest px-4 py-24 text-center sm:py-36">
        {/* Soft radial gradient background mimicking misty forest light */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(122,158,126,0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(200,131,95,0.15) 0%, transparent 50%), linear-gradient(180deg, #1A2E1C 0%, #2C3E2D 50%, #3A5240 100%)",
          }}
        />
        {/* Decorative organic blob shapes */}
        <div
          className="absolute -left-20 -top-20 h-80 w-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7A9E7E 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #C8835F 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-3xl">
          <RevealOnScroll>
            <h1 className="text-4xl font-extrabold tracking-tight text-warm-white sm:text-5xl lg:text-6xl">
              Medvetna val för en renare framtid
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-sage-light/90">
              {siteConfig.description}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <Link
              href="/butik"
              className="mt-10 inline-block rounded-full bg-clay px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-clay-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Utforska butiken
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Wave transition: deep-forest → warm-white */}
      <WaveDivider fillTop="#3A5240" fillBottom="#FAF8F5" />

      {/* CTA Cards */}
      <section className="bg-warm-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ctaCards.map((card, i) => (
              <RevealOnScroll key={card.href} delay={i * 100}>
                <Link
                  href={card.href}
                  className="card-hover group block rounded-2xl border border-border-soft bg-white p-6 shadow-sm"
                >
                  <span className="text-3xl">{card.emoji}</span>
                  <h2 className="mt-3 text-lg font-semibold text-ink group-hover:text-sage-dark">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">{card.description}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition: warm-white → sand */}
      <WaveDivider fillTop="#FAF8F5" fillBottom="#F0E8DC" />

      {/* Utvalda produkter */}
      <section className="bg-sand px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <h2 className="text-2xl font-bold text-ink">Utvalda produkter</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Frakt inom Sverige. Handla direkt eller besök vår butik.
            </p>
          </RevealOnScroll>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productIds.map((id, i) => (
              <RevealOnScroll key={id} delay={i * 80}>
                <div className="card-hover rounded-2xl border border-border-soft bg-white p-4">
                  <ShopifyBuyButton productId={id} />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition: sand → warm-white */}
      <WaveDivider fillTop="#F0E8DC" fillBottom="#FAF8F5" />

      {/* Senaste podcastavsnittet */}
      <section className="bg-warm-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <h2 className="text-2xl font-bold text-ink">Senaste podcastavsnittet</h2>
          </RevealOnScroll>
          {latestEpisode ? (
            <RevealOnScroll delay={100}>
              <div className="mt-6 card-hover rounded-2xl border border-border-soft bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-ink">
                  <Link href={`/podcast/${latestEpisode.slug}`} className="hover:text-sage-dark transition-colors">
                    {latestEpisode.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{latestEpisode.date}</p>
                <p className="mt-2 text-sm text-ink-light">{latestEpisode.description}</p>
                {latestEpisode.audioUrl && (
                  <audio controls preload="none" className="mt-4 w-full">
                    <source src={latestEpisode.audioUrl} />
                  </audio>
                )}
                <Link
                  href="/podcast"
                  className="mt-4 inline-block text-sm font-medium text-clay hover:text-clay-dark transition-colors"
                >
                  Alla avsnitt →
                </Link>
              </div>
            </RevealOnScroll>
          ) : (
            <p className="mt-4 text-sm text-ink-muted">
              Inga podcastavsnitt tillgängliga just nu. Kom tillbaka snart!
            </p>
          )}
        </div>
      </section>

      {/* Wave transition: warm-white → misty-blue */}
      <WaveDivider fillTop="#FAF8F5" fillBottom="#E4EDF2" />

      {/* Senaste blogginläggen */}
      <section className="bg-misty-blue px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <h2 className="text-2xl font-bold text-ink">Senaste blogginläggen</h2>
          </RevealOnScroll>
          {posts.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <RevealOnScroll key={post.slug} delay={i * 100}>
                  <Link
                    href={`/blogg/${post.slug}`}
                    className="card-hover group block rounded-2xl border border-border-soft bg-white p-6 shadow-sm"
                  >
                    <p className="text-xs text-ink-muted">{post.date}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink group-hover:text-sage-dark">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-muted">
              Inga blogginlägg publicerade ännu. Kom tillbaka snart!
            </p>
          )}
          {posts.length > 0 && (
            <RevealOnScroll delay={350}>
              <div className="mt-8 text-center">
                <Link
                  href="/blogg"
                  className="text-sm font-medium text-clay hover:text-clay-dark transition-colors"
                >
                  Läs alla inlägg →
                </Link>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
