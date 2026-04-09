import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frakt",
  description: "Fraktinformation för Cleanconscience – frakt inom Sverige.",
};

export default function FraktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>OBS:</strong> Detta är ett utkast och en mall. Fraktinformation
        och priser måste uppdateras innan lansering.
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Frakt
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> [DATUM]
        </p>

        <h2>1. Leveransområde</h2>
        <p>
          Vi fraktar enbart inom <strong>Sverige</strong>.
        </p>

        <h2>2. Fraktkostnad</h2>
        <p>
          Fraktkostnaden beräknas i kassan baserat på vikt och storlek.
          Eventuella kampanjer med fri frakt annonseras på webbplatsen.
        </p>

        <h2>3. Leveranstid</h2>
        <p>
          Normal leveranstid är 2–5 arbetsdagar efter att beställningen har
          behandlats. Vid hög belastning kan leveranstiden vara längre.
        </p>

        <h2>4. Spårning</h2>
        <p>
          Du får ett spårningsnummer via e-post när din beställning har
          skickats.
        </p>

        <h2>5. Frågor</h2>
        <p>
          Frågor om frakt? Kontakta oss via{" "}
          <a href="/kontakt">kontaktsidan</a>.
        </p>
      </div>
    </div>
  );
}
