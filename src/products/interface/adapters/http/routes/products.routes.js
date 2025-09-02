import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController.js";

export function productsRoutes({ container, logger }) {
  const router = Router();

  const controller = new ProductsController({
    listProductsUseCase: container.get("ListProductsUseCase"),
    logger: logger?.child?.({ module: "products" }) ?? logger,
  });

  router.get("/", (req, res, next) => controller.list(req, res, next));

  return router;
}
