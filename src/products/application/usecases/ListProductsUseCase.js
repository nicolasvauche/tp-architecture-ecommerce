export class ListProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute() {
    return this.productRepository.findAll();
  }
}
