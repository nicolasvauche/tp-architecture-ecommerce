import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const router = Router();
const controller = new CartController();

router.get("/health", controller.health);

router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.delete("/:productId", controller.deleteItem);
router.delete("/", controller.clear);

export default router;
