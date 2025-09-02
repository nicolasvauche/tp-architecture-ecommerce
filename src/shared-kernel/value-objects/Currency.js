export class Currency {
  constructor(code) {
    if (typeof code !== "string" || code.length !== 3) {
      throw new Error("Currency code must be a 3-letter ISO 4217 string");
    }
    this.value = code.toUpperCase();
    Object.freeze(this);
  }
  toString() {
    return this.value;
  }
}
