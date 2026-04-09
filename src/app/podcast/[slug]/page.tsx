import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchEpisodes, getEpisodeBySlug } from "@/lib/podcast";
import { siteConfig } from "../../../../config/site";

interface PodcastEpisodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PodcastEpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) return { title: "Avsnitt saknas" };
  return {
    title: episode.title,
    description: episode.description,
  };
}

export async function generateStaticParams() {
  const episodes = await fetchEpisodes();
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export default async function PodcastEpisodePage({
  params,
}: PodcastEpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) notFound();

  const spotifyShowId = siteConfig.podcast.spotifyShowId;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/podcast"
        className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
      >
        ← Alla avsnitt
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
        {episode.title}
      </h1>
      <p className="mt-2 text-sm text-gray-400">
        {episode.date}
        {episode.duration && ` · ${episode.duration}`}
      </p>

      {/* Audio player */}
      {spotifyShowId ? (
        <div className="mt-6">
          <iframe
            title={episode.title}
            src={`https://open.spotify.com/embed/show/${spotifyShowId}?theme=0`}
            width="100%"
            height="152"
            allow="encrypted-media"
            className="rounded-xl"
          />
        </div>
      ) : episode.audioUrl ? (
        <audio controls preload="none" className="mt-6 w-full">
          <source src={episode.audioUrl} />
        </audio>
      ) : null}

      <div
        className="prose prose-gray mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: episode.content }}
      />
    </article>
  );
}
