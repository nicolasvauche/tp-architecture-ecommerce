import { ProductsService } from "../services/products.service.js";

export class ProductsController {
  constructor(service = new ProductsService()) {
    this.service = service;
  }

  health = (_req, res) => {
    res.json({ status: "ok", service: "products" });
  };

  list = (_req, res, next) => {
    try {
      const data = this.service.listProducts();
      res.json({ items: data });
    } catch (err) {
      next(err);
    }
  };
}
