import type { MetadataRoute } from "next";
import { getSafeBaseUrl } from "@/lib/safe-base-url";

export default function robots(): MetadataRoute.Robots {
  const { url: baseUrl, isProduction } = getSafeBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(isProduction ? { sitemap: `${baseUrl}/sitemap.xml` } : {}),
  };
}
