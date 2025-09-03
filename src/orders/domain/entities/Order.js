import { randomUUID as _randomUUID } from "node:crypto";
import { OrderId } from "../value-objects/OrderId.js";
import { OrderNumber } from "../value-objects/OrderNumber.js";
import { Money } from "../../../shared-kernel/value-objects/Money.js";

function genUUID() {
  try {
    if (typeof _randomUUID === "function") return _randomUUID();
  } catch (_) {}
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export class Order {
  constructor({ id, number, lines, total }) {
    this.id = id instanceof OrderId ? id : new OrderId(id ?? genUUID());
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
