export class Sku {
  constructor(value) {
    if (!value || typeof value !== "string") {
      throw new Error("SKU must be a non-empty string");
    }
    this.value = value;
  }
  toString() {
    return this.value;
  }
}
