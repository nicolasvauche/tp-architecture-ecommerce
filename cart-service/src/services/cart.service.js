import { CartRepository } from "../repositories/cart.repository.js";

export class CartService {
  constructor(repo = new CartRepository()) {
    this.repo = repo;
  }

  getCart() {
    const rows = this.repo.list();

    const items = rows.map((r) => ({
      productId: String(r.productId),
      quantity: r.quantity,
      unitPrice: { amount: Number(r.unitPrice), currency: r.currency },
      lineTotal: {
        amount: Number(r.unitPrice) * r.quantity,
        currency: r.currency,
      },
    }));

    const totalAmount = items.reduce((acc, it) => acc + it.lineTotal.amount, 0);
    const currency = items[0]?.unitPrice.currency ?? "EUR";

    return {
      items,
      total: { amount: Number(totalAmount), currency },
    };
  }

  addToCart({ productId, quantity, unitPrice, currency }) {
    if (!productId || !quantity || !unitPrice || !currency) {
      const err = new Error(
        "productId, quantity, unitPrice, currency are required"
      );
      err.statusCode = 400;
      throw err;
    }
    if (quantity <= 0) {
      const err = new Error("quantity must be > 0");
      err.statusCode = 400;
      throw err;
    }
    this.repo.upsert({ productId, quantity, unitPrice, currency });
    return this.getCart();
  }

  removeItem(productId) {
    if (!productId) {
      const err = new Error("productId required");
      err.statusCode = 400;
      throw err;
    }
    this.repo.delete(productId);
    return this.getCart();
  }

  clear() {
    this.repo.clear();
    return this.getCart();
  }
}
