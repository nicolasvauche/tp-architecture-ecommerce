import { ClearCartPort } from "../../../ports/in/cart/ClearCartPort.js";
import { Cart } from "../entities/Cart.js";

export class ClearCart extends ClearCartPort {
  constructor({ cartRepo }) {
    super();
    this.cartRepo = cartRepo;
  }
  async execute() {
    const empty = Cart.empty().toObject();
    await this.cartRepo.clear();
    return empty;
  }
}
