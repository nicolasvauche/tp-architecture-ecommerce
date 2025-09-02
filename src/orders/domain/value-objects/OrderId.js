export class OrderId {
  constructor(value) {
    this.value = String(value);
    if (!this.value) throw new Error("OrderId required");
    Object.freeze(this);
  }
  toString() {
    return this.value;
  }
}
