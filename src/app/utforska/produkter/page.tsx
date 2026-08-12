import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Produkter",
  description:
    "Cecilia Strandevalls bok och andra produkter. Beställ via extern bokhandel.",
};

export default function ProdukterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Produkter</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Här hittar du mina produkter. Just nu finns min bilderbok — fler produkter kan tillkomma.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="mt-12 flex flex-col gap-8 rounded-2xl border border-border-soft bg-white p-8 shadow-sm sm:flex-row sm:items-start">
          <div className="h-64 w-48 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-72 sm:w-52">
            <Image
              src="/images/books/stina-och-mamma-stadar.svg"
              alt="Stina och mamma städar — bokomslag"
              width={400}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-ink">Stina och mamma städar</h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Stina tycker att vuxna är lite tråkiga ibland. De bara jobbar, handlar
              och städar. Själv tycker Stina att livet borde handla mer om att leka
              och ha roligt. Men en dag visar mamma att städning faktiskt kan vara
              något helt annat än ett tråkigt måste.
            </p>
            <p className="mt-3 text-ink-muted leading-relaxed">
              En varm och igenkännbar bilderbok om vardagslivet i en familj — om
              samarbete, skratt och om hur vardagspusslet kan bli något fint när man
              gör det tillsammans.
            </p>
            <div className="mt-6">
              <a
                href="https://www.adlibris.com/se/sok?q=stina+och+mamma+st%C3%A4dar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
              >
                Beställ boken ↗
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
