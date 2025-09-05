import { CartService } from "../services/cart.service.js";

export class CartController {
  constructor(service = new CartService()) {
    this.service = service;
  }

  health = (_req, res) => {
    res.json({ status: "ok", service: "cart" });
  };

  getCart = (_req, res, next) => {
    try {
      const data = this.service.getCart();
      res.json(data);
    } catch (e) {
      next(e);
    }
  };

  addToCart = (req, res, next) => {
    try {
      const { productId, quantity, unitPrice, currency } = normalizeBody(
        req.body
      );
      const data = this.service.addToCart({
        productId,
        quantity,
        unitPrice,
        currency,
      });
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  };

  deleteItem = (req, res, next) => {
    try {
      const { productId } = req.params;
      const data = this.service.removeItem(productId);
      res.json(data);
    } catch (e) {
      next(e);
    }
  };

  clear = (_req, res, next) => {
    try {
      const data = this.service.clear();
      res.json(data);
    } catch (e) {
      next(e);
    }
  };
}

function normalizeBody(b) {
  const productId = b.productId ?? b.id ?? b.sku;
  const quantity = Number(b.quantity ?? 1);
  const unitPrice = Number(b.unitPrice?.amount ?? b.amount);
  const currency = b.unitPrice?.currency ?? b.currency ?? "EUR";
  return { productId, quantity, unitPrice, currency };
}
