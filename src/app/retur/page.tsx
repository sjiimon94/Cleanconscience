import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retur & ångerrätt",
  description: "Returpolicy och ångerrätt vid köp via ceciliastrandevall.se.",
};

export default function ReturPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Retur &amp; ångerrätt
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> 2026-05-20
        </p>

        <h2>1. Ångerrätt</h2>
        <p>
          Du har 14 dagars ångerrätt från det att du tagit emot varan, i
          enlighet med distansavtalslagen (SFS 2005:59). Ångerrätten gäller
          utan att du behöver ange skäl.
        </p>

        <h2>2. Hur gör jag en retur?</h2>
        <ol>
          <li>
            Meddela oss inom 14 dagar från mottagandet via e-post:{" "}
            <a href="mailto:cecilia@strandevall.se">cecilia@strandevall.se</a>
          </li>
          <li>Returnera varan i ursprungligt skick (oläst, i originalskick).</li>
          <li>Du står för returfrakt.</li>
        </ol>
        <p>
          <a
            href="https://www.konsumentverket.se/globalassets/publikationer/produkter-och-tjanster/standardblankett-for-angarande-av-avtal.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Standardblankett för ånger (PDF)
          </a>
        </p>

        <h2>3. Återbetalning</h2>
        <p>
          Vi återbetalar bokens pris (179 kr) inom 14 dagar efter att vi
          mottagit returen, med samma betalningsmetod som användes vid köpet.
          Fraktkostnaden (29 kr) återbetalas ej vid retur.
        </p>

        <h2>4. Undantag</h2>
        <p>
          Digitala produkter (t.ex. videokurser) kan inte returneras efter att
          de har aktiverats/laddats ned.
        </p>
      </div>
    </div>
  );
}
