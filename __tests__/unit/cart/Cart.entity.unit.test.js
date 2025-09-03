import { Cart } from "../../../src/cart/domain/entities/Cart.js";
import { Quantity } from "../../../src/cart/domain/value-objects/Quantity.js";

describe("Unit — Cart entity", () => {
  test("ajout, suppression, total (minor units)", () => {
    const cart = new Cart();

    cart.add("1", 2);
    cart.add("2", 1);

    let items = cart.items();

    expect(Array.isArray(items)).toBe(true);
    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: "1",
          quantity: expect.any(Quantity),
        }),
        expect.objectContaining({
          productId: "2",
          quantity: expect.any(Quantity),
        }),
      ])
    );

    const q1 = items.find((i) => i.productId === "1")?.quantity;
    expect(typeof q1.toNumber).toBe("function");
    expect(q1.toNumber()).toBe(2);

    cart.remove("2");
    items = cart.items();
    expect(items.find((i) => i.productId === "2")).toBeUndefined();

    cart.clear();
    expect(cart.items()).toHaveLength(0);
  });
});
