"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "../config/site";

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: {
        domain: string;
        storefrontAccessToken: string;
      }) => unknown;
      UI?: {
        onReady: (
          client: unknown
        ) => Promise<{
          createComponent: (
            type: string,
            config: Record<string, unknown>
          ) => void;
        }>;
      };
    };
  }
}

interface ShopifyBuyButtonProps {
  productId?: string;
  collectionId?: string;
  fallbackUrl?: string;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export default function ShopifyBuyButton({
  productId,
  collectionId,
  fallbackUrl,
}: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const shopifyDomain = siteConfig.shopify?.domain;
  const resolvedFallbackUrl =
    fallbackUrl || siteConfig.shopify?.buyButtonFallbackUrl || "#";

  /* Treat well-known placeholder domains as "not configured" */
  const isPlaceholderDomain =
    !shopifyDomain || shopifyDomain === "dinbutik.myshopify.com";

  const hasId = !!(productId || collectionId);

  useEffect(() => {
    if (!hasId || isPlaceholderDomain || initializedRef.current) return;

    const sdkUrl =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    loadScript(sdkUrl)
      .then(() => {
        if (!window.ShopifyBuy || initializedRef.current) return;
        initializedRef.current = true;

        const storefrontAccessToken =
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

        const client = window.ShopifyBuy.buildClient({
          domain: shopifyDomain,
          storefrontAccessToken,
        });

        if (!window.ShopifyBuy.UI) return;

        window.ShopifyBuy.UI.onReady(client).then((ui) => {
          const type = productId ? "product" : "collection";
          const id = productId || collectionId;

          ui.createComponent(type, {
            id,
            node: containerRef.current,
            moneyFormat: "{{amount}} kr",
            options: {
              product: {
                styles: {
                  product: { "@media (min-width: 601px)": { "max-width": "100%" } },
                },
              },
            },
          });
        });
      })
      .catch((err) => {
        console.error("Shopify Buy Button SDK failed to load:", err);
      });
  }, [hasId, isPlaceholderDomain, shopifyDomain, productId, collectionId]);

  if (hasId && !isPlaceholderDomain) {
    return <div ref={containerRef} />;
  }

  return (
    <a
      href={resolvedFallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
    >
      Handla i butiken →
    </a>
  );
}
