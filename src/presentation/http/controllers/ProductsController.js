import { listProducts } from "../../../business/services/ListProductsService.js";

export async function list(req, res, next) {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
}
