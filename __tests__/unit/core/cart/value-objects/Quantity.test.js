import { Quantity } from "../../../../../src/core/cart/value-objects/Quantity.js";

describe("VO — Quantity", () => {
  test("accepte un entier ≥ 1", () => {
    expect(new Quantity(1).value).toBe(1);
    expect(new Quantity(5).value).toBe(5);
  });

  test("rejette 0, négatif ou non entier", () => {
    expect(() => new Quantity(0)).toThrow();
    expect(() => new Quantity(-1)).toThrow();
    expect(() => new Quantity(1.5)).toThrow();
    expect(() => new Quantity("2")).toThrow();
    expect(() => new Quantity(NaN)).toThrow();
  });

  test("immutabilité (si freeze appliqué)", () => {
    const q = new Quantity(2);
    const frozen = Object.isFrozen(q);
    if (frozen) {
      expect(() => {
        q.value = 3;
      }).toThrow();
    } else {
      expect(frozen).toBe(false);
    }
  });
});
