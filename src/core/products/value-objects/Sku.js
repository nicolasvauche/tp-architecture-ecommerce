export class Sku {
  constructor(value) {
    const v = String(value).trim();
    if (!/^[A-Z0-9-_.]{3,32}$/i.test(v)) throw new Error("Invalid SKU");
    this.value = v;
  }
}
