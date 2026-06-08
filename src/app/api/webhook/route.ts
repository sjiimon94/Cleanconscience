import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

interface OrderItem {
  name: string;
  quantity: number;
  amountTotal: number;
}

interface Order {
  id: string;
  createdAt: string;
  name: string | null;
  address: Stripe.Address | null;
  email: string | null;
  items: OrderItem[];
  amount: number;
  sent: boolean;
}

function getOrdersFilePath() {
  return path.join(process.cwd(), "data", "orders.json");
}

function readOrders(): Order[] {
  const filePath = getOrdersFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Order[];
  } catch {
    return [];
  }
}

function saveOrder(order: Order) {
  const filePath = getOrdersFilePath();
  const orders = readOrders();
  orders.push(order);
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
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

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    if (customerEmail && process.env.RESEND_API_KEY) {
      const itemRows = lineItems.data
        .map(
          (item) =>
            `${item.description} × ${item.quantity} — ${Math.floor(
              (item.amount_total ?? 0) / 100
            )} kr`
        )
        .join("\n");

      const totalFormatted = `${Math.floor((session.amount_total ?? 0) / 100)} kr`;

      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `Cecilia Strandevall <noreply@ceciliastrandevall.se>`,
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
Cecilia Strandevall`,
      });
    }

    // Save order to data/orders.json
    const sessionWithShipping = session as Stripe.Checkout.Session & {
      shipping_details?: { name?: string | null; address?: Stripe.Address | null } | null;
    };
    const order: Order = {
      id: session.id,
      createdAt: new Date().toISOString(),
      name:
        sessionWithShipping.shipping_details?.name ??
        session.customer_details?.name ??
        null,
      address: sessionWithShipping.shipping_details?.address ?? null,
      email: session.customer_details?.email ?? null,
      items: lineItems.data.map((item) => ({
        name: item.description ?? "",
        quantity: item.quantity ?? 1,
        amountTotal: item.amount_total ?? 0,
      })),
      amount: session.amount_total ?? 0,
      sent: false,
    };
    saveOrder(order);
  }

  return NextResponse.json({ received: true });
}
