import { siteConfig } from "@/config/site";

export interface PodcastEpisode {
  title: string;
  slug: string;
  date: string;
  episodeNumber: number;
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
  const regex = new RegExp(`<${tag}\\b[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}\\s*>`, "i");
  const match = xml.match(regex);
  return match ? decodeXmlEntities(match[1].trim()) : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}\\b[^>]*\\b${attr}\\s*=\\s*("[^"]*"|'[^']*')`, "i");
  const match = xml.match(regex);
  return match ? decodeXmlEntities(match[1].slice(1, -1)) : "";
}

function decodeXmlEntities(input: string): string {
  return input.replace(
    /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi,
    (entity, value: string) => {
      if (value[0] === "#") {
        const codePoint =
          value[1].toLowerCase() === "x"
            ? Number.parseInt(value.slice(2), 16)
            : Number.parseInt(value.slice(1), 10);
        return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : entity;
      }

      const namedEntities: Record<string, string> = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
      };
      return namedEntities[value.toLowerCase()] ?? entity;
    },
  );
}

function formatDate(value: string): string {
  if (!value) return "";
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? "" : new Date(timestamp).toISOString().split("T")[0];
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
  const rssUrl = siteConfig.podcast.rssUrl;
  if (!rssUrl) return [];

  try {
    const res = await fetch(rssUrl, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.match(/<item\b[^>]*>[\s\S]*?<\/item\s*>/gi) ?? [];
    const episodes = items.map((item) => {
      const title = extractText(item, "title");
      const description = extractText(item, "description") || extractText(item, "itunes:summary") || "";
      const content = extractText(item, "content:encoded") || description;
      const pubDate = extractText(item, "pubDate");
      const audioUrl = extractAttr(item, "enclosure", "url");
      const duration = extractText(item, "itunes:duration") || "";
      const link = extractText(item, "link") || "";
      const officialNumber = extractText(item, "itunes:episode") || extractText(item, "podcast:episode");
      const parsedNumber = /^\d+$/.test(officialNumber)
        ? Number.parseInt(officialNumber, 10)
        : Number.NaN;

      return {
        title,
        slug: slugify(title),
        date: formatDate(pubDate),
        officialNumber:
          Number.isInteger(parsedNumber) && parsedNumber > 0
            ? parsedNumber
            : undefined,
        description: stripHtml(description).slice(0, 300),
        content,
        audioUrl,
        duration,
        link,
      };
    });

    // Keep newest episodes first; missing numbers follow their chronological position.
    episodes.sort((a, b) => {
      if (a.date && b.date) return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });

    return episodes.map(({ officialNumber, ...episode }, index) => ({
      ...episode,
      episodeNumber: officialNumber ?? episodes.length - index,
    }));
  } catch {
    return [];
  }
}

export async function getEpisodeBySlug(slug: string): Promise<PodcastEpisode | null> {
  const episodes = await fetchEpisodes();
  return episodes.find((e) => e.slug === slug) || null;
}
