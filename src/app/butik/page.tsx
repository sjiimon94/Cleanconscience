import type { Metadata } from "next";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";
import { siteConfig } from "../../../config/site";

export const metadata: Metadata = {
  title: "Butik",
  description:
    "Handla böcker, vattenfiltrering och merch från Cleanconscience. Frakt inom Sverige.",
};

const categories = [
  {
    title: "Böcker",
    description:
      "Barnböcker och facklitteratur som utbildar och inspirerar.",
    collectionKey: "bocker" as const,
  },
  {
    title: "Vattenfiltrering",
    description:
      "Vattenfilter och tillbehör för rent vatten i hemmet.",
    collectionKey: "vattenfiltrering" as const,
  },
  {
    title: "Merch",
    description:
      "Kläder och tillbehör med Cleanconscience-profil.",
    collectionKey: "merch" as const,
  },
];

export default function ButikPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Butik
      </h1>
      <p className="mt-2 text-gray-600">
        Frakt inom Sverige. Välj kategori nedan eller{" "}
        <a
          href={siteConfig.shopify.buyButtonFallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-600 hover:text-emerald-700"
        >
          besök vår Shopify-butik
        </a>
        .
      </p>

      <div className="mt-12 space-y-16">
        {categories.map((cat) => {
          const collectionId =
            siteConfig.shopify.collectionIds?.[cat.collectionKey];
          return (
            <section key={cat.collectionKey}>
              <h2 className="text-2xl font-semibold text-gray-900">
                {cat.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
              <div className="mt-6">
                {collectionId ? (
                  <ShopifyBuyButton collectionId={collectionId} />
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                    <p className="text-sm text-gray-500">
                      Produkter läggs till snart.
                    </p>
                    <ShopifyBuyButton />
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
