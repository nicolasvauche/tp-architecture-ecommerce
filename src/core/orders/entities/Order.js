import { OrderId } from "../value-objects/OrderId.js";
import { OrderNumber } from "../value-objects/OrderNumber.js";
import { Money } from "../../shared-kernel/value-objects/Money.js";

export class Order {
  constructor({
    id = new OrderId(),
    number = OrderNumber.generate(),
    createdAt = new Date().toISOString(),
    lines = [],
    total = Money.zero("EUR"),
  } = {}) {
    this.id = id instanceof OrderId ? id : new OrderId(id);
    this.number =
      number instanceof OrderNumber ? number : new OrderNumber(number);
    this.createdAt = createdAt;

    this.lines = lines.map((l) => {
      const qty = Number(l.quantity);
      const unit =
        l.unitPrice instanceof Money
          ? l.unitPrice
          : new Money(l.unitPrice?.amount ?? 0, l.unitPrice?.currency ?? "EUR");

      const lt =
        l.lineTotal instanceof Money ? l.lineTotal : unit.multiply(qty);

      return {
        productId: String(l.productId),
        quantity: qty,
        unitPrice: unit,
        lineTotal: lt,
      };
    });

    this.total =
      total instanceof Money
        ? total
        : new Money(total?.amount ?? 0, total?.currency ?? "EUR");

    this.recalc();
  }

  static fromCart(cart) {
    return new Order({
      lines: cart.lines.map((l) => ({
        productId: l.productId,
        quantity: l.quantity,
        unitPrice: new Money(l.unitPrice.amount, l.unitPrice.currency),
        lineTotal: new Money(l.lineTotal.amount, l.lineTotal.currency),
      })),
      total: new Money(cart.total.amount, cart.total.currency),
    });
  }

  recalc() {
    if (!this.lines.length) {
      this.total = Money.zero(this.total.currency);
      return;
    }
    const currency = this.lines[0].unitPrice.currency;
    this.total = this.lines.reduce(
      (acc, l) => acc.add(l.lineTotal),
      Money.zero(currency)
    );
  }

  toObject() {
    return {
      id: this.id.value,
      number: this.number.value,
      createdAt: this.createdAt,
      lines: this.lines.map((l) => ({
        productId: l.productId,
        quantity: l.quantity,
        unitPrice: {
          amount: l.unitPrice.amount,
          currency: l.unitPrice.currency,
        },
        lineTotal: {
          amount: l.lineTotal.amount,
          currency: l.lineTotal.currency,
        },
      })),
      total: { amount: this.total.amount, currency: this.total.currency },
    };
  }
}
