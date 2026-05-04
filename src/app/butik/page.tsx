import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Butik",
  description:
    "Handla böcker och merch från Cleanconscience. Gratis frakt inom Sverige.",
};

export default function ButikPage() {
  const books = getProductsByCategory("bocker");
  const merch = getProductsByCategory("merch");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-ink">Butik</h1>
        <p className="mt-3 text-lg text-ink-muted">
          Handplockat med omtanke.{" "}
          <span className="inline-flex items-center gap-1 font-medium text-sage-dark">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            Gratis frakt inom Sverige
          </span>
        </p>
      </div>

      {/* Böcker */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-semibold text-ink">Böcker</h2>
        {books.length === 0 ? (
          <p className="text-ink-muted">Inga böcker tillgängliga just nu.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((product) => (
              <Link
                key={product.id}
                href={`/butik/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <span className="rounded-full bg-ink/10 px-3 py-1 text-sm font-medium text-ink-muted">
                        Slut i lager
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-ink group-hover:text-clay">
                    {product.name}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-ink-muted">
                    {product.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-ink">
                      {product.priceFormatted}
                    </span>
                    {product.inStock ? (
                      <span className="rounded-full bg-sage-light px-3 py-1 text-xs font-medium text-sage-dark">
                        I lager
                      </span>
                    ) : (
                      <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink-muted">
                        Slut i lager
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Merch */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-ink">Merch</h2>
        {merch.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-soft bg-sand/30 px-8 py-16 text-center">
            <p className="text-lg font-medium text-ink">Kommer snart</p>
            <p className="mt-2 text-ink-muted">
              Kläder och tillbehör med Cleanconscience-profil är på väg.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {merch.map((product) => (
              <Link
                key={product.id}
                href={`/butik/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-sand">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-ink group-hover:text-clay">
                    {product.name}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-ink-muted">
                    {product.shortDescription}
                  </p>
                  <span className="mt-4 text-lg font-bold text-ink">
                    {product.priceFormatted}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
