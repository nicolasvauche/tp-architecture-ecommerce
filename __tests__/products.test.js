const request = require("supertest");
const app = require("../src/index");
const state = require("../src/state");

beforeEach(() => state.reset());

test("[Fonctionnel] GET /products retourne le seed trié par id", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    { id: 1, name: "T-shirt", price: 20 },
    { id: 2, name: "Mug", price: 10 },
  ]);
});
