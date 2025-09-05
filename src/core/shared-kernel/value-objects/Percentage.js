import { Money } from "./Money.js";

export class Percentage {
  /** @param {number} value percent (0..100) */
  constructor(value) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > 100
    ) {
      throw new Error("Invalid percentage");
    }
    this.value = value;
    Object.freeze(this);
  }
  applyTo(money) {
    const increment = Math.round(money.amount * (this.value / 100));
    return new Money(increment, money.currency);
  }
}
