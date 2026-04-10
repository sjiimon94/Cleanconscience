import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchEpisodes } from "@/lib/podcast";
import { siteConfig } from "@/config/site";

const podcastTitle = siteConfig.podcast.title ?? "Podcast";
const podcastDescription =
  siteConfig.podcast.description ??
  "Samtal om hälsa, medvetenhet och samhälle. Nya avsnitt publiceras löpande.";
const podcastImage = siteConfig.podcast.image;

export const metadata: Metadata = {
  title: podcastTitle,
  description: podcastDescription,
};

export default async function PodcastPage() {
  const episodes = await fetchEpisodes();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Podcast header – bild + titel + beskrivning */}
      <section className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        {podcastImage && (
          <div className="shrink-0">
            <Image
              src={podcastImage}
              alt={podcastTitle}
              width={280}
              height={280}
              className="rounded-xl shadow-md"
              priority
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {podcastTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">{podcastDescription}</p>
        </div>
      </section>

      {/* Avsnittslista */}
      {episodes.length > 0 ? (
        <ul className="mt-10 divide-y divide-gray-200">
          {episodes.map((ep) => (
            <li key={ep.slug} className="py-6">
              <Link
                href={`/podcast/${ep.slug}`}
                className="group block"
              >
                <p className="text-xs text-gray-400">{ep.date}</p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                  {ep.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {ep.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <p className="text-gray-500">
            Inga podcastavsnitt tillgängliga just nu.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Kom tillbaka snart – vi publicerar nya avsnitt löpande!
          </p>
        </div>
      )}
    </div>
  );
}
