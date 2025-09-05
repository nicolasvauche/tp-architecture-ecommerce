import { ProductName } from "../../../../../src/core/products/value-objects/ProductName.js";

describe("VO — ProductName", () => {
  test("accepte un nom valide et le trim", () => {
    const name = new ProductName("  Super Guitare  ");
    expect(name.value).toBe("Super Guitare");
  });

  test("rejette un nom trop court (après trim)", () => {
    expect(() => new ProductName("")).toThrow("Invalid product name");
    expect(() => new ProductName(" ")).toThrow("Invalid product name");
    expect(() => new ProductName("A")).toThrow("Invalid product name");
  });

  test("rejette une valeur non string", () => {
    expect(() => new ProductName(123)).toThrow("Invalid product name");
    expect(() => new ProductName(null)).toThrow("Invalid product name");
    expect(() => new ProductName(undefined)).toThrow("Invalid product name");
    expect(() => new ProductName({})).toThrow("Invalid product name");
  });
});
