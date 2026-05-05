"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/varukorg"
      aria-label={`Varukorg${totalItems > 0 ? ` (${totalItems} artiklar)` : ""}`}
      className="relative inline-flex items-center justify-center rounded-lg p-2 text-ink-light transition-colors hover:bg-sage-light hover:text-ink focus:outline-none focus:ring-2 focus:ring-sage/40"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.871-7.131A60.477 60.477 0 0 0 7.11 5.272M7.5 14.25 5.106 5.272M7.5 14.25l-2.394-9"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
