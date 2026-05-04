import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt hittades inte" };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const paragraphs = product.description.split("\n\n").filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product image */}
        <div className="relative overflow-hidden rounded-2xl bg-sand aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <div className="mb-2">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-light px-3 py-1 text-xs font-medium text-sage-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-dark" />
                I lager
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink-muted">
                Slut i lager
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold text-ink">{product.name}</h1>
          <p className="mt-2 text-lg text-ink-muted">{product.shortDescription}</p>

          <div className="mt-6 text-3xl font-bold text-ink">
            {product.priceFormatted}
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          {/* Frakt info */}
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-sage-light/50 px-4 py-3 text-sm text-sage-dark">
            <svg
              className="h-4 w-4 flex-shrink-0"
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
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-border-soft pt-8 space-y-4">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-ink-muted leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
