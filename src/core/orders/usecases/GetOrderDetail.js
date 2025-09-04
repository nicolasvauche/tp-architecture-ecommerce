import { GetOrderDetailPort } from "../../../ports/in/orders/GetOrderDetailPort.js";
export class GetOrderDetail extends GetOrderDetailPort {
  constructor({ orderRepo }) {
    super();
    this.orderRepo = orderRepo;
  }
  async execute({ id }) {
    return await this.orderRepo.findById(id);
  }
}
