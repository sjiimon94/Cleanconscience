import type { MetadataRoute } from "next";
import { getSafeBaseUrl } from "@/lib/safe-base-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSafeBaseUrl();

  // Only include sitemap line if we have a safe, non-placeholder base URL
  const hasSafeUrl =
    baseUrl !== null &&
    !baseUrl.includes("example.com") &&
    !baseUrl.includes("localhost");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(hasSafeUrl ? { sitemap: `${baseUrl}/sitemap.xml` } : {}),
  };
}
