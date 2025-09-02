import request from "supertest";
import app from "../../src/presentation/http/app.js";
import { resetDb } from "../helpers/resetDb.js";

describe("Functional — ProductsController", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("GET /products renvoie tous les produits disponibles", async () => {
    const res = await request(app).get("/products");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body).toHaveLength(3);

    expect(res.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        priceCents: expect.any(Number),
        stock: expect.any(Number),
      })
    );
  });

  it("les produits sont triés par id croissant", async () => {
    const res = await request(app).get("/products").expect(200);
    const ids = res.body.map((p) => p.id);

    const sorted = [...ids].sort((a, b) => a - b);
    expect(ids).toEqual(sorted);
    expect(ids).toEqual([1, 2, 3]);
  });
});
