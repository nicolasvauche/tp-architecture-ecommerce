import { Router } from "express";

export function buildOrdersRouter({ controller }) {
  const r = Router();

  // POST /orders/checkout
  r.post("/checkout", async (req, res, next) => {
    try {
      const order = await controller.checkout();
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  });

  // GET /orders/:id
  r.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await controller.detail({ id });
      if (!order) {
        res.status(404).json({ error: "Order not found" });
      } else {
        res.status(200).json(order);
      }
    } catch (err) {
      next(err);
    }
  });

  // GET /orders
  r.get("/", async (req, res, next) => {
    try {
      const orders = await controller.list();
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  });

  return r;
}
