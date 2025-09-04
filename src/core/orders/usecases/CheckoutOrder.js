import { CheckoutOrderPort } from "../../../ports/in/orders/CheckoutOrderPort.js";
import { Cart } from "../../cart/entities/Cart.js";
import { Order } from "../entities/Order.js";
import { DomainError } from "../../shared-kernel/errors/DomainError.js";
import { Money } from "../../shared-kernel/value-objects/Money.js";

export class CheckoutOrder extends CheckoutOrderPort {
  /** @param {{ cartRepo:any, orderRepo:any, productRepo?:any }} deps */
  constructor({ cartRepo, orderRepo, productRepo = null }) {
    super();
    this.cartRepo = cartRepo;
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
  }

  async execute() {
    const raw = await this.cartRepo.get();
    const cart = new Cart(raw);

    for (const l of cart.lines) {
      const hasPrice = l.unitPrice?.amount >= 0 && l.lineTotal?.amount >= 0;
      if (!hasPrice) {
        if (!this.productRepo)
          throw new DomainError("invalid_cart", "Cart lines missing prices");
        const p = await this.productRepo.findById(l.productId);
        if (!p)
          throw new DomainError(
            "unknown_product",
            `Produit introuvable ${l.productId}`
          );
        l.unitPrice = new Money(p.price.amount, p.price.currency);
        l.lineTotal = l.unitPrice.multiply(l.quantity);
      }
    }
    cart.recalc();

    const order = Order.fromCart(cart);

    await this.orderRepo.save(order.toObject());
    await this.cartRepo.clear();

    return order.toObject();
  }
}
