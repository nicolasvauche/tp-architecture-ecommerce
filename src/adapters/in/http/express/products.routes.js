import { Router } from "express";

export function buildProductsRouter({ controller }) {
  const r = Router();

  // GET /products
  r.get("/", async (req, res, next) => {
    try {
      const products = await controller.list(req.query);
      res.json(products);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
