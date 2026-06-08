import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Integritetspolicy för ceciliastrandevall.se.",
};

export default function IntegritetspolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Integritetspolicy
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> 2026-05-20
        </p>

        <p>
          cleanconscience AB, org.nr 559163-8712, Lendahlsgatan 13, 441 31
          Alingsås (&quot;vi&quot;, &quot;oss&quot;) är personuppgiftsansvarig
          för behandlingen av dina personuppgifter på ceciliastrandevall.se.
        </p>

        <h2>1. Vilka uppgifter vi samlar in</h2>
        <p>
          Vid köp behandlar vi: namn, leveransadress, e-postadress och
          betalningsinformation (hanteras av Stripe – vi lagrar inga
          kortuppgifter).
        </p>

        <h2>2. Ändamål och rättslig grund</h2>
        <ul>
          <li>
            Fullgöra köpeavtal (art. 6.1.b GDPR): hantera beställning,
            leverans, kundtjänst.
          </li>
          <li>
            Rättslig förpliktelse (art. 6.1.c GDPR): bokföring och redovisning.
          </li>
        </ul>

        <h2>3. Lagringstid</h2>
        <p>
          Orderuppgifter sparas i 7 år i enlighet med bokföringslagen
          (1999:1078).
        </p>

        <h2>4. Utlämning till tredje part</h2>
        <p>Vi delar uppgifter med:</p>
        <ul>
          <li>
            Stripe Payments Europe Ltd (betalning) – se Stripes
            integritetspolicy:{" "}
            <a
              href="https://stripe.com/se/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              stripe.com/se/privacy
            </a>
          </li>
          <li>Postoperatör (leverans)</li>
        </ul>
        <p>Vi säljer aldrig dina uppgifter.</p>

        <h2>5. Dina rättigheter (GDPR)</h2>
        <p>
          Du har rätt att begära registerutdrag, rättelse, radering,
          begränsning av behandling samt dataportabilitet. Kontakta oss på{" "}
          <a href="mailto:cecilia@strandevall.se">cecilia@strandevall.se</a>.
          Du kan klaga hos Integritetsskyddsmyndigheten (IMY):{" "}
          <a
            href="https://www.imy.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            imy.se
          </a>
          .
        </p>

        <h2>6. Cookies</h2>
        <p>
          Vi använder inga spårnings- eller reklamcookies. Stripe kan sätta
          tekniskt nödvändiga cookies under betalningsprocessen. Trafikanalys
          sker via Umami Analytics – cookiefritt och GDPR-kompatibelt, ingen
          samtyckesbanner behövs.
        </p>
      </div>
    </div>
  );
}
