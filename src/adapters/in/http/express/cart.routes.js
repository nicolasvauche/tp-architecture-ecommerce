import { Router } from "express";

export function buildCartRouter({ controller }) {
  const r = Router();

  // POST /cart
  r.post("/", async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await controller.add({ productId, quantity });
      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  });

  // DELETE /cart/:productId
  r.delete("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;
      const cart = await controller.remove({ productId });
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  });

  // DELETE /cart
  r.delete("/", async (req, res, next) => {
    try {
      const cart = await controller.clear();
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  });

  return r;
}
