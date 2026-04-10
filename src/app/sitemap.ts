import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { fetchEpisodes } from "@/lib/podcast";
import { getSafeBaseUrl } from "@/lib/safe-base-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { url: baseUrl } = getSafeBaseUrl();

  const staticRoutes = [
    "/",
    "/butik",
    "/kurser",
    "/podcast",
    "/blogg",
    "/socialt",
    "/om",
    "/kontakt",
    "/integritetspolicy",
    "/villkor",
    "/retur",
    "/frakt",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  // Dynamic blog routes
  const posts = getAllPosts();
  for (const post of posts) {
    entries.push({
      url: `${baseUrl}/blogg/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Dynamic podcast routes
  try {
    const episodes = await fetchEpisodes();
    for (const episode of episodes) {
      entries.push({
        url: `${baseUrl}/podcast/${episode.slug}`,
        lastModified: episode.date ? new Date(episode.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // If podcast fetch fails, just skip podcast routes
  }

  return entries;
}
