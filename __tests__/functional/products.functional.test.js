import request from "supertest";
import { createApp } from "../../infrastructure/drivers/express/app.js";
import { createMemoryContainer } from "../../config/di.memory.js";

describe("Functional — /products", () => {
  let app;

  beforeAll(() => {
    const container = createMemoryContainer();
    app = createApp({ container });
  });

  test("GET /products retourne la liste des produits (seed InMemory)", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Exemples d'assertions "métier"
    expect(res.body.length).toBeGreaterThanOrEqual(3);
    const p = res.body[0];
    expect(p).toHaveProperty("id");
    expect(p).toHaveProperty("sku");
    expect(p).toHaveProperty("name");
    expect(p).toHaveProperty("price");
    expect(p.price).toEqual(
      expect.objectContaining({
        amount: expect.any(Number),
        currency: expect.any(String),
      })
    );
  });

  test("GET /__health répond OK", async () => {
    const res = await request(app).get("/__health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({ status: "ok", dataSource: expect.any(String) })
    );
  });

  test("404 sur une route inconnue", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: "Not Found", path: expect.any(String) })
    );
  });
});
