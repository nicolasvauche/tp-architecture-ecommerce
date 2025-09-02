import request from "supertest";
import { createApp } from "../../infrastructure/drivers/express/app.js";
import { createMemoryContainer } from "../../config/di.memory.js";

describe("Functional — /cart", () => {
  let app;

  beforeAll(() => {
    const container = createMemoryContainer();
    app = createApp({ container });
  });

  test("POST /cart ajoute un produit et calcule les totaux", async () => {
    const res = await request(app)
      .post("/cart")
      .send({ productId: 1, quantity: 2 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);

    const line = res.body.items.find((l) => l.productId === "1");
    expect(line).toEqual(
      expect.objectContaining({
        productId: "1",
        quantity: 2,
        unitPrice: expect.objectContaining({
          amount: expect.any(Number),
          currency: "EUR",
        }),
        lineTotal: expect.objectContaining({
          amount: expect.any(Number),
          currency: "EUR",
        }),
      })
    );

    const sumLines = res.body.items.reduce(
      (acc, l) => acc + l.lineTotal.amount,
      0
    );
    expect(res.body.total).toEqual(
      expect.objectContaining({ amount: sumLines, currency: "EUR" })
    );
  });

  test("POST /cart refuse un produit inconnu", async () => {
    const res = await request(app)
      .post("/cart")
      .send({ productId: 999, quantity: 1 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({ error: "DomainError" }));
  });

  test("DELETE /cart/:productId supprime l’item", async () => {
    await request(app).post("/cart").send({ productId: 2, quantity: 1 });

    const del = await request(app).delete("/cart/2");
    expect(del.status).toBe(200);

    const get = await request(app).get("/cart");
    expect(get.body.items.find((i) => i.productId === "2")).toBeUndefined();
  });

  test("DELETE /cart vide le panier", async () => {
    await request(app).post("/cart").send({ productId: 3, quantity: 1 });

    const res = await request(app).delete("/cart");
    expect(res.status).toBe(200);

    expect(res.body.items).toHaveLength(0);
    expect(res.body.total).toEqual(
      expect.objectContaining({ amount: 0, currency: "EUR" })
    );
  });
});
