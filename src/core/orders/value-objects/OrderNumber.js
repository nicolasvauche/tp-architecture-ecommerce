let seq = 0;
export class OrderNumber {
  constructor(value) {
    this.value = String(value);
  }
  static generate(now = new Date()) {
    const year = now.getFullYear();
    const num = (++seq).toString().padStart(4, "0");
    return new OrderNumber(`ORD-${year}-${num}`);
  }
}
