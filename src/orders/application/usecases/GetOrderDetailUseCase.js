export class GetOrderDetailUseCase {
  constructor({ orderRepository }) {
    this.orderRepository = orderRepository;
  }
  async execute({ id }) {
    const o = await this.orderRepository.findById(id);
    if (!o) {
      const err = new Error("Order not found");
      err.name = "DomainError";
      throw err;
    }
    return o;
  }
}
