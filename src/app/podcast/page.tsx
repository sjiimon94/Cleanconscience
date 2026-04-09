import type { Metadata } from "next";
import Link from "next/link";
import { fetchEpisodes } from "@/lib/podcast";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Lyssna på Cleanconscience-podden – samtal om hälsa, medvetenhet och samhälle.",
};

export default async function PodcastPage() {
  const episodes = await fetchEpisodes();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Podcast
      </h1>
      <p className="mt-2 text-gray-600">
        Samtal om hälsa, medvetenhet och samhälle. Nya avsnitt publiceras
        löpande.
      </p>

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
