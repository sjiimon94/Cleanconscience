import type { Metadata } from "next";
import { siteConfig } from "../../../config/site";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Lär känna Cleanconscience – medvetna val för en renare framtid.",
};

export default function OmPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Om Cleanconscience
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Cleanconscience</strong> handlar om medvetna val för en renare
          framtid. Vi tror på att kunskap är nyckeln till positiv förändring – i
          hemmet, i vardagen och i samhället.
        </p>

        <h2>Vår vision</h2>
        <p>
          Vi vill ge människor verktygen och kunskapen de behöver för att fatta
          informerade beslut om sin hälsa och livsstil. Genom böcker,
          vattenfiltrering, kurser och vår podcast sprider vi information och
          skapar samtal som gör skillnad.
        </p>

        <h2>Vad vi gör</h2>
        <ul>
          <li>
            <strong>Böcker och produkter</strong> – Vi säljer barnböcker,
            vattenfilter och andra produkter som hjälper dig leva mer medvetet.
          </li>
          <li>
            <strong>Videokurser</strong> – Fördjupande kurser om viktiga ämnen
            som barnvaccinationer och hälsa.
          </li>
          <li>
            <strong>Podcast</strong> – Samtal om hälsa, medvetenhet och
            samhälle.
          </li>
          <li>
            <strong>Blogg</strong> – Artiklar och tankar kring en renare
            livsstil.
          </li>
        </ul>

        <h2>Kontakt</h2>
        <p>
          Har du frågor eller vill samarbeta? Hör av dig till oss på{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>{" "}
          eller besök vår{" "}
          <a href="/kontakt">kontaktsida</a>.
        </p>
      </div>
    </div>
  );
}
