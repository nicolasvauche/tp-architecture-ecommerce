import { CartRepository } from "../../data/repositories/CartRepository.js";
import { ProductRepository } from "../../data/repositories/ProductRepository.js";

export async function addToCart({ productId, quantity }) {
  if (!productId) throw new Error("productId is required");
  const qty = Number(quantity || 1);
  if (!Number.isFinite(qty) || qty <= 0)
    throw new Error("quantity must be > 0");

  const productRepo = ProductRepository();
  const product = await productRepo.findById(productId);
  if (!product) throw new Error("Unknown product");

  const cartRepo = CartRepository();
  await cartRepo.addItem({ productId, quantity: qty, price: product.price });
  return await cartRepo.get();
}
