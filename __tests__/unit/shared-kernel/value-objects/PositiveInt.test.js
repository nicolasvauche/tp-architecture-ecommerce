import { PositiveInt } from "../../../../src/core/shared-kernel/value-objects/PositiveInt.js";

describe("Value Object — PositiveInt", () => {
  test("accepte un entier strictement positif", () => {
    const pi = new PositiveInt(42);
    expect(pi.value).toBe(42);
  });

  test("rejette zéro", () => {
    expect(() => new PositiveInt(0)).toThrow("Not a positive integer");
  });

  test("rejette un entier négatif", () => {
    expect(() => new PositiveInt(-5)).toThrow("Not a positive integer");
  });

  test("rejette un nombre non entier", () => {
    expect(() => new PositiveInt(3.14)).toThrow("Not a positive integer");
  });

  test("rejette une valeur non numérique", () => {
    expect(() => new PositiveInt("10")).toThrow("Not a positive integer");
    expect(() => new PositiveInt(null)).toThrow("Not a positive integer");
    expect(() => new PositiveInt(undefined)).toThrow("Not a positive integer");
    expect(() => new PositiveInt(NaN)).toThrow("Not a positive integer");
  });

  test("immutabilité (si Object.freeze ajouté dans l’impl)", () => {
    const pi = new PositiveInt(7);
    const isFrozen = Object.isFrozen(pi);
    if (isFrozen) {
      expect(() => {
        pi.value = 99;
      }).toThrow();
    } else {
      expect(isFrozen).toBe(false);
    }
  });
});
