export class OrderNumber {
  constructor(value) {
    if (!value || typeof value !== "string")
      throw new Error("OrderNumber required");
    this.value = value;
    Object.freeze(this);
  }
  toString() {
    return this.value;
  }

  static generate() {
    const ts = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    return new OrderNumber(`ORD-${ts}-${rnd}`);
  }
}
