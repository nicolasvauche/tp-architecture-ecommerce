export class RemoveFromCartUseCase {
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  }

  async execute({ productId }) {
    const cart = await this.cartRepository.get();
    cart.remove(productId);
    await this.cartRepository.save(cart);
    return cart;
  }
}
