import type { Metadata } from "next";
import { siteConfig } from "../../config/site";

export const metadata: Metadata = {
  title: "Socialt",
  description: "Följ Cleanconscience på sociala medier.",
};

const allSocialPlatforms = [
  { label: "Instagram", key: "instagram" as const, icon: "📸" },
  { label: "TikTok", key: "tiktok" as const, icon: "🎵" },
  { label: "YouTube", key: "youtube" as const, icon: "▶️" },
  { label: "X", key: "x" as const, icon: "💬" },
  { label: "Facebook", key: "facebook" as const, icon: "👥" },
];

export default function SocialtPage() {
  const configured = allSocialPlatforms
    .map(({ label, key, icon }) => ({
      label,
      icon,
      href: siteConfig.social[key],
    }))
    .filter(
      (link): link is { label: string; icon: string; href: string } =>
        !!link.href
    );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Sociala medier
      </h1>
      <p className="mt-2 text-gray-600">
        Följ oss för uppdateringar, tips och inspiration.
      </p>

      {configured.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {configured.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{link.icon}</span>
              <div>
                <p className="font-semibold text-gray-900">{link.label}</p>
                <p className="text-sm text-emerald-600">Följ oss →</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <p className="text-gray-500">
            Sociala medier-länkar är inte konfigurerade ännu.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Vi uppdaterar den här sidan snart!
          </p>
        </div>
      )}

      {/* Fler plattformar – visas enbart på /socialt */}
      <h2 className="mt-14 text-2xl font-bold tracking-tight text-gray-900">
        Fler plattformar
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href="https://www.instagram.com/ecofilterofsweden/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-2xl">📸</span>
          <div>
            <p className="font-semibold text-gray-900">
              Ecofilter of Sweden (Instagram)
            </p>
            <p className="text-sm text-emerald-600">Följ oss →</p>
          </div>
        </a>
        <a
          href="https://rumble.com/user/ceciliastrandevall?e9s=src_v1_cbl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-2xl">🎬</span>
          <div>
            <p className="font-semibold text-gray-900">Rumble</p>
            <p className="text-sm text-emerald-600">Följ oss →</p>
          </div>
        </a>
      </div>
    </div>
  );
}
