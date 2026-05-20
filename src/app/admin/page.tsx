"use client";

import { useState, useEffect, useCallback } from "react";

interface OrderItem {
  name: string;
  quantity: number;
  amountTotal: number;
}

interface Address {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

interface Order {
  id: string;
  createdAt: string;
  name: string | null;
  address: Address | null;
  email: string | null;
  items: OrderItem[];
  amount: number;
  sent: boolean;
}

function formatAddress(address: Address | null): string {
  if (!address) return "–";
  return [address.line1, address.line2, address.postal_code, address.city]
    .filter(Boolean)
    .join(", ");
}

function formatAmount(amountInOre: number): string {
  return `${Math.floor(amountInOre / 100)} kr`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<string | null>(null);

  // Load password from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("adminPassword");
    if (stored) setPassword(stored);
  }, []);

  const fetchOrders = useCallback(
    async (pwd: string) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/orders", {
          headers: { Authorization: `Bearer ${pwd}` },
        });
        if (res.status === 401) {
          setError("Fel lösenord. Försök igen.");
          sessionStorage.removeItem("adminPassword");
          setPassword("");
          return;
        }
        if (!res.ok) {
          setError("Kunde inte hämta ordrar.");
          return;
        }
        const data = await res.json();
        setOrders(data);
      } catch {
        setError("Nätverksfel. Försök igen.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (password) fetchOrders(password);
  }, [password, fetchOrders]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem("adminPassword", inputPassword);
    setPassword(inputPassword);
    setInputPassword("");
  }

  async function markAsSent(id: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ sent: true }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, sent: true } : o))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  if (!password) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-white px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-sand/50 p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-ink">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-ink"
              >
                Lösenord
              </label>
              <input
                id="password"
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="w-full rounded-lg border border-border-soft bg-warm-white px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                required
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-sage px-4 py-2 font-semibold text-white transition-colors hover:bg-sage-dark"
            >
              Logga in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink">Ordrar</h1>
          <div className="flex gap-3">
            <button
              onClick={() => fetchOrders(password)}
              className="rounded-lg border border-border-soft bg-sand px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand-dark"
            >
              Uppdatera
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("adminPassword");
                setPassword("");
                setOrders([]);
              }}
              className="rounded-lg border border-border-soft bg-warm-white px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Logga ut
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-ink-muted">Laddar ordrar…</p>
        ) : orders.length === 0 ? (
          <p className="text-ink-muted">Inga ordrar hittades.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border-soft">
            <table className="min-w-full divide-y divide-border-soft text-sm">
              <thead className="bg-sand/50">
                <tr>
                  {[
                    "Datum",
                    "Namn",
                    "Adress",
                    "E-post",
                    "Belopp",
                    "Status",
                    "Åtgärd",
                  ].map((col) => (
                    <th
                      key={col}
                      className="whitespace-nowrap px-4 py-3 text-left font-semibold text-ink/90"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft bg-warm-white">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-sand/20">
                    <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink">
                      {order.name ?? "–"}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {formatAddress(order.address)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                      {order.email ?? "–"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink">
                      {formatAmount(order.amount)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {order.sent ? (
                        <span className="inline-flex items-center rounded-full bg-sage-light px-2.5 py-0.5 text-xs font-medium text-sage-dark">
                          Skickad ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-clay-light px-2.5 py-0.5 text-xs font-medium text-clay-dark">
                          Ej skickad
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {!order.sent && (
                        <button
                          onClick={() => markAsSent(order.id)}
                          disabled={updating === order.id}
                          className="rounded-lg bg-sage px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-sage-dark disabled:opacity-50"
                        >
                          {updating === order.id ? "…" : "Markera skickad"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
