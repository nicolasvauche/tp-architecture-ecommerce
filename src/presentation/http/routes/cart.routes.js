import { Router } from "express";
import * as CartController from "../controllers/CartController.js";

const router = Router();

router.get("/", CartController.get);
router.post("/", CartController.addItem);
router.delete("/", CartController.clear);
router.delete("/:productId", CartController.remove);

export default router;
