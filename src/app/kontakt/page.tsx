import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakta Cecilia Strandevall – frågor, samarbete eller seminariebokning.",
};

const CONTACT_EMAIL = "cecilia@strandevall.se";

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Kontakt</h1>
      <p className="mt-3 leading-relaxed text-ink-light">
        Vill du ställa en fråga, föreslå ett ämne, boka ett seminarium eller
        prata samarbete? Jag läser allt och svarar så snart jag kan.
      </p>

      {/* E-post */}
      <div className="mt-10 rounded-2xl border border-border-soft bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">E-post</h2>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark"
        >
          ✉️ {CONTACT_EMAIL}
        </a>
      </div>

      {/* Företag & organisationer */}
      <div className="mt-8 rounded-2xl border border-border-soft bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">
          För företag &amp; organisationer
        </h2>
        <p className="mt-3 leading-relaxed text-ink-light">
          Jag erbjuder seminarier och samtal som kan anpassas efter era behov.
          Exempel på upplägg:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
            inspirationsföreläsning (45–60 min)
          </li>
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
            fördjupande workshop (1,5–3 timmar)
          </li>
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-sage" />
            Q&amp;A / samtalsformat
          </li>
        </ul>

        <p className="mt-6 font-medium text-ink">Skriv gärna med:</p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-clay" />
            datum eller tidsperiod
          </li>
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-clay" />
            stad / digitalt
          </li>
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-clay" />
            målgrupp och ungefärligt antal deltagare
          </li>
          <li className="flex items-start gap-3 text-ink-light">
            <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-clay" />
            vilket tema ni vill utforska
          </li>
        </ul>

        <p className="mt-6 text-sm text-ink-muted">
          Svarstid: vanligtvis inom 1–3 arbetsdagar.
        </p>
      </div>
    </div>
  );
}
