import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller.js";

const router = Router();
const controller = new OrdersController();

router.get("/health", controller.health);

router.post("/checkout", controller.checkout);
router.get("/:id", controller.getById);
router.get("/", controller.list);

export default router;
