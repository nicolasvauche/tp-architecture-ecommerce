import { OrderDto } from "../../../../presentation/dto/OrderDto.js";

export class OrdersController {
  constructor({ checkout, listOrders, getOrderDetail, logger }) {
    this.checkout = checkout;
    this.listOrders = listOrders;
    this.getOrderDetail = getOrderDetail;
    this.logger = logger;
  }

  async checkoutAction(_req, res, next) {
    try {
      const order = await this.checkout.execute();
      res.status(201).json(OrderDto.fromEntity(order));
    } catch (err) {
      next(err);
    }
  }

  async list(_req, res, next) {
    try {
      const orders = await this.listOrders.execute();
      res.status(200).json(orders.map(OrderDto.fromEntity));
    } catch (err) {
      next(err);
    }
  }

  async detail(req, res, next) {
    try {
      const order = await this.getOrderDetail.execute({ id: req.params.id });
      res.status(200).json(OrderDto.fromEntity(order));
    } catch (err) {
      next(err);
    }
  }
}
