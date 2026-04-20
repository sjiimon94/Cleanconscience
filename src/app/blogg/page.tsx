import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { externalWritings } from "@/data/external-writings";

export const metadata: Metadata = {
  title: "Skrifter",
  description:
    "Läs interna och externa skrifter från Cleanconscience om hälsa, medvetenhet och en renare vardag.",
};

export default function BloggPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-warm-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Skrifter
        </h1>
        <p className="mt-3 max-w-3xl text-ink-muted">
          Här hittar du både mina egna texter och externa texter där jag har
          medverkat.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-ink">Interna texter</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Publicerade inlägg direkt på Cleanconscience.
          </p>
          {posts.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-12">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blogg/${post.slug}`}
                  className={`group rounded-2xl border border-border-soft bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    index === 0 ? "md:col-span-7" : "md:col-span-5"
                  }`}
                >
                  <p className="text-xs text-ink-muted">{post.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink transition-colors group-hover:text-sage-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-light">{post.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-clay transition-colors group-hover:text-clay-dark">
                    Läs text →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-border-soft bg-sand/60 p-10 text-center">
              <p className="text-ink-muted">Inga interna texter ännu.</p>
              <p className="mt-1 text-sm text-ink-muted">
                Kom tillbaka snart!
              </p>
            </div>
          )}
        </section>

        <section className="mt-16 border-t border-border-soft pt-10">
          <h2 className="text-2xl font-semibold text-ink">Externa texter</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Artiklar och publiceringar på andra plattformar.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {externalWritings.map((writing) => (
              <a
                key={writing.title}
                href={writing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border-soft bg-sage-light/35 p-6 transition-all hover:-translate-y-0.5 hover:border-sage/40 hover:shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  {writing.outlet}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink transition-colors group-hover:text-sage-dark">
                  {writing.title}
                </h3>
                {writing.description && (
                  <p className="mt-2 text-sm text-ink-light">
                    {writing.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-ink-muted">
                    {writing.date ?? "Datum saknas"}
                  </span>
                  <span className="font-medium text-clay transition-colors group-hover:text-clay-dark">
                    Öppna extern text ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
