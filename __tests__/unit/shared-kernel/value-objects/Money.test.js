import { Money } from "../../../../src/core/shared-kernel/value-objects/Money.js";
import { Currency } from "../../../../src/core/shared-kernel/value-objects/Currency.js";

describe("Value Object — Money", () => {
  test("crée une instance valide avec des minor units", () => {
    const money = new Money(1999, "EUR");
    expect(money.amount).toBe(1999);
    expect(money.currency).toBe("EUR");
    expect(money.decimal).toBe(19.99);
  });

  test("rejette un montant non entier", () => {
    expect(() => new Money(19.99, "EUR")).toThrow(
      "Money.amount must be integer (minor units)"
    );
  });

  test("accepte une instance de Currency comme paramètre", () => {
    const eur = new Currency("EUR");
    const money = new Money(500, eur);
    expect(money.currency).toBe("EUR");
  });

  test("méthode zero retourne 0 minor units", () => {
    const zero = Money.zero("USD");
    expect(zero.amount).toBe(0);
    expect(zero.currency).toBe("USD");
  });

  test("fromDecimal convertit correctement en minor units", () => {
    const m = Money.fromDecimal(19.99, "EUR");
    expect(m.amount).toBe(1999);
    expect(m.decimal).toBe(19.99);
  });

  test("add additionne deux montants dans la même devise", () => {
    const a = new Money(1000, "EUR");
    const b = new Money(500, "EUR");
    const result = a.add(b);
    expect(result.amount).toBe(1500);
    expect(result.currency).toBe("EUR");
  });

  test("sub soustrait deux montants dans la même devise", () => {
    const a = new Money(1000, "EUR");
    const b = new Money(400, "EUR");
    const result = a.sub(b);
    expect(result.amount).toBe(600);
  });

  test("add rejette des devises différentes", () => {
    const a = new Money(1000, "EUR");
    const b = new Money(1000, "USD");
    expect(() => a.add(b)).toThrow("Currency mismatch");
  });

  test("multiply applique un facteur et arrondit correctement", () => {
    const m = new Money(333, "EUR"); // 3,33 €
    const result = m.multiply(3);
    expect(result.amount).toBe(999);
  });

  test("immutabilité — les propriétés ne peuvent pas être modifiées", () => {
    const m = new Money(100, "EUR");
    expect(Object.isFrozen(m)).toBe(true);
    expect(() => {
      m.amount = 200;
    }).toThrow();
  });
});
