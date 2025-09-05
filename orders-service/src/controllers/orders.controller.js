import { OrdersService } from "../services/orders.service.js";

export class OrdersController {
  constructor(service = new OrdersService()) {
    this.service = service;
  }

  health = (_req, res) => {
    res.json({ status: "ok", service: "orders" });
  };

  checkout = async (_req, res, next) => {
    try {
      const order = await this.service.checkout();
      res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  };

  getById = (req, res, next) => {
    try {
      const order = this.service.getById(req.params.id);
      res.json(order);
    } catch (e) {
      next(e);
    }
  };

  list = (req, res, next) => {
    try {
      const limit = Number(req.query.limit ?? 20);
      const offset = Number(req.query.offset ?? 0);
      const items = this.service.list({ limit, offset });
      res.json({ items, limit, offset });
    } catch (e) {
      next(e);
    }
  };
}
