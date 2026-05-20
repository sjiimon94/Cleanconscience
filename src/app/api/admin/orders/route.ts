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

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = readOrders();
  // Sort newest first
  orders.sort(
    (
      a: { createdAt: string },
      b: { createdAt: string }
    ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(orders);
}
