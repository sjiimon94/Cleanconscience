import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frakt",
  description: "Fraktinformation för ceciliastrandevall.se – frakt inom Sverige.",
};

export default function FraktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Frakt &amp; leverans
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> 2026-05-20
        </p>

        <h2>1. Leveransområde</h2>
        <p>
          Vi levererar enbart inom Sverige.
        </p>

        <h2>2. Fraktkostnad</h2>
        <p>
          Fast fraktkostnad: <strong>29 kr</strong> per beställning. Kostnaden
          visas tydligt i varukorgen och i kassan innan du slutför din
          beställning.
        </p>

        <h2>3. Leveranstid</h2>
        <p>
          Normal leveranstid är 2–5 vardagar efter bekräftad beställning. Vid
          hög belastning kan leveranstiden vara något längre.
        </p>

        <h2>4. Spårning</h2>
        <p>
          Du får ett spårningsnummer via e-post när din beställning har skickats.
        </p>

        <h2>5. Frågor</h2>
        <p>
          Frågor om frakt? Kontakta oss på{" "}
          <a href="mailto:cecilia@strandevall.se">cecilia@strandevall.se</a>{" "}
          eller via <a href="/kontakt">kontaktsidan</a>.
        </p>
      </div>
    </div>
  );
}
