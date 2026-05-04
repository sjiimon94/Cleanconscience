"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function VarukorgPage() {
  const { items, totalItems, totalPriceFormatted, removeItem, updateQuantity, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Något gick fel. Försök igen.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Något gick fel. Kontrollera din anslutning och försök igen.");
    } finally {
      setLoading(false);
    }
  }

  if (totalItems === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mb-6 text-6xl">🛒</div>
        <h1 className="text-3xl font-bold text-ink">Din varukorg är tom</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Det verkar som att du inte lagt till något ännu.
        </p>
        <div className="mt-10">
          <Link
            href="/butik"
            className="rounded-xl bg-clay px-6 py-3 font-semibold text-white transition-colors hover:bg-clay-dark"
          >
            Gå till butiken
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-ink">Varukorg</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 rounded-2xl border border-border-soft bg-white p-4 shadow-sm"
          >
            {/* Product image */}
            <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-sand">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col gap-1">
              <h2 className="font-semibold text-ink">{item.name}</h2>
              <p className="text-sm text-ink-muted">{item.priceFormatted} / st</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                aria-label="Minska antal"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-ink-muted transition-colors hover:bg-sand hover:text-ink"
              >
                −
              </button>
              <span className="w-6 text-center font-medium text-ink">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                aria-label="Öka antal"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-ink-muted transition-colors hover:bg-sand hover:text-ink"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <div className="w-20 text-right font-semibold text-ink">
              {Math.round((item.priceInOre * item.quantity) / 100)} kr
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.productId)}
              aria-label={`Ta bort ${item.name}`}
              className="ml-2 rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-sand hover:text-ink"
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl border border-border-soft bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-ink-muted">
          <span>Frakt</span>
          <span className="font-medium text-sage-dark">Gratis (Sverige)</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border-soft pt-3">
          <span className="text-lg font-bold text-ink">Totalt</span>
          <span className="text-2xl font-bold text-ink">{totalPriceFormatted}</span>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-clay-light/30 px-4 py-3 text-sm text-clay-dark">
            {error}
          </p>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-clay px-6 py-4 text-base font-bold text-white transition-colors hover:bg-clay-dark focus:outline-none focus:ring-2 focus:ring-clay/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Skickar till kassan…" : "Till kassan"}
        </button>

        <div className="mt-4 text-center">
          <Link href="/butik" className="text-sm text-ink-muted underline hover:text-ink">
            Fortsätt handla
          </Link>
        </div>
      </div>
    </div>
  );
}
