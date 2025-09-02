import { OrderId } from "../value-objects/OrderId.js";
import { OrderNumber } from "../value-objects/OrderNumber.js";
import { Money } from "../../../shared-kernel/value-objects/Money.js";

export class Order {
  constructor({ id, number, lines, total }) {
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
    this.lines = lines ?? [];
    this.total =
      total instanceof Money ? total : new Money(total.amount, total.currency);
  }
}
