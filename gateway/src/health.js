import axios from "axios";

export function healthRouter({ productsUrl, cartUrl, ordersUrl, timeout }) {
  const router = (req, res) => {
    const client = axios.create({ timeout });
    const checks = [
      { name: "products", url: `${productsUrl}/health` },
      { name: "cart", url: `${cartUrl}/health` },
      { name: "orders", url: `${ordersUrl}/health` },
    ];

    Promise.allSettled(checks.map((c) => client.get(c.url))).then((results) => {
      const status = results.map((r, i) => ({
        service: checks[i].name,
        ok: r.status === "fulfilled",
        status: r.status === "fulfilled" ? r.value.status : null,
        error: r.status === "rejected" ? r.reason?.message ?? "error" : null,
      }));
      const allOk = status.every((s) => s.ok);
      res.status(allOk ? 200 : 207).json({
        gateway: "ok",
        services: status,
      });
    });
  };

  return { path: "/health", handler: router };
}
