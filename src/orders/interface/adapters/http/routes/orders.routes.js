import { Router } from "express";
import { OrdersController } from "../controllers/OrdersController.js";

export function ordersRoutes({ container, logger }) {
  const router = Router();

  const controller = new OrdersController({
    checkout: container.get("CheckoutOrderUseCase"),
    listOrders: container.get("ListOrdersUseCase"),
    getOrderDetail: container.get("GetOrderDetailUseCase"),
    logger,
  });

  router.post("/checkout", (req, res, next) =>
    controller.checkoutAction(req, res, next)
  );
  router.get("/", (req, res, next) => controller.list(req, res, next));
  router.get("/:id", (req, res, next) => controller.detail(req, res, next));

  return router;
}
