import { ListOrdersPort } from "../../../ports/in/orders/ListOrdersPort.js";
export class ListOrders extends ListOrdersPort {
  constructor({ orderRepo }) {
    super();
    this.orderRepo = orderRepo;
  }
  async execute() {
    return await this.orderRepo.list();
  }
}
