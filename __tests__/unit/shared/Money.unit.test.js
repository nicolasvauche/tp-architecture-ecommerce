import { Money } from "../../../src/shared-kernel/value-objects/Money.js";

describe("Unit — Money", () => {
  test("création (minor units) et immutabilité", () => {
    const m = new Money(1999, "EUR");
    expect(m.amount).toBe(1999);
    expect(m.currency).toBe("EUR");
    expect(Object.isFrozen(m)).toBe(true);
  });

  test("fromDecimal / toDecimal / toJSON", () => {
    const m = Money.fromDecimal(19.99, "EUR");
    expect(m.amount).toBe(1999);
    expect(m.toDecimal()).toBeCloseTo(19.99, 2);
    expect(m.toJSON()).toEqual({ amount: 19.99, currency: "EUR" });
  });

  test("add / subtract (minor units)", () => {
    const a = new Money(1000, "EUR");
    const b = new Money(999, "EUR");
    expect(a.add(b).amount).toBe(1999);
    expect(a.subtract(b).amount).toBe(1);
  });

  test("multiply arrondit correctement", () => {
    const m = new Money(333, "EUR");
    expect(m.multiply(3).amount).toBe(999);
  });

  test("devise incompatible", () => {
    const a = new Money(1000, "EUR");
    const b = new Money(100, "USD");
    expect(() => a.add(b)).toThrow(/Currency mismatch/);
  });

  test("format", () => {
    const m = new Money(123456, "EUR");
    expect(typeof m.format()).toBe("string");
  });
});
