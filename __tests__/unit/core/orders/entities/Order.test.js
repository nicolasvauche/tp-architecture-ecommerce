import { Order } from "../../../../../src/core/orders/entities/Order.js";
import { Money } from "../../../../../src/core/shared-kernel/value-objects/Money.js";

describe("Entity — Order", () => {
  test("crée une commande avec lignes et calcule le total", () => {
    const order = new Order({
      lines: [
        { productId: "P1", quantity: 1, unitPrice: new Money(1999, "EUR") },
        { productId: "P2", quantity: 2, unitPrice: new Money(500, "EUR") },
      ],
    });

    expect(order.lines).toHaveLength(2);
    expect(order.total.amount).toBe(1999 + 1000);
    expect(order.number?.value ?? order.number).toMatch(/^ORD-/);
    expect(String(order.createdAt)).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("rejette des devises mélangées si non supportées", () => {
    const make = () =>
      new Order({
        lines: [
          { productId: "P1", quantity: 1, unitPrice: new Money(100, "EUR") },
          { productId: "P2", quantity: 1, unitPrice: new Money(100, "USD") },
        ],
      });
    expect(make).toThrow();
  });
});
