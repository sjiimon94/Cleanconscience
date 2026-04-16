import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Om Cecilia",
  description:
    "Lär känna Cecilia Strandevall och Cleanconscience – medvetna val, kunskap och gemenskap.",
};

export default function OmPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Intro: image + text, two-column desktop, stacked mobile */}
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="shrink-0">
          <Image
            src="/images/profilbild.jpeg"
            alt="Porträtt av Cecilia Strandevall"
            width={320}
            height={320}
            className="rounded-2xl border border-border-soft shadow-md object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            Om Cecilia
          </h1>
          <p className="mt-4 leading-relaxed text-ink-light">
            Hej! Vad kul att du har hittat hit, varmt välkommen. Jag heter
            Cecilia Strandevall och jag driver Cleanconscience – en plats för
            dig som vill göra mer medvetna val, hitta kunskap som går på djupet
            och känna dig trygg i dina beslut.
          </p>
        </div>
      </div>

      {/* Family + motivation */}
      <div className="mt-12 space-y-10">
        <p className="leading-relaxed text-ink-light">
          För mig börjar allt i det som är viktigast: mina barn. När man blir
          förälder förändras perspektivet – och med det kommer ofta frågor. Min
          egen resa tog fart när jag började läsa på om
          barnvaccinationsprogrammet. Det väckte en nyfikenhet som snabbt växte
          till en större, ärlig och ibland utmanande undersökning av hur vi
          formar vår hälsa, våra vanor och vår vardag.
        </p>

        <p className="leading-relaxed text-ink-light">
          Jag har inget intresse av att &quot;vinna debatter&quot;. Jag vill
          förstå. Jag vill kunna göra val som känns balanserade, förankrade och
          mänskliga – och jag vill dela den resan med andra som också söker
          klarhet.
        </p>

        {/* Min vardag */}
        <section>
          <h2 className="text-2xl font-bold text-ink">
            Min vardag – företag, familj och skapande
          </h2>
          <p className="mt-3 leading-relaxed text-ink-light">
            Jag lever ett liv där flera saker får plats samtidigt: mamma,
            företagare, författare och skapare. Jag strävar efter en vardag där
            arbete och ambition inte tar över det som betyder mest.
            Cleanconscience är därför inte bara ett projekt – det är ett sätt
            att samla det jag gör och står för på ett ställe, utan stress och
            utan fasad.
          </p>
        </section>

        {/* Vad du hittar */}
        <section>
          <h2 className="text-2xl font-bold text-ink">
            Vad du hittar på Cleanconscience
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
              <span className="text-ink-light">
                <strong className="text-ink">Barnböcker och merch</strong> –
                barnböcker som väcker samtal, och produkter med min logga som
                skapar samhörighet och gör det möjligt att stötta mitt arbete.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
              <span className="text-ink-light">
                <strong className="text-ink">
                  Vattenfiltrering och utvalda produkter
                </strong>{" "}
                – sådant jag själv tror på och vill kunna stå för.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
              <span className="text-ink-light">
                <strong className="text-ink">Kurser och seminarier</strong> –
                för dig som vill fördjupa dig, och för företag/organisationer som
                vill skapa samtal, insikter och riktning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
              <span className="text-ink-light">
                <strong className="text-ink">Podcast och texter</strong> –
                reflektioner, intervjuer och perspektiv som får ta tid.
              </span>
            </li>
          </ul>
        </section>

        {/* Studio Cecilia */}
        <section>
          <h2 className="text-2xl font-bold text-ink">
            Studio Cecilia – en del av mig
          </h2>
          <p className="mt-3 leading-relaxed text-ink-light">
            Parallellt med Cleanconscience är jag också frisör och driver Studio
            Cecilia i Alingsås. Mötet med människor är en röd tråd i allt jag
            gör – oavsett om det sker i en frisörstol, i en föreläsningssal
            eller genom en bok.
          </p>
        </section>

        {/* Min kompass */}
        <section>
          <h2 className="text-2xl font-bold text-ink">Min kompass</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-3 text-ink-light">
              <span className="block h-2 w-2 shrink-0 rounded-full bg-clay" />
              nyfikenhet före tvärsäkerhet
            </li>
            <li className="flex items-center gap-3 text-ink-light">
              <span className="block h-2 w-2 shrink-0 rounded-full bg-clay" />
              balans före extrem
            </li>
            <li className="flex items-center gap-3 text-ink-light">
              <span className="block h-2 w-2 shrink-0 rounded-full bg-clay" />
              respekt för att vi väljer olika
            </li>
            <li className="flex items-center gap-3 text-ink-light">
              <span className="block h-2 w-2 shrink-0 rounded-full bg-clay" />
              familjen först
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-border-soft bg-sand p-8">
          <p className="leading-relaxed text-ink-light">
            Om du är här för att du också söker mer lugn, mer tydlighet och mer
            sammanhang – varmt välkommen.
          </p>
          <p className="mt-4 leading-relaxed text-ink-light">
            Vill du samarbeta, boka ett seminarium eller bara skriva några rader?{" "}
            <a
              href="/kontakt"
              className="font-semibold text-clay hover:text-clay-dark"
            >
              Hör gärna av dig
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
