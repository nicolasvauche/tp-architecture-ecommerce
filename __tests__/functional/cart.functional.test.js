import request from "supertest";
import app from "../../src/presentation/http/app.js";
import { resetDb } from "../helpers/resetDb.js";

describe("Functional — /cart", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("POST /cart ajoute un produit existant", async () => {
    const add = await request(app)
      .post("/cart")
      .send({ productId: 1, quantity: 2 });
    expect(add.status).toBe(201);
    expect(add.body.items).toHaveLength(1);
    expect(add.body.items[0]).toEqual(
      expect.objectContaining({ productId: 1, quantity: 2 })
    );
    expect(add.body.total).toBeCloseTo(39.98, 2);
  });

  it("POST /cart refuse un produit inconnu", async () => {
    const res = await request(app)
      .post("/cart")
      .send({ productId: 9999, quantity: 1 });
    expect([400, 404, 500]).toContain(res.status);
  });

  it("DELETE /cart/:productId supprime l’item", async () => {
    await request(app).post("/cart").send({ productId: 1, quantity: 1 });
    const del = await request(app).delete("/cart/1");
    expect(del.status).toBe(200);
    expect(del.body.items).toHaveLength(0);
    expect(del.body.total).toBeCloseTo(0, 2);
  });

  it("DELETE /cart vide le panier", async () => {
    await request(app).post("/cart").send({ productId: 1, quantity: 1 });
    const res = await request(app).delete("/cart");
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(0);
    expect(res.body.total).toBeCloseTo(0, 2);
  });
});
