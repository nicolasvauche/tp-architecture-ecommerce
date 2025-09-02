import request from "supertest";
import app from "../../src/presentation/http/index.js";
import { resetDb } from "../helpers/resetDb.js";

describe("E2E — Tentative ajout produit invalide", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("refuse l’ajout et laisse le panier vide", async () => {
    const add = await request(app)
      .post("/cart")
      .send({ productId: 9999, quantity: 1 });
    expect([400, 404, 500]).toContain(add.status);

    const cart = await request(app).get("/cart").expect(200);
    expect(cart.body.items).toHaveLength(0);
    expect(cart.body.total).toBeCloseTo(0, 2);
  });
});
