import { Quantity } from "../../domain/value-objects/Quantity.js";

export class AddToCartUseCase {
  constructor({ cartRepository, productRepository }) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute({ productId, quantity = 1 }) {
    const products = await this.productRepository.findAll();
    const exists = products.some((p) => String(p.id) === String(productId));
    if (!exists) {
      const err = new Error("Unknown product");
      err.name = "DomainError";
      throw err;
    }

    const cart = await this.cartRepository.get();
    cart.add(productId, new Quantity(quantity));
    await this.cartRepository.save(cart);
    return cart;
  }
}
