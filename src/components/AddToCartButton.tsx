"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-xl bg-sand px-6 py-3.5 text-base font-semibold text-ink-muted"
      >
        Slut i lager
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        addItem({
          productId: product.id,
          name: product.name,
          priceInOre: product.priceInOre,
          priceFormatted: product.priceFormatted,
          image: product.image,
        })
      }
      className="w-full rounded-xl bg-clay px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-clay-dark focus:outline-none focus:ring-2 focus:ring-clay/50"
    >
      Lägg i varukorg
    </button>
  );
}
