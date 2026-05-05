import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../../config/site";

export const metadata: Metadata = {
  title: "Stöd projektet",
  description:
    "Stötta Cleanconscience via Patreon eller Swish och hjälp till att hålla projektet igång.",
};

const swishNumber = "123 456 78 90"; // TODO: replace with real Swish number

export default function StodPage() {
  const patreonUrl = siteConfig.support.patreonUrl?.trim();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-ink">
        Stöd projektet
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        Tack för att du vill stötta Cleanconscience! Ditt bidrag hjälper mig att
        fortsätta skapa innehåll om hälsa, medvetna val och en renare vardag –
        för dig och för framtida generationer.
      </p>

      <div className="mt-12 space-y-8">
        {/* Patreon */}
        <div className="rounded-2xl border border-border-soft bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Patreon</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Bli månadsgivare på Patreon och få tillgång till exklusivt innehåll,
            tidig åtkomst till avsnitt och möjligheten att stötta arbetet
            löpande.
          </p>
          {patreonUrl ? (
            <a
              href={patreonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              Stötta på Patreon ↗
            </a>
          ) : (
            <p className="mt-4 text-sm text-ink-muted italic">
              Patreon-länk kommer snart.
            </p>
          )}
        </div>

        {/* Swish */}
        <div className="rounded-2xl border border-border-soft bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Swish</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Skicka en engångsgåva direkt via Swish – snabbt och enkelt.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-sand px-6 py-4">
            <span className="text-2xl">📱</span>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">
                Swish-nummer
              </p>
              <p className="text-xl font-bold text-ink">{swishNumber}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            Ange gärna &quot;Cleanconscience&quot; som meddelande.
          </p>
        </div>

        {/* Swish Handel */}
        <div className="rounded-2xl border border-border-soft bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Swish i kassan</h2>
          <p className="mt-2 text-sm text-ink-muted">
            När du handlar i butiken kan du betala med Swish direkt i
            betalningsflödet via Stripe – välj &quot;Swish&quot; vid kassan.
          </p>
          <Link
            href="/butik"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-soft px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand"
          >
            Gå till butiken →
          </Link>
        </div>
      </div>

      <p className="mt-12 text-sm text-ink-muted">
        Tack från hjärtat för ditt stöd! 💚
      </p>
    </div>
  );
}
