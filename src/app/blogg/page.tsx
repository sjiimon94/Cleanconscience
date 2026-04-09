import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blogg",
  description:
    "Läs artiklar och tankar från Cleanconscience om hälsa, medvetenhet och en renare vardag.",
};

export default function BloggPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Blogg
      </h1>
      <p className="mt-2 text-gray-600">
        Artiklar och tankar kring medvetenhet, hälsa och en renare livsstil.
      </p>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-xs text-gray-400">{post.date}</p>
              <h2 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-500">
                {post.excerpt}
              </p>
              <span className="mt-4 text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                Läs mer →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <p className="text-gray-500">
            Inga blogginlägg publicerade ännu.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Kom tillbaka snart!
          </p>
        </div>
      )}
    </div>
  );
}
