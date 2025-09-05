import { Money } from "../../shared-kernel/value-objects/Money.js";
import { Quantity } from "../value-objects/Quantity.js";

const toQty = (q) => (q instanceof Quantity ? q.value : Number(q));

export class Cart {
  /** @param {{lines?: Array, total?: Money}} data */
  constructor({ lines = [], total = Money.zero("EUR") } = {}) {
    this.lines = lines.map((l) => {
      const qty = toQty(l.quantity);
      const unit =
        l.unitPrice instanceof Money
          ? l.unitPrice
          : new Money(l.unitPrice?.amount ?? 0, l.unitPrice?.currency ?? "EUR");

      return {
        productId: String(l.productId),
        quantity: qty,
        unitPrice: unit,
        lineTotal:
          l.lineTotal instanceof Money ? l.lineTotal : unit.multiply(qty),
      };
    });

    this.total =
      total instanceof Money
        ? total
        : new Money(total?.amount ?? 0, total?.currency ?? "EUR");

    this.recalc();
  }

  static empty() {
    return new Cart();
  }

  add({ productId, unitPrice, quantity }) {
    this.upsertLine({ productId, unitPrice, quantity });
  }

  upsertLine({ productId, unitPrice, quantity }) {
    const qtyInc = toQty(quantity);
    const idx = this.lines.findIndex((l) => l.productId === String(productId));

    if (idx >= 0) {
      const q = this.lines[idx].quantity + qtyInc;
      this.lines[idx] = {
        productId: String(productId),
        quantity: q,
        unitPrice,
        lineTotal: unitPrice.multiply(q),
      };
    } else {
      this.lines.push({
        productId: String(productId),
        quantity: qtyInc,
        unitPrice,
        lineTotal: unitPrice.multiply(qtyInc),
      });
    }

    this.recalc();
  }

  remove(productId) {
    this.lines = this.lines.filter((l) => l.productId !== String(productId));
    this.recalc();
  }

  clear() {
    this.lines = [];
    this.total = Money.zero(this.total.currency);
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
