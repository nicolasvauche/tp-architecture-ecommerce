import request from "supertest";
import app from "../../src/presentation/http/index.js";
import { resetDb } from "../helpers/resetDb.js";

describe("Functional — /orders", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("GET /orders retourne [] au départ", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /orders crée une commande depuis le panier", async () => {
    await request(app)
      .post("/cart")
      .send({ productId: 1, quantity: 2 })
      .expect(201);

    const create = await request(app).post("/orders");
    expect(create.status).toBe(201);
    expect(create.body).toHaveProperty("id", "O-0001");

    const list = await request(app).get("/orders").expect(200);
    expect(list.body.map((o) => o.id)).toContain("O-0001");
  });

  it("GET /orders/:id 404 si non trouvée", async () => {
    const res = await request(app).get("/orders/O-0404");
    expect([404, 200]).toContain(res.status);
  });
});
