import { OrderId } from "../value-objects/OrderId.js";
import { OrderNumber } from "../value-objects/OrderNumber.js";
import { Money } from "../../../shared-kernel/value-objects/Money.js";

export class Order {
  constructor({ id, number, lines, total, createdAt } = {}) {
    this.id =
      id instanceof OrderId
        ? id
        : new OrderId(id ?? crypto.randomUUID?.() ?? `${Date.now()}`);

    this.number =
      number instanceof OrderNumber
        ? number
        : number
        ? new OrderNumber(number)
        : OrderNumber.generate();

    this.lines = Array.isArray(lines) ? lines : [];

    this.total =
      total instanceof Money ? total : new Money(total.amount, total.currency);

    if (!createdAt) {
      this.createdAt = new Date();
    } else if (createdAt instanceof Date) {
      this.createdAt = createdAt;
    } else if (typeof createdAt === "string") {
      this.createdAt = new Date(createdAt);
    } else {
      throw new Error("Order.createdAt must be a Date or ISO string");
    }
  }
}
