import { TaxRate } from "../../../../../src/core/orders/value-objects/TaxRate.js";
import { Money } from "../../../../../src/core/shared-kernel/value-objects/Money.js";

describe("VO — TaxRate (extends Percentage)", () => {
  test("création valide (bornes incluses)", () => {
    expect(new TaxRate(0).value).toBe(0);
    expect(new TaxRate(20).value).toBe(20);
    expect(new TaxRate(100).value).toBe(100);
  });

  test("rejette valeurs invalides (NaN / ±Infinity / hors bornes / non-number)", () => {
    expect(() => new TaxRate(-1)).toThrow("Invalid percentage");
    expect(() => new TaxRate(101)).toThrow("Invalid percentage");
    expect(() => new TaxRate(NaN)).toThrow("Invalid percentage");
    expect(() => new TaxRate(Infinity)).toThrow("Invalid percentage");
    expect(() => new TaxRate(-Infinity)).toThrow("Invalid percentage");
    expect(() => new TaxRate("20")).toThrow("Invalid percentage");
  });

  test("applyTo calcule le montant correspondant en minor units", () => {
    const rate = new TaxRate(20);
    const base = new Money(1999, "EUR");
    const tax = rate.applyTo(base);
    expect(tax).toBeInstanceOf(Money);
    expect(tax.amount).toBe(400);
    expect(tax.currency).toBe("EUR");
  });
});
