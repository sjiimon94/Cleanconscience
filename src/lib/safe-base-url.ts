import { siteConfig } from "../config/site";

interface BaseUrlResult {
  /** The resolved base URL (always set when result is returned). */
  url: string;
  /** True when the URL comes from a real, configured siteUrl (not a fallback). */
  isProduction: boolean;
}

/**
 * Returns a safe base URL for use in sitemap/robots.
 * - Uses siteConfig.siteUrl if it's a valid URL without TODO_DOMAIN.
 * - Falls back to http://localhost:3000 in development.
 * - Falls back to https://example.com otherwise.
 * The `isProduction` flag tells callers whether the URL is trustworthy.
 */
export function getSafeBaseUrl(): BaseUrlResult {
  const raw = siteConfig.siteUrl;

  if (raw && !raw.includes("TODO_DOMAIN")) {
    try {
      const url = new URL(raw);
      if (url.protocol === "https:" || url.protocol === "http:") {
        return { url: url.origin, isProduction: true };
      }
    } catch {
      // invalid URL, fall through
    }
  }

  if (process.env.NODE_ENV === "development") {
    return { url: "http://localhost:3000", isProduction: false };
  }

  return { url: "https://example.com", isProduction: false };
}
