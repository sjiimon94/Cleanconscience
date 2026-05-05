import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { fetchEpisodes } from "@/lib/podcast";
import { siteConfig } from "../config/site";
import { products } from "@/data/products";
import RevealOnScroll from "@/components/RevealOnScroll";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Start",
  description: siteConfig.description,
};

const ctaCards: {
  title: string;
  description: string;
  href: string;
  emoji: string;
  external: boolean;
  image?: string;
}[] = [
  {
    title: "Butik",
    description: "Böcker, vattenfiltrering och mer – fraktas inom Sverige.",
    href: "/butik",
    emoji: "🛒",
    external: false,
  },
  {
    title: "Kurser",
    description: "Videokurser på min kursplattform med fördjupande innehåll.",
    href: siteConfig.teachable.courses[0]?.url || siteConfig.teachable.schoolUrl,
    emoji: "🎓",
    external: true,
  },
  {
    title: "Podcast",
    description: "Lyssna på samtal om hälsa, medvetenhet och samhälle.",
    href: "/podcast",
    emoji: "🎙️",
    external: false,
  },
  {
    title: "Skrifter",
    description: "Artiklar och tankar kring en renare livsstil.",
    href: "/blogg",
    emoji: "📝",
    external: false,
  },
];

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  const episodes = await fetchEpisodes();
  const latestEpisode = episodes.length > 0 ? episodes[0] : null;
  const latestPost = posts.length > 0 ? posts[0] : null;

  /* Show only purchasable (in-stock) products */
  const featuredProducts = products.filter((p) => p.inStock);

  return (
    <>
      <section className="relative overflow-hidden bg-deep-forest px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <Image
          src="/images/editorial/forest-hero.svg"
          alt="Naturinspirerad bakgrund med mjuka former"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-forest/75 via-deep-forest/50 to-ocean-dark/60" />
        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-12">
          <RevealOnScroll className="rounded-3xl border border-white/15 bg-black/20 p-8 backdrop-blur-sm lg:col-span-8 lg:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-sage-light/80">
              Redaktionellt
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-warm-white sm:text-5xl">
              Medvetna val för en renare framtid
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sage-light/90">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/butik"
                className="rounded-full bg-clay px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
              >
                Utforska butiken
              </Link>
              <Link
                href="/blogg"
                className="rounded-full border border-white/35 px-7 py-3 text-sm font-semibold text-warm-white transition-colors hover:border-clay-light hover:text-clay-light"
              >
                Läs skrifter
              </Link>
            </div>
          </RevealOnScroll>
          <RevealOnScroll
            delay={120}
            className="grid gap-4 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm lg:col-span-4"
          >
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-sage-light/80">
                Senast i podcast
              </p>
              {latestEpisode ? (
                <Link
                  href={`/podcast/${latestEpisode.slug}`}
                  className="mt-2 block text-sm font-medium text-warm-white transition-colors hover:text-clay-light"
                >
                  {latestEpisode.title}
                </Link>
              ) : (
                <p className="mt-2 text-sm text-sage-light/85">
                  Nya avsnitt publiceras snart.
                </p>
              )}
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-sage-light/80">
                Senast i skrifter
              </p>
              {latestPost ? (
                <Link
                  href={`/blogg/${latestPost.slug}`}
                  className="mt-2 block text-sm font-medium text-warm-white transition-colors hover:text-clay-light"
                >
                  {latestPost.title}
                </Link>
              ) : (
                <p className="mt-2 text-sm text-sage-light/85">
                  Nya texter kommer snart.
                </p>
              )}
            </div>
            <div className="mx-auto mt-1 h-28 w-28 overflow-hidden rounded-full border border-white/20">
              <Image
                src="/images/Logotyp.jpg"
                alt="Cleanconscience logotyp i cirkulär form"
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
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
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover group block overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm"
                  >
                    {card.image && (
                      <div className="h-36 w-full overflow-hidden">
                        <Image
                          src={card.image}
                          alt="Bild för kurskort"
                          width={1200}
                          height={720}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-3xl">{card.emoji}</span>
                      <h2 className="mt-3 text-lg font-semibold text-ink group-hover:text-sage-dark">
                        {card.title}
                      </h2>
                      <p className="mt-1 text-sm text-ink-muted">
                        {card.description}
                      </p>
                      <p className="mt-3 text-sm font-medium text-clay">
                        Öppna kursplattformen ↗
                      </p>
                    </div>
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    className="card-hover group block rounded-2xl border border-border-soft bg-white p-6 shadow-sm"
                  >
                    <span className="text-3xl">{card.emoji}</span>
                    <h2 className="mt-3 text-lg font-semibold text-ink group-hover:text-sage-dark">
                      {card.title}
                    </h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      {card.description}
                    </p>
                  </Link>
                )}
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
              Frakt tillkommer med 29 kr. Handla direkt eller besök vår butik.
            </p>
          </RevealOnScroll>
          {featuredProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, i) => (
                <RevealOnScroll key={product.id} delay={i * 80}>
                  <Link
                    href={`/butik/${product.slug}`}
                    className="card-hover group block overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm"
                  >
                    <div className="h-48 w-full overflow-hidden bg-sand">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-ink group-hover:text-sage-dark">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <p className="mt-3 text-base font-bold text-clay">
                        {product.priceFormatted}
                      </p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-ink-muted">
              Inga produkter tillgängliga just nu. Kom tillbaka snart!
            </p>
          )}
          <RevealOnScroll delay={200}>
            <div className="mt-8 text-center">
              <Link
                href="/butik"
                className="text-sm font-medium text-clay hover:text-clay-dark transition-colors"
              >
                Se alla produkter →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Wave transition: sand → warm-white */}
      <WaveDivider fillTop="#F0E8DC" fillBottom="#FAF8F5" />

      {/* Ecofilters of Sweden */}
      <section className="bg-warm-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <div className="flex flex-col gap-6 rounded-2xl border border-border-soft bg-white p-8 shadow-sm sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.15em] text-ink-muted">
                  Partner
                </p>
                <h2 className="mt-2 text-xl font-bold text-ink">
                  Ecofilters of Sweden
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Renare vatten för ett renare liv. Besök Ecofilters of Sweden
                  för vattenfilter och produkter för ett mer medvetet hem.
                </p>
              </div>
              <a
                href="https://www.ecofilterofsweden.se"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-dark"
              >
                Besök Ecofilters of Sweden ↗
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Wave: warm-white → warm-white (reuse same background for podcast) */}
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

      {/* Senaste skrifter */}
      <section className="bg-misty-blue px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <h2 className="text-2xl font-bold text-ink">Senaste skrifter</h2>
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
              Inga skrifter publicerade ännu. Kom tillbaka snart!
              </p>
          )}
          {posts.length > 0 && (
            <RevealOnScroll delay={350}>
              <div className="mt-8 text-center">
                <Link
                  href="/blogg"
                  className="text-sm font-medium text-clay hover:text-clay-dark transition-colors"
                >
                  Läs alla skrifter →
                </Link>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
