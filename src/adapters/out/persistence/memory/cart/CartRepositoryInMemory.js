import { CartRepository } from "../../../../../../ports/out/cart/CartRepository.js";

export class CartRepositoryInMemory extends CartRepository {
  constructor() {
    super();
    this._cart = { lines: [], total: { amount: 0, currency: "EUR" } };
  }

  async get() {
    return structuredClone(this._cart);
  }

  async save(cart) {
    this._cart = structuredClone(cart);
  }

  async remove(productId) {
    const cart = await this.get();
    cart.lines = cart.lines.filter(
      (l) => String(l.productId) !== String(productId)
    );
    cart.total.amount = cart.lines.reduce(
      (sum, l) => sum + (l.lineTotal?.amount ?? 0),
      0
    );
    await this.save(cart);
    return cart;
  }

  async clear() {
    this._cart = { lines: [], total: { amount: 0, currency: "EUR" } };
    return structuredClone(this._cart);
  }
}
