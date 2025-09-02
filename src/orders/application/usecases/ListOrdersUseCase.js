export class ListOrdersUseCase {
  constructor({ orderRepository }) {
    this.orderRepository = orderRepository;
  }
  async execute() {
    return this.orderRepository.findAll();
  }
}
