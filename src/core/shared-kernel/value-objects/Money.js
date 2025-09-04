import { Currency } from "./Currency.js";

export class Money {
  /** @param {number} amount minor units (int) @param {string|Currency} currency */
  constructor(amount, currency = "EUR") {
    if (!Number.isInteger(amount))
      throw new Error("Money.amount must be integer (minor units)");
    this.amount = amount;
    this.currency =
      currency instanceof Currency
        ? currency.value
        : new Currency(currency).value;
    Object.freeze(this);
  }

  static zero(currency = "EUR") {
    return new Money(0, currency);
  }
  static fromDecimal(decimal, currency = "EUR") {
    const cents = Math.round(Number(decimal) * 100);
    return new Money(cents, currency);
  }

  get decimal() {
    return this.amount / 100;
  }

  add(other) {
    if (this.currency !== other.currency) throw new Error("Currency mismatch");
    return new Money(this.amount + other.amount, this.currency);
  }
  sub(other) {
    if (this.currency !== other.currency) throw new Error("Currency mismatch");
    return new Money(this.amount - other.amount, this.currency);
  }
  multiply(qty) {
    return new Money(Math.round(this.amount * Number(qty)), this.currency);
  }
}
