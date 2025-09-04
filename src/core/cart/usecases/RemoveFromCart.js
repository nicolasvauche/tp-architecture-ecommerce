import { RemoveFromCartPort } from "../../../ports/in/cart/RemoveFromCartPort.js";
import { Cart } from "../entities/Cart.js";

export class RemoveFromCart extends RemoveFromCartPort {
  /** @param {{ cartRepo: any }} deps */
  constructor({ cartRepo }) {
    super();
    this.cartRepo = cartRepo;
  }

  /** @param {{productId:string|number}} input */
  async execute({ productId }) {
    const current = await this.cartRepo.get();
    const cart = new Cart(current);
    cart.remove(productId);
    await this.cartRepo.save(cart.toObject());
    return cart.toObject();
  }
}
