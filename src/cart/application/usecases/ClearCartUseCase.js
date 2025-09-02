export class ClearCartUseCase {
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  }

  async execute() {
    const cart = await this.cartRepository.get();
    cart.clear();
    await this.cartRepository.save(cart);
    return cart;
  }
}
