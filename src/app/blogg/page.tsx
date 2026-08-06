import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Publiceringar",
  description:
    "Läs texter från Cecilia Strandevall om hälsa, medvetenhet och en renare vardag.",
};

export default function BloggPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-warm-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Publiceringar
        </h1>
        <p className="mt-3 max-w-3xl text-ink-muted">
          Här hittar du mina egna texter och tankar.
        </p>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-12">
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
          <div className="mt-10 rounded-2xl border border-dashed border-border-soft bg-sand/60 p-10 text-center">
            <p className="text-ink-muted">Inga publiceringar ännu.</p>
            <p className="mt-1 text-sm text-ink-muted">
              Kom tillbaka snart!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
