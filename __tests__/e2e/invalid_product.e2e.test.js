import request from "supertest";
import app from "../../src/presentation/http/app.js";
import { resetDb } from "../helpers/resetDb.js";

describe("E2E — Tentative ajout produit invalide", () => {
  beforeEach(() => resetDb());

  it("refuse l’ajout et laisse le panier vide", async () => {
    const add = await request(app)
      .post("/cart")
      .send({ productId: "P-XXX", quantity: 1 });
    expect([400, 500]).toContain(add.status);

    const cart = await request(app).get("/cart").expect(200);
    expect(cart.body.items).toHaveLength(0);
    expect(cart.body.total).toBeCloseTo(0, 2);
  });
});
