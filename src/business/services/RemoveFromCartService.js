import { CartRepository } from "../../data/repositories/CartRepository.js";

export async function removeFromCart({ productId }) {
  if (!productId) throw new Error("productId is required");
  const repo = CartRepository();
  await repo.removeItem(productId);
  return await repo.get();
}
