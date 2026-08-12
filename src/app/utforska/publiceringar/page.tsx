import type { Metadata } from "next";
import { publications } from "@/data/publications";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Publiceringar",
  description:
    "Artiklar, gästtexter, poddgästspel och andra medverkan av Cecilia Strandevall.",
};

export default function PubliceringarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Publiceringar
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Artiklar, gästtexter, poddgästspel och andra medverkan — samlat på ett ställe.
        </p>
      </RevealOnScroll>

      {publications.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((pub, i) => (
            <RevealOnScroll key={pub.url} delay={i * 80}>
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex flex-col rounded-2xl border border-border-soft bg-white shadow-sm transition-all hover:shadow-md"
              >
                {pub.image && (
                  <div className="h-40 w-full overflow-hidden rounded-t-2xl bg-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pub.image}
                      alt={pub.title || "Publicering"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {pub.type && (
                      <span className="rounded-full bg-sage-light px-2.5 py-0.5 text-xs font-medium text-sage-dark">
                        {pub.type}
                      </span>
                    )}
                    {pub.date && (
                      <span className="text-xs text-ink-muted">{pub.date}</span>
                    )}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-ink group-hover:text-sage-dark">
                    {pub.title || pub.url}
                  </h2>
                  {pub.outlet && (
                    <p className="mt-0.5 text-xs text-ink-muted">{pub.outlet}</p>
                  )}
                  {pub.description && (
                    <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed">
                      {pub.description}
                    </p>
                  )}
                  <span className="mt-4 text-sm font-medium text-clay group-hover:text-clay-dark">
                    Läs mer ↗
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-muted">
          Inga publiceringar tillgängliga just nu. Kom tillbaka snart!
        </p>
      )}
    </div>
  );
}
