export class ProductName {
  constructor(value) {
    if (!value || value.trim().length < 2) {
      throw new Error("Product name must be at least 2 characters");
    }
    this.value = value.trim();
  }
  toString() {
    return this.value;
  }
}
