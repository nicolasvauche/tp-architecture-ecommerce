import { resetDb } from "../helpers/resetDb.js";
import { listProducts } from "../../src/business/services/ListProductsService.js";

describe("Unit — Products services", () => {
  beforeEach(async () => {
    await resetDb();
  });

  test("ListProductsService retourne les produits du repository", async () => {
    const out = await listProducts();

    expect(Array.isArray(out)).toBe(true);
    expect(out).toHaveLength(3);

    expect(out[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        priceCents: expect.any(Number),
        stock: expect.any(Number),
      })
    );

    const ids = out.map((p) => p.id);
    expect(ids).toEqual([1, 2, 3]);
  });
});
