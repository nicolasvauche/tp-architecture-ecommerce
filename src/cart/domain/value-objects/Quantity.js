export class Quantity {
  constructor(value) {
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
      throw new Error("Quantity must be a positive integer");
    }
    this.value = n;
    Object.freeze(this);
  }
  toNumber() {
    return this.value;
  }
}
