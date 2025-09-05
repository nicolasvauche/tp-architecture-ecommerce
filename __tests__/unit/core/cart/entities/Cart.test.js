import { Cart } from "../../../../../src/core/cart/entities/Cart.js";
import { Money } from "../../../../../src/core/shared-kernel/value-objects/Money.js";
import { Quantity } from "../../../../../src/core/cart/value-objects/Quantity.js";

const EUR = (cents) => new Money(cents, "EUR");

describe("Entity — Cart", () => {
  test("ajoute un produit (nouvelle ligne)", () => {
    const cart = new Cart();
    cart.add({
      productId: "P1",
      unitPrice: EUR(1999),
      quantity: new Quantity(1),
    });

    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]).toMatchObject({
      productId: "P1",
      quantity: 1,
    });
    expect(cart.lines[0].lineTotal.amount).toBe(1999);
    expect(cart.total.amount).toBe(1999);
  });

  test("ajout du même produit cumule la quantité et le total", () => {
    const cart = new Cart();
    cart.add({
      productId: "P1",
      unitPrice: EUR(500),
      quantity: new Quantity(1),
    });
    cart.add({
      productId: "P1",
      unitPrice: EUR(500),
      quantity: new Quantity(2),
    });

    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0].quantity).toBe(3);
    expect(cart.lines[0].lineTotal.amount).toBe(1500);
    expect(cart.total.amount).toBe(1500);
  });

  test("retire un produit existant et met à jour total", () => {
    const cart = new Cart();
    cart.add({
      productId: "P1",
      unitPrice: EUR(500),
      quantity: new Quantity(1),
    });
    cart.add({
      productId: "P2",
      unitPrice: EUR(1000),
      quantity: new Quantity(1),
    });

    cart.remove("P1");

    expect(cart.lines.map((l) => l.productId)).toEqual(["P2"]);
    expect(cart.total.amount).toBe(1000);
  });

  test("clear vide le panier et remet total à zéro", () => {
    const cart = new Cart();
    cart.add({
      productId: "P1",
      unitPrice: EUR(500),
      quantity: new Quantity(2),
    });
    cart.clear();

    expect(cart.lines).toHaveLength(0);
    expect(cart.total.amount).toBe(0);
  });

  test("idempotence du remove sur produit absent", () => {
    const cart = new Cart();
    cart.add({
      productId: "P1",
      unitPrice: EUR(500),
      quantity: new Quantity(1),
    });

    cart.remove("UNKNOWN");
    expect(cart.lines).toHaveLength(1);
    expect(cart.total.amount).toBe(500);
  });
});
