import { CartPricingService } from "../../../src/cart/application/services/CartPricingService.js";
import { Money } from "../../../src/shared-kernel/value-objects/Money.js";
import { Quantity } from "../../../src/cart/domain/value-objects/Quantity.js";

describe("Unit — CartPricingService", () => {
  test("calcule lineTotal et total (minor units)", async () => {
    class FakeProductRepo {
      async findAll() {
        return [
          {
            id: 1,
            sku: "SKU-001",
            name: "T-Shirt noir",
            price: new Money(1999, "EUR"),
          },
          {
            id: 2,
            sku: "SKU-002",
            name: "Sticker pack",
            price: new Money(499, "EUR"),
          },
        ];
      }
    }

    const cart = {
      items() {
        return [
          { productId: 1, quantity: new Quantity(2) },
          { productId: 2, quantity: new Quantity(1) },
        ];
      },
    };

    const svc = new CartPricingService({
      productRepository: new FakeProductRepo(),
    });
    const result = await svc.price(cart);

    expect(result.lines).toHaveLength(2);

    const l1 = result.lines.find((l) => l.productId === "1");
    expect(l1).toBeTruthy();
    expect(l1.sku).toBe("SKU-001");
    expect(l1.name).toBe("T-Shirt noir");
    expect(l1.quantity).toBe(2);
    expect(l1.unitPrice.amount).toBe(1999);
    expect(l1.unitPrice.currency).toBe("EUR");
    expect(l1.lineTotal.amount).toBe(3998);

    const l2 = result.lines.find((l) => l.productId === "2");
    expect(l2).toBeTruthy();
    expect(l2.sku).toBe("SKU-002");
    expect(l2.name).toBe("Sticker pack");
    expect(l2.quantity).toBe(1);
    expect(l2.unitPrice.amount).toBe(499);
    expect(l2.unitPrice.currency).toBe("EUR");
    expect(l2.lineTotal.amount).toBe(499);

    expect(result.total.amount).toBe(3998 + 499);
    expect(result.total.currency).toBe("EUR");
  });
});
