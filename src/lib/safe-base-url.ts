import { siteConfig } from "../../config/site";

/**
 * Returns a safe base URL for use in sitemap/robots.
 * - Uses siteConfig.siteUrl if it's a valid URL without TODO_DOMAIN.
 * - Falls back to http://localhost:3000 in development.
 * - Falls back to https://example.com otherwise.
 * - Returns null if no safe URL can be determined.
 */
export function getSafeBaseUrl(): string | null {
  const raw = siteConfig.siteUrl;

  if (raw && !raw.includes("TODO_DOMAIN")) {
    try {
      const url = new URL(raw);
      if (url.protocol === "https:" || url.protocol === "http:") {
        // Remove trailing slash for consistency
        return url.origin;
      }
    } catch {
      // invalid URL, fall through
    }
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://example.com";
}
