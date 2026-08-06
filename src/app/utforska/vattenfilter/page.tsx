import type { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Vattenfilter",
  description:
    "Renare vatten för ett renare liv — läs om vattenfiltrering via Ecofilters of Sweden.",
};

export default function VattenfilterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Vattenfilter</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Rent vatten är grunden för ett hälsosamt liv. Jag samarbetar med
          Ecofilters of Sweden som erbjuder vattenfilter anpassade för svenska hushåll.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-border-soft bg-white p-8 shadow-sm sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.15em] text-ink-muted">
              Partner
            </p>
            <h2 className="mt-2 text-xl font-bold text-ink">
              Ecofilters of Sweden
            </h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Ecofilters of Sweden erbjuder ett brett sortiment av vattenfilter för
              kranvatten, hela huset och portabla lösningar. Besök deras webbplats
              för att hitta rätt filter för just dina behov.
            </p>
            <div className="mt-6">
              <a
                href="https://www.ecofilterofsweden.se"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-dark"
              >
                Besök Ecofilters of Sweden ↗
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
