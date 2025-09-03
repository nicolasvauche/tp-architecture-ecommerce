import { Quantity } from "../../../src/cart/domain/value-objects/Quantity.js";

describe("Unit — Quantity", () => {
  test("valeur valide", () => {
    const q = new Quantity(3);
    expect(q.value).toBe(3);
  });

  test("refuse 0 ou négatif", () => {
    expect(() => new Quantity(0)).toThrow();
    expect(() => new Quantity(-1)).toThrow();
  });

  test("refuse non-entier", () => {
    expect(() => new Quantity(1.2)).toThrow();
  });
});
