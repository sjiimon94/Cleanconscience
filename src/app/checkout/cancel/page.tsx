import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Betalning avbruten",
};

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mb-6 text-6xl">😕</div>
      <h1 className="text-3xl font-bold text-ink">Betalningen avbröts</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Ingen betalning genomfördes. Dina varor finns kvar i varukorgen.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/varukorg"
          className="rounded-xl bg-clay px-6 py-3 font-semibold text-white transition-colors hover:bg-clay-dark"
        >
          Tillbaka till varukorgen
        </Link>
        <Link href="/butik" className="text-ink-muted underline hover:text-ink">
          Fortsätt handla
        </Link>
      </div>
    </div>
  );
}
