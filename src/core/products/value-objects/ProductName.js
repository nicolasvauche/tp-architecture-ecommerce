export class ProductName {
  constructor(value) {
    if (typeof value !== "string" || value.trim().length < 2)
      throw new Error("Invalid product name");
    this.value = value.trim();
  }
}
