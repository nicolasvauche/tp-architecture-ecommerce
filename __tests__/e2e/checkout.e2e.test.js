import http from "http";
import request from "supertest";
import { createApp } from "../../infrastructure/drivers/express/app.js";
import { createMemoryContainer } from "../../config/di.memory.js";

describe("E2E — Parcours complet catalogue → panier → checkout → consultation", () => {
  let server, base;

  beforeAll(async () => {
    const container = createMemoryContainer();
    const app = createApp({ container });
    server = http.createServer(app);
    await new Promise((res) => server.listen(0, res));
    const { port } = server.address();
    base = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    if (server) await new Promise((res) => server.close(res));
  });

  test("parcours complet", async () => {
    // 1) Liste des produits
    const products = await request(base).get("/products");
    expect(products.status).toBe(200);
    expect(products.body.length).toBeGreaterThanOrEqual(3);

    const p1 = products.body[0];
    const p2 = products.body[1];

    // 2) Ajouts au panier
    await request(base).post("/cart").send({ productId: p1.id, quantity: 2 });
    await request(base).post("/cart").send({ productId: p2.id, quantity: 1 });

    const cart = await request(base).get("/cart");
    expect(cart.status).toBe(200);
    expect(cart.body.items).toHaveLength(2);
    const sum = cart.body.items.reduce((acc, l) => acc + l.lineTotal.amount, 0);
    expect(cart.body.total.amount).toBeCloseTo(sum, 2);

    // 3) Checkout
    const checkout = await request(base).post("/orders/checkout");
    expect(checkout.status).toBe(201);
    const orderId = checkout.body.id;

    // 4) Panier vidé
    const after = await request(base).get("/cart");
    expect(after.body.items).toHaveLength(0);
    expect(after.body.total.amount).toBe(0);

    // 5) Liste + détail commande
    const orders = await request(base).get("/orders");
    expect(orders.status).toBe(200);
    expect(orders.body.find((o) => o.id === orderId)).toBeTruthy();

    const detail = await request(base).get(`/orders/${orderId}`);
    expect(detail.status).toBe(200);
    expect(detail.body.id).toBe(orderId);
  });

  test("health & 404", async () => {
    const h = await request(base).get("/__health");
    expect(h.status).toBe(200);
    expect(h.body).toEqual(
      expect.objectContaining({
        status: "ok",
        dataSource: expect.stringMatching(/^(memory|sqlite)$/),
      })
    );

    const notf = await request(base).get("/nope");
    expect(notf.status).toBe(404);
  });
});
