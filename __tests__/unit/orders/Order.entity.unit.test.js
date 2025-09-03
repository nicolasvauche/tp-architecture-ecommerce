import { Order } from "../../../src/orders/domain/entities/Order.js";
import { Money } from "../../../src/shared-kernel/value-objects/Money.js";

describe("Unit — Order entity", () => {
  test("création et lignes (minor units)", () => {
    const order = new Order({
      lines: [
        { productId: "1", quantity: 1, unitPrice: new Money(1999, "EUR") },
        { productId: "2", quantity: 2, unitPrice: new Money(500, "EUR") },
      ],
      total: new Money(1999 + 1000, "EUR"),
    });

    expect(order.lines).toHaveLength(2);
    expect(order.total.amount).toBe(2999);
    expect(order.number?.value ?? order.number).toMatch(/^ORD-/);
    expect(order.createdAt).toBeInstanceOf(Date);
    expect(order.createdAt.toISOString()).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
