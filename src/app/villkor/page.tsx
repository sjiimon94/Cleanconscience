import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villkor",
  description: "Allmänna villkor för Cleanconscience.",
};

export default function VillkorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>OBS:</strong> Detta är ett utkast och en mall. Texten nedan
        måste granskas av en jurist innan den publiceras som bindande villkor.
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Allmänna villkor
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> [DATUM]
        </p>

        <h2>1. Allmänt</h2>
        <p>
          Dessa allmänna villkor gäller för köp via Cleanconscience webbplats.
          Genom att handla hos oss godkänner du dessa villkor.
        </p>

        <h2>2. Beställning och betalning</h2>
        <p>
          Beställningar görs via vår webbplats och betalning sker genom Shopify
          Checkout. Priser anges i SEK inklusive moms om inte annat anges.
        </p>

        <h2>3. Leverans</h2>
        <p>
          Vi levererar inom Sverige. Leveranstider och fraktkostnader anges vid
          beställning. Se vår <a href="/frakt">fraktsida</a> för mer
          information.
        </p>

        <h2>4. Ångerrätt</h2>
        <p>
          Som konsument har du 14 dagars ångerrätt enligt
          distansavtalslagen. Se vår <a href="/retur">retursida</a> för mer
          information.
        </p>

        <h2>5. Ansvarsbegränsning</h2>
        <p>
          Cleanconscience ansvarar inte för indirekta skador som kan uppstå
          vid användning av våra produkter eller tjänster.
        </p>

        <h2>6. Kontakt</h2>
        <p>
          Frågor om våra villkor? Kontakta oss via{" "}
          <a href="/kontakt">kontaktsidan</a>.
        </p>
      </div>
    </div>
  );
}
