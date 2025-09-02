export class Money {
  constructor(amount, currency = "EUR") {
    if (!Number.isInteger(amount)) {
      throw new Error("Money.amount must be an integer (minor units)");
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Money.currency must be a 3-letter code (ISO 4217)");
    }
    this._amount = amount;
    this._currency = currency.toUpperCase();
    Object.freeze(this);
  }

  get amount() {
    return this._amount;
  }
  get currency() {
    return this._currency;
  }

  static zero(currency = "EUR") {
    return new Money(0, currency);
  }

  static fromDecimal(decimal, currency = "EUR") {
    if (typeof decimal !== "number" || Number.isNaN(decimal)) {
      throw new Error("Money.fromDecimal expects a valid number");
    }
    const amount = Math.round(decimal * 100);
    return new Money(amount, currency);
  }

  toDecimal() {
    return this._amount / 100;
  }

  add(other) {
    this._assertSameCurrency(other);
    return new Money(this._amount + other._amount, this._currency);
  }

  subtract(other) {
    this._assertSameCurrency(other);
    return new Money(this._amount - other._amount, this._currency);
  }

  multiply(factor) {
    if (typeof factor !== "number" || Number.isNaN(factor)) {
      throw new Error("Money.multiply expects a number");
    }
    const next = Math.round(this._amount * factor);
    return new Money(next, this._currency);
  }

  equals(other) {
    return (
      other instanceof Money &&
      this._currency === other._currency &&
      this._amount === other._amount
    );
  }

  isGreaterThan(other) {
    this._assertSameCurrency(other);
    return this._amount > other._amount;
  }

  isLessThan(other) {
    this._assertSameCurrency(other);
    return this._amount < other._amount;
  }

  _assertSameCurrency(other) {
    if (!(other instanceof Money)) {
      throw new Error("Expected Money");
    }
    if (this._currency !== other._currency) {
      throw new Error(
        `Currency mismatch: ${this._currency} vs ${other._currency}`
      );
    }
  }

  toJSON() {
    return {
      amount: this.toDecimal(),
      currency: this._currency,
    };
  }

  format({ locale = "fr-FR" } = {}) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this._currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.toDecimal());
  }
}
