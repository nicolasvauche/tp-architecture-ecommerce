import request from "supertest";
import app from "../../src/presentation/http/index.js";
import { resetDb } from "../helpers/resetDb.js";

describe("Functional — ProductsController", () => {
  beforeEach(() => resetDb());

  it("GET /products renvoie tous les produits disponibles", async () => {
    const res = await request(app).get("/products");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("id", "P-001");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("price");
  });

  it("les produits sont triés par id croissant", async () => {
    const res = await request(app).get("/products");
    const ids = res.body.map((p) => p.id);
    expect(ids).toEqual(["P-001", "P-002"]);
  });
});
