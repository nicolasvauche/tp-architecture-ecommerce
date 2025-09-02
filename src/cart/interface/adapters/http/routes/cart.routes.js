import { Router } from "express";
import { CartController } from "../controllers/CartController.js";

export function cartRoutes({ container, logger }) {
  const router = Router();

  const controller = new CartController({
    getCart: container.get("GetCartUseCase"),
    addToCart: container.get("AddToCartUseCase"),
    removeFromCart: container.get("RemoveFromCartUseCase"),
    clearCart: container.get("ClearCartUseCase"),
    pricer: container.get("CartPricingService"),
    logger,
  });

  router.get("/", (req, res, next) => controller.get(req, res, next));
  router.post("/", (req, res, next) => controller.add(req, res, next));
  router.delete("/:productId", (req, res, next) =>
    controller.remove(req, res, next)
  );
  router.delete("/", (req, res, next) => controller.clear(req, res, next));

  return router;
}
