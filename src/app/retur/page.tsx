import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retur & ångerrätt",
  description: "Returpolicy och ångerrätt för Cleanconscience.",
};

export default function ReturPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>OBS:</strong> Detta är ett utkast och en mall. Texten nedan
        måste granskas av en jurist innan den publiceras som bindande
        returpolicy.
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Retur &amp; ångerrätt
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> [DATUM]
        </p>

        <h2>1. Ångerrätt</h2>
        <p>
          Som konsument har du enligt distansavtalslagen rätt att ångra ditt köp
          inom 14 dagar från det att du mottagit varan.
        </p>

        <h2>2. Hur gör jag en retur?</h2>
        <p>
          Kontakta oss via <a href="/kontakt">kontaktsidan</a> för att meddela
          att du vill returnera en vara. Vi skickar instruktioner för retur.
        </p>

        <h2>3. Skick på returvaror</h2>
        <p>
          Varan ska returneras i samma skick som den levererades. Varor som är
          använda, skadade eller saknar originalförpackning kan nekas retur.
        </p>

        <h2>4. Återbetalning</h2>
        <p>
          Återbetalning sker inom 14 dagar efter att vi mottagit den returnerade
          varan, med samma betalningsmetod som användes vid köpet.
        </p>

        <h2>5. Undantag</h2>
        <p>
          Digitala produkter (t.ex. videokurser) kan inte returneras efter att
          de har aktiverats.
        </p>
      </div>
    </div>
  );
}
