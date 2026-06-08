import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import CartClearer from "@/components/CartClearer";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      redirect("/");
    }
  } catch {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <CartClearer />
      <div className="mb-6 text-6xl">🎉</div>
      <h1 className="text-3xl font-bold text-ink">Tack för din beställning!</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Din betalning är bekräftad. Du får snart ett orderbekräftelsemail.
      </p>
      <p className="mt-2 text-ink-muted">
        Vi packar och skickar din beställning inom 1–3 arbetsdagar. Frakt är
        gratis inom Sverige.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/butik"
          className="rounded-xl bg-clay px-6 py-3 font-semibold text-white transition-colors hover:bg-clay-dark"
        >
          Fortsätt handla
        </Link>
        <Link href="/" className="text-ink-muted underline hover:text-ink">
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}
