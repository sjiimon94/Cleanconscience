export interface PodcastEpisode {
  title: string;
  slug: string;
  date: string;
  description: string;
  content: string;
  audioUrl: string;
  duration: string;
  link: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractText(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(regex);
  return match ? match[1] : "";
}

function stripHtml(input: string): string {
  let result = input;
  let previous: string;
  do {
    previous = result;
    result = result.replace(/<[^>]*>/g, "");
  } while (result !== previous);
  return result;
}

export async function fetchEpisodes(): Promise<PodcastEpisode[]> {
  const rssUrl = process.env.PODCAST_RSS_URL;
  if (!rssUrl) return [];

  try {
    const res = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.split("<item>").slice(1);
    const episodes = items.map((item) => {
      const title = extractText(item, "title");
      const description = extractText(item, "description") || extractText(item, "itunes:summary") || "";
      const content = extractText(item, "content:encoded") || description;
      const pubDate = extractText(item, "pubDate");
      const audioUrl = extractAttr(item, "enclosure", "url");
      const duration = extractText(item, "itunes:duration") || "";
      const link = extractText(item, "link") || "";

      return {
        title,
        slug: slugify(title),
        date: pubDate ? new Date(pubDate).toISOString().split("T")[0] : "",
        description: stripHtml(description).slice(0, 300),
        content,
        audioUrl,
        duration,
        link,
      };
    });

    // Sort by date descending so the newest episode comes first
    episodes.sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });

    return episodes;
  } catch {
    return [];
  }
}

export async function getEpisodeBySlug(slug: string): Promise<PodcastEpisode | null> {
  const episodes = await fetchEpisodes();
  return episodes.find((e) => e.slug === slug) || null;
}
