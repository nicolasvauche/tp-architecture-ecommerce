import { Quantity } from "../value-objects/Quantity.js";

export class Cart {
  constructor(items = []) {
    this._items = new Map();
    for (const it of items) {
      const q =
        it.quantity instanceof Quantity
          ? it.quantity
          : new Quantity(it.quantity);
      this._items.set(String(it.productId), {
        productId: String(it.productId),
        quantity: q,
      });
    }
  }

  items() {
    return Array.from(this._items.values()).map((it) => ({
      productId: it.productId,
      quantity: it.quantity,
    }));
  }

  add(productId, qty = 1) {
    const key = String(productId);
    const inc = qty instanceof Quantity ? qty : new Quantity(qty);
    const current = this._items.get(key)?.quantity?.toNumber?.() ?? 0;
    const next = new Quantity(current + inc.toNumber());
    this._items.set(key, { productId: key, quantity: next });
  }

  remove(productId) {
    const key = String(productId);
    if (!this._items.has(key)) return;
    this._items.delete(key);
  }

  clear() {
    this._items.clear();
  }
}
