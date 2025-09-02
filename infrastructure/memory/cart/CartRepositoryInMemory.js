import { CartRepository } from "../../../src/cart/interface/adapters/repositories/CartRepository.js";
import { Cart } from "../../../src/cart/domain/entities/Cart.js";

export class CartRepositoryInMemory extends CartRepository {
  constructor() {
    super();
    this._cart = new Cart();
  }
  async get() {
    return this._cart;
  }
  async save(cart) {
    this._cart = cart;
  }
}
