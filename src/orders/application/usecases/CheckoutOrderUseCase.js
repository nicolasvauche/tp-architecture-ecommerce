import { Order } from "../../domain/entities/Order.js";
import { Money } from "../../../shared-kernel/value-objects/Money.js";

export class CheckoutOrderUseCase {
  constructor({ cartRepository, productRepository, orderRepository, pricer }) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.orderRepository = orderRepository;
    this.pricer = pricer;
  }

  async execute() {
    const cart = await this.cartRepository.get();
    const pricing = await this.pricer.price(cart);

    if (!pricing.lines.length) {
      const err = new Error("Cart is empty");
      err.name = "DomainError";
      throw err;
    }

    const order = new Order({
      lines: pricing.lines.map((l) => ({
        productId: l.productId,
        sku: l.sku,
        name: l.name,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
        lineTotal: l.lineTotal,
      })),
      total:
        pricing.total instanceof Money
          ? pricing.total
          : new Money(pricing.total.amount, pricing.total.currency),
    });

    const saved = await this.orderRepository.save(order);

    cart.clear();
    await this.cartRepository.save(cart);

    return saved;
  }
}
