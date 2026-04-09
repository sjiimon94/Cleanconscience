import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Integritetspolicy för Cleanconscience.",
};

export default function IntegritetspolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>OBS:</strong> Detta är ett utkast och en mall. Texten nedan
        måste granskas av en jurist innan den publiceras som bindande
        integritetspolicy.
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Integritetspolicy
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> [DATUM]
        </p>

        <h2>1. Inledning</h2>
        <p>
          Cleanconscience (&quot;vi&quot;, &quot;oss&quot;, &quot;vår&quot;) värnar om din personliga
          integritet. Denna integritetspolicy beskriver hur vi samlar in,
          använder och skyddar dina personuppgifter.
        </p>

        <h2>2. Vilka uppgifter vi samlar in</h2>
        <p>
          Vi kan samla in följande uppgifter: namn, e-postadress,
          leveransadress, och betalningsinformation (hanteras av Shopify).
        </p>

        <h2>3. Hur vi använder dina uppgifter</h2>
        <p>
          Dina uppgifter används för att behandla beställningar, svara på
          förfrågningar och förbättra vår tjänst.
        </p>

        <h2>4. Delning med tredje part</h2>
        <p>
          Vi delar aldrig dina personuppgifter med tredje part i
          marknadsföringssyfte. Vi kan dock dela uppgifter med tjänsteleverantörer
          (t.ex. Shopify, fraktbolag) för att uppfylla beställningar.
        </p>

        <h2>5. Dina rättigheter</h2>
        <p>
          Du har rätt att begära tillgång till, rättelse av, eller radering av
          dina personuppgifter. Kontakta oss för att utöva dessa rättigheter.
        </p>

        <h2>6. Kontakt</h2>
        <p>
          Frågor om vår integritetspolicy? Kontakta oss via{" "}
          <a href="/kontakt">kontaktsidan</a>.
        </p>
      </div>
    </div>
  );
}
