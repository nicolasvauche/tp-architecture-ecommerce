import { Product } from "../../../../../src/core/products/entities/Product.js";
import { ProductName } from "../../../../../src/core/products/value-objects/ProductName.js";
import { Sku } from "../../../../../src/core/products/value-objects/Sku.js";
import { Money } from "../../../../../src/core/shared-kernel/value-objects/Money.js";

describe("Entity — Product", () => {
  test("crée un produit valide avec VO implicites", () => {
    const p = new Product({
      id: 1,
      name: "Guitare électrique",
      sku: "GTR-001",
      price: { amount: 1999, currency: "EUR" },
    });

    expect(p.id).toBe("1");
    expect(p.name).toBeInstanceOf(ProductName);
    expect(p.name.value).toBe("Guitare électrique");
    expect(p.sku).toBeInstanceOf(Sku);
    expect(p.sku.value).toBe("GTR-001");
    expect(p.price).toBeInstanceOf(Money);
    expect(p.price.amount).toBe(1999);
    expect(p.price.currency).toBe("EUR");
  });

  test("accepte directement des VO existants", () => {
    const name = new ProductName("Basse");
    const sku = new Sku("BASS-42");
    const price = new Money(5000, "USD");

    const p = new Product({ id: "abc", name, sku, price });

    expect(p.name).toBe(name);
    expect(p.sku).toBe(sku);
    expect(p.price).toBe(price);
    expect(p.id).toBe("abc");
  });

  test("fromPrimitives construit un Product correctement", () => {
    const primitive = {
      id: "P1",
      name: "Batterie",
      sku: "DRUM-777",
      price: { amount: 12345, currency: "EUR" },
    };

    const p = Product.fromPrimitives(primitive);

    expect(p).toBeInstanceOf(Product);
    expect(p.name.value).toBe("Batterie");
    expect(p.sku.value).toBe("DRUM-777");
    expect(p.price.amount).toBe(12345);
  });

  test("toObject retourne une structure plate (primitives)", () => {
    const p = new Product({
      id: "P99",
      name: "Clavier",
      sku: "KEY-999",
      price: { amount: 2500, currency: "EUR" },
    });

    const obj = p.toObject();
    expect(obj).toEqual({
      id: "P99",
      name: "Clavier",
      sku: "KEY-999",
      price: { amount: 2500, currency: "EUR" },
    });
  });

  test("rejette un nom de produit invalide", () => {
    expect(
      () =>
        new Product({
          id: "X",
          name: "A",
          sku: "SKU-1",
          price: { amount: 100, currency: "EUR" },
        })
    ).toThrow("Invalid product name");
  });

  test("rejette un SKU invalide", () => {
    expect(
      () =>
        new Product({
          id: "X",
          name: "Valid Name",
          sku: "bad sku",
          price: { amount: 100, currency: "EUR" },
        })
    ).toThrow("Invalid SKU");
  });
});
