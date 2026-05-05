import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const SHIPPING_AMOUNT_ORE = 2900; // 29 kr in öre

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Inga artiklar i varukorgen" },
        { status: 400 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "swish"],
      locale: "sv",
      line_items: [
        ...items.map(
          (item: {
            name: string;
            priceInOre: number;
            quantity: number;
            image?: string;
          }) => ({
            price_data: {
              currency: "sek",
              product_data: {
                name: item.name,
                images: item.image ? [`${origin}${item.image}`] : [],
              },
              unit_amount: item.priceInOre,
            },
            quantity: item.quantity,
          })
        ),
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: "Frakt (Sverige)",
            },
            unit_amount: SHIPPING_AMOUNT_ORE,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        source: "cleanconscience-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Kunde inte skapa checkout-session" },
      { status: 500 }
    );
  }
}
