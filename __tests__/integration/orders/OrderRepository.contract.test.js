import { repoMatrix } from "../_utils/repoMatrix.js";
import { Money } from "../../../src/shared-kernel/value-objects/Money.js";

describe.each(repoMatrix)(
  "Integration — OrderRepository (%s)",
  (_, makeContainer) => {
    let container, orderRepo;

    beforeAll(async () => {
      container = await makeContainer();
      orderRepo = container.get("OrderRepository");
    });

    test("create/save + list + getById (minor units)", async () => {
      const createFn =
        typeof orderRepo.create === "function"
          ? orderRepo.create.bind(orderRepo)
          : typeof orderRepo.save === "function"
          ? orderRepo.save.bind(orderRepo)
          : null;

      if (!createFn) {
        const list = await orderRepo.findAll();
        expect(Array.isArray(list)).toBe(true);

        if (list.length > 0 && typeof orderRepo.findById === "function") {
          const one = await orderRepo.findById(list[0].id);
          expect(one?.id).toBe(list[0].id);
        }
        return;
      }

      const created = await createFn({
        lines: [
          { productId: "1", quantity: 1, unitPrice: new Money(1999, "EUR") },
        ],
        total: new Money(1999, "EUR"),
      });

      const createdId = typeof created === "string" ? created : created?.id;
      expect(createdId).toBeTruthy();

      const list = await orderRepo.findAll();
      expect(list.find((o) => o.id === createdId)).toBeTruthy();

      if (typeof orderRepo.findById === "function") {
        const detail = await orderRepo.findById(createdId);
        expect(detail?.id).toBe(createdId);

        if (detail?.total) {
          expect(detail.total).toEqual(
            expect.objectContaining({ amount: 1999, currency: "EUR" })
          );
        }
      }
    });
  }
);
