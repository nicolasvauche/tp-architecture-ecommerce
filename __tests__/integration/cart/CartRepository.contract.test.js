import { repoMatrix } from "../_utils/repoMatrix.js";
import { Money } from "../../../src/shared-kernel/value-objects/Money.js";

describe.each(repoMatrix)(
  "Integration — CartRepository (%s)",
  (_, makeContainer) => {
    let container, cartRepo;

    beforeAll(async () => {
      container = await makeContainer();
      cartRepo = container.get("CartRepository");
    });

    test("save + get + clear (minor units)", async () => {
      if (typeof cartRepo.clear === "function") {
        await cartRepo.clear();
      } else {
        await cartRepo.save({ items: [], total: new Money(0, "EUR") });
      }

      const cart = {
        items: [
          { productId: "1", quantity: 2, unitPrice: new Money(1999, "EUR") },
        ],
        total: new Money(3998, "EUR"),
      };
      await cartRepo.save(cart);

      const reloaded = await cartRepo.get();
      expect(reloaded.items).toHaveLength(1);
      expect(reloaded.total.amount).toBe(3998);

      if (typeof cartRepo.clear === "function") {
        await cartRepo.clear();
      } else {
        await cartRepo.save({ items: [], total: new Money(0, "EUR") });
      }
      const empty = await cartRepo.get();
      expect(empty.items).toHaveLength(0);
      expect(empty.total.amount).toBe(0);
    });
  }
);
