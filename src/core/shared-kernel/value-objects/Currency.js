export class Currency {
  constructor(value = "EUR") {
    if (typeof value !== "string" || value.length !== 3) {
      throw new Error("Invalid currency");
    }
    this.value = value.toUpperCase();
  }
}
