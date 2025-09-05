import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router();
const controller = new ProductsController();

router.get("/health", controller.health);
router.get("/", controller.list);

export default router;
