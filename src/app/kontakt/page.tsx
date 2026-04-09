import type { Metadata } from "next";
import { siteConfig } from "../../../config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta Cleanconscience – vi svarar gärna på dina frågor.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Kontakt
      </h1>
      <p className="mt-2 text-gray-600">
        Har du frågor, synpunkter eller vill samarbeta? Vi svarar gärna!
      </p>

      <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Skicka ett mejl
        </h2>
        <p className="mt-2 text-gray-600">
          Det enklaste sättet att nå oss är via e-post:
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          ✉️ {siteConfig.contactEmail}
        </a>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Följ oss
        </h2>
        <p className="mt-2 text-gray-600">
          Besök vår{" "}
          <a
            href="/socialt"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            sida för sociala medier
          </a>{" "}
          för att följa oss och ta del av uppdateringar.
        </p>
      </div>
    </div>
  );
}
