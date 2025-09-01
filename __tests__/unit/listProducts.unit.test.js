import { db } from "../../src/data/memory/state.js";
import { listProducts } from "../../src/business/services/ListProductsService.js";

beforeEach(() => {
  db.products.splice(
    0,
    db.products.length,
    { id: "P-001", name: "Tee-shirt", price: 19.9 },
    { id: "P-002", name: "Mug", price: 9.9 }
  );
});

test("Unit — ListProductsService retourne les produits du repo in-memory", async () => {
  const out = await listProducts();
  expect(out).toHaveLength(2);
  expect(out[0]).toHaveProperty("id", "P-001");
});
