import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villkor",
  description: "Allmänna villkor för köp via ceciliastrandevall.se.",
};

export default function VillkorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Allmänna villkor
      </h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          <strong>Senast uppdaterad:</strong> 2026-05-20
        </p>

        <p>
          <strong>Säljare:</strong> cleanconscience AB, org.nr 559163-8712,
          Lendahlsgatan 13, 441 31 Alingsås.
          Kontakt:{" "}
          <a href="mailto:cecilia@strandevall.se">cecilia@strandevall.se</a>
        </p>

        <h2>1. Allmänt</h2>
        <p>
          Dessa allmänna villkor gäller vid köp via ceciliastrandevall.se. Genom
          att handla hos oss godkänner du dessa villkor. Avtalet träder i kraft
          när betalning är genomförd.
        </p>

        <h2>2. Priser och moms</h2>
        <p>
          Alla priser anges i svenska kronor (SEK) inklusive 6% moms (fysiska
          böcker enligt mervärdesskattelagen 7 kap. 1 § 3p).
          Kvitto/orderbekräftelse skickas per e-post.
        </p>

        <h2>3. Betalning</h2>
        <p>
          Betalning sker via Stripe Checkout. Vi accepterar Visa, Mastercard och
          Swish. Vi lagrar inga kortuppgifter – dessa hanteras uteslutande av
          Stripe.
        </p>

        <h2>4. Leverans</h2>
        <p>
          Vi levererar enbart inom Sverige. Leveranstid: 2–5 vardagar efter
          bekräftad beställning. Fast fraktkostnad: 29 kr per order. Du ansvarar
          för att angiven leveransadress är korrekt.
        </p>

        <h2>5. Ångerrätt</h2>
        <p>
          Du har 14 dagars ångerrätt från det att du tagit emot varan, i
          enlighet med distansavtalslagen (SFS 2005:59). Se vår{" "}
          <a href="/retur">retursida</a> för instruktioner. Digitala produkter
          (t.ex. videokurser) kan inte returneras efter aktivering.
        </p>

        <h2>6. Ansvarsbegränsning</h2>
        <p>
          cleanconscience AB ansvarar inte för indirekta skador. Vi reserverar
          oss för eventuella prisändringar och tillfällig lagerbrist.
        </p>

        <h2>7. Tillämplig lag och tvist</h2>
        <p>
          Svensk rätt tillämpas. Tvist kan hänskjutas till Allmänna
          reklamationsnämnden (ARN):{" "}
          <a
            href="https://www.arn.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            arn.se
          </a>
          , eller hanteras i allmän domstol.
        </p>

        <h2>8. Kontakt</h2>
        <p>
          Frågor? Kontakta oss via <a href="/kontakt">kontaktsidan</a> eller{" "}
          <a href="mailto:cecilia@strandevall.se">cecilia@strandevall.se</a>.
        </p>
      </div>
    </div>
  );
}
