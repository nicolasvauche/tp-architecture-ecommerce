import { CartRepository } from "../../data/repositories/CartRepository.js";

export async function clearCart() {
  const repo = CartRepository();
  await repo.clear();
  return await repo.get();
}
