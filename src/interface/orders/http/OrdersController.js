import { OrderDto } from "./OrderDto.js";

export class OrdersController {
  constructor({ checkoutOrder, getOrderDetail, listOrders }) {
    this.checkoutOrder = checkoutOrder;
    this.getOrderDetail = getOrderDetail;
    this.listOrders = listOrders;
  }

  async checkout() {
    const order = await this.checkoutOrder.execute();
    return OrderDto.from(order);
  }

  async detail({ id }) {
    const order = await this.getOrderDetail.execute({ id });
    return order ? OrderDto.from(order) : null;
  }

  async list() {
    const orders = await this.listOrders.execute();
    return OrderDto.list(orders);
  }
}
