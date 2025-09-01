import { Router } from "express";
import * as OrdersController from "../controllers/OrdersController.js";

const router = Router();

router.get("/", OrdersController.list);
router.get("/:orderId", OrdersController.detail);
router.post("/", OrdersController.checkout);

export default router;
