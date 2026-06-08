import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !authHeader) return false;
  return authHeader === `Bearer ${adminPassword}`;
}

function getOrdersFilePath() {
  return path.join(process.cwd(), "data", "orders.json");
}

function readOrders() {
  const filePath = getOrdersFilePath();
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

function writeOrders(orders: unknown[]) {
  const filePath = getOrdersFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only allow updating the 'sent' field
  if (typeof body.sent !== "boolean") {
    return NextResponse.json(
      { error: "Invalid request: 'sent' must be a boolean" },
      { status: 400 }
    );
  }

  const orders = readOrders();
  const index = orders.findIndex((o: { id: string }) => o.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  orders[index] = { ...orders[index], sent: body.sent };
  writeOrders(orders);

  return NextResponse.json(orders[index]);
}
