import { repoMatrix } from "../_utils/repoMatrix.js";

const getById = (repo, id) =>
  typeof repo.findById === "function"
    ? repo.findById(id)
    : typeof repo.getById === "function"
    ? repo.getById(id)
    : null;

describe.each(repoMatrix)(
  "Integration — ProductRepository (%s)",
  (_, makeContainer) => {
    let container, repo;

    beforeAll(async () => {
      container = await makeContainer();
      repo = container.get("ProductRepository");
    });

    test("findAll retourne un minimum de produits seedés", async () => {
      const all = await repo.findAll();
      expect(Array.isArray(all)).toBe(true);
      expect(all.length).toBeGreaterThanOrEqual(3);
      const p = all[0];

      expect(p).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          sku: expect.objectContaining({ value: expect.any(String) }),
          name: expect.objectContaining({ value: expect.any(String) }),
          price: expect.objectContaining({
            amount: expect.any(Number),
            currency: "EUR",
          }),
        })
      );
    });

    test("findById renvoie null si inconnu (si exposé)", async () => {
      if (!getById(repo)) {
        return;
      }
      const p = await getById(repo, "99999");
      expect(p).toBeNull();
    });
  }
);
