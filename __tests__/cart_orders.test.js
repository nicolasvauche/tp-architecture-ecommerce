const request = require("supertest");
const app = require("../src/index");
const state = require("../src/state");

beforeEach(() => state.reset());

test("POST /cart ajoute un produit existant puis GET /cart reflète l'ajout (fusion des quantités)", async () => {
  // ajout initial
  let res = await request(app)
    .post("/cart")
    .send({ productId: 1, quantity: 2 });
  expect(res.status).toBe(200);

  // ajout du même produit → quantité fusionnée
  res = await request(app).post("/cart").send({ productId: 1, quantity: 3 });
  expect(res.status).toBe(200);

  // lecture panier
  res = await request(app).get("/cart");
  expect(res.status).toBe(200);
  expect(res.body).toEqual([{ productId: 1, quantity: 5 }]);
});

test("POST /cart refuse un produit non proposé", async () => {
  const res = await request(app)
    .post("/cart")
    .send({ productId: 999, quantity: 1 });
  expect(res.status).toBe(400);
  expect(res.body).toEqual({ error: "Produit non proposé" });
});

test("POST /orders crée une commande à partir du panier", async () => {
  // préparer un panier
  await request(app).post("/cart").send({ productId: 2, quantity: 1 });

  const res = await request(app).post("/orders");
  expect(res.status).toBe(200);
  expect(res.body).toMatchObject({
    id: 1,
    status: "PENDING",
    items: [{ productId: 2, quantity: 1 }],
  });

  // la commande est listée
  const list = await request(app).get("/orders");
  expect(list.body.length).toBe(1);
});
