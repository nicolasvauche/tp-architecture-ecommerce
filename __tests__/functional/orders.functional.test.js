import request from "supertest";
import { createApp } from "../../infrastructure/drivers/express/app.js";
import { createMemoryContainer } from "../../config/di.memory.js";

describe("Functional — /orders", () => {
  let app;
  beforeAll(() => {
    app = createApp({ container: createMemoryContainer() });
  });

  test("POST /orders/checkout crée une commande et vide le panier", async () => {
    await request(app).post("/cart").send({ productId: 1, quantity: 2 });
    await request(app).post("/cart").send({ productId: 2, quantity: 1 });

    const checkout = await request(app).post("/orders/checkout");
    expect(checkout.status).toBe(201);
    expect(checkout.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        number: expect.stringMatching(/^ORD-/),
        lines: expect.any(Array),
        total: expect.objectContaining({
          amount: expect.any(Number),
          currency: "EUR",
        }),
      })
    );
    expect(checkout.body.lines.length).toBeGreaterThanOrEqual(2);

    const cart = await request(app).get("/cart");
    expect(cart.body.items).toHaveLength(0);
    expect(cart.body.total.amount).toBe(0);
  });

  test("GET /orders liste les commandes", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        number: expect.any(String),
      })
    );
  });

  test("GET /orders/:id renvoie le détail", async () => {
    const all = await request(app).get("/orders");
    const id = all.body[0].id;
    const detail = await request(app).get(`/orders/${id}`);
    expect(detail.status).toBe(200);
    expect(detail.body).toEqual(
      expect.objectContaining({ id, number: expect.any(String) })
    );
  });

  test("POST /orders/checkout refuse si panier vide", async () => {
    const res = await request(app).post("/orders/checkout");
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({ error: "DomainError" }));
  });
});
