import type { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Utforska",
  description:
    "Utforska Cecilia Strandevalls böcker, vattenfilter, kurser, podcast och publiceringar.",
};

const categories = [
  {
    title: "Produkter",
    description: "Cecilias bok och andra produkter — läs mer och beställ via extern bokhandel.",
    href: "/utforska/produkter",
    emoji: "📚",
  },
  {
    title: "Vattenfilter",
    description: "Renare vatten för ett renare liv — läs om vattenfiltrering och hitta rätt lösning.",
    href: "/utforska/vattenfilter",
    emoji: "💧",
  },
  {
    title: "Kurser",
    description: "Videokurser med fördjupande innehåll om hälsa och medvetna val.",
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
    title: "Publiceringar",
    description: "Artiklar, gästtexter, poddgästspel och andra medverkan.",
    href: "/utforska/publiceringar",
    emoji: "📝",
  },
];

export default function UtforskaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Utforska</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Här samlar jag allt jag gör — böcker, kurser, podcast, vattenfilter och
          publiceringar. Välj det som intresserar dig.
        </p>
      </RevealOnScroll>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <RevealOnScroll key={cat.href} delay={i * 80}>
            <Link
              href={cat.href}
              className="card-hover group flex flex-col rounded-2xl border border-border-soft bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <h2 className="mt-3 text-lg font-semibold text-ink group-hover:text-sage-dark">
                {cat.title}
              </h2>
              <p className="mt-1 flex-1 text-sm text-ink-muted">{cat.description}</p>
              <span className="mt-4 text-sm font-medium text-clay group-hover:text-clay-dark">
                Läs mer →
              </span>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
