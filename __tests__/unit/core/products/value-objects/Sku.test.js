import { Sku } from "../../../../../src/core/products/value-objects/Sku.js";

describe("VO — Sku", () => {
  test("accepte lettres/chiffres et - _ . (3..32), trim conservé", () => {
    expect(new Sku("ABC-001").value).toBe("ABC-001");
    expect(new Sku("abc_001").value).toBe("abc_001");
    expect(new Sku("A.B-C_9").value).toBe("A.B-C_9");
    expect(new Sku("  SKU-42  ").value).toBe("SKU-42");
  });

  test("rejette les SKU trop courts ou trop longs", () => {
    expect(() => new Sku("AB")).toThrow("Invalid SKU");
    expect(() => new Sku("A".repeat(33))).toThrow("Invalid SKU");
  });

  test("rejette les caractères interdits (espaces, accents, symboles)", () => {
    expect(() => new Sku("AB C")).toThrow("Invalid SKU");
    expect(() => new Sku("SKU/42")).toThrow("Invalid SKU");
    expect(() => new Sku("SKU:42")).toThrow("Invalid SKU");
    expect(() => new Sku("ÉCU-42")).toThrow("Invalid SKU");
    expect(() => new Sku("sku@42")).toThrow("Invalid SKU");
  });

  test("garde la casse telle quelle (pas d’upper automatique)", () => {
    const s1 = new Sku("abc-123");
    const s2 = new Sku("ABC-123");
    expect(s1.value).toBe("abc-123");
    expect(s2.value).toBe("ABC-123");
  });
});
