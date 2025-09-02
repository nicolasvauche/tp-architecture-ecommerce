export class GetCartUseCase {
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  }

  async execute() {
    return this.cartRepository.get();
  }
}
