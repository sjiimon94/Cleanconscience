import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name ?? "kund";

    if (customerEmail && process.env.RESEND_API_KEY) {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const itemRows = lineItems.data
        .map(
          (item) =>
            `${item.description} × ${item.quantity} — ${(
              (item.amount_total ?? 0) / 100
            ).toFixed(0)} kr`
        )
        .join("\n");

      const totalFormatted = `${((session.amount_total ?? 0) / 100).toFixed(
        0
      )} kr`;

      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `Cleanconscience <noreply@cleanconscience.se>`,
        to: customerEmail,
        subject: "Din beställning är bekräftad! 🎉",
        text: `Hej ${customerName}!

Tack för din beställning hos Cleanconscience.

Orderöversikt:
${itemRows}

Total: ${totalFormatted}
Frakt: Gratis (Sverige)

Vi packar och skickar din beställning inom 1–3 arbetsdagar.

Har du frågor? Skriv till oss på cecilia@strandevall.se

Varmt,
Cecilia & Cleanconscience`,
      });
    }
  }

  return NextResponse.json({ received: true });
}
