import { Percentage } from "../../../../src/core/shared-kernel/value-objects/Percentage.js";
import { Money } from "../../../../src/core/shared-kernel/value-objects/Money.js";

describe("Value Object — Percentage", () => {
  test("crée des pourcentages valides (bornes incluses)", () => {
    expect(new Percentage(0).value).toBe(0);
    expect(new Percentage(12.5).value).toBe(12.5);
    expect(new Percentage(100).value).toBe(100);
  });

  test("rejette des pourcentages invalides", () => {
    expect(() => new Percentage(-1)).toThrow("Invalid percentage");
    expect(() => new Percentage(101)).toThrow("Invalid percentage");
    expect(() => new Percentage("10")).toThrow("Invalid percentage");
    expect(() => new Percentage(NaN)).toThrow("Invalid percentage");
    expect(() => new Percentage(Infinity)).toThrow("Invalid percentage");
    expect(() => new Percentage(-Infinity)).toThrow("Invalid percentage");
  });

  test("applyTo retourne un Money (minor units) avec la bonne devise", () => {
    const p = new Percentage(15);
    const base = new Money(2000, "EUR");
    const inc = p.applyTo(base);
    expect(inc).toBeInstanceOf(Money);
    expect(inc.amount).toBe(300);
    expect(inc.currency).toBe("EUR");
  });

  test("applyTo arrondit correctement au centime (Math.round sur minor units)", () => {
    const p = new Percentage(2.5);
    const base = new Money(999, "EUR");
    const inc = p.applyTo(base);
    expect(inc.amount).toBe(25);
    expect(inc.decimal).toBe(0.25);
  });

  test("applyTo fonctionne avec fromDecimal (ex: 19,99 € à 10%)", () => {
    const p = new Percentage(10);
    const base = Money.fromDecimal(19.99, "EUR");
    const inc = p.applyTo(base);
    expect(inc.amount).toBe(200);
    expect(inc.decimal).toBe(2.0);
  });

  test("applyTo ne mute ni le Money source ni le Percentage", () => {
    const p = new Percentage(7.5);
    const base = new Money(1000, "USD");
    const snapshot = {
      p: p.value,
      amount: base.amount,
      currency: base.currency,
    };

    const _ = p.applyTo(base);

    expect(p.value).toBe(snapshot.p);
    expect(base.amount).toBe(snapshot.amount);
    expect(base.currency).toBe(snapshot.currency);
  });
});
