import { CartDto } from "./CartDto.js";

export class CartController {
  constructor({ addToCart, removeFromCart, clearCart }) {
    this.addToCart = addToCart;
    this.removeFromCart = removeFromCart;
    this.clearCart = clearCart;
  }

  async add({ productId, quantity = 1 }) {
    const cart = await this.addToCart.execute({ productId, quantity });
    return CartDto.from(cart);
  }

  async remove({ productId }) {
    const cart = await this.removeFromCart.execute({ productId });
    return CartDto.from(cart);
  }

  async clear() {
    const cart = await this.clearCart.execute();
    return CartDto.from(cart);
  }
}
