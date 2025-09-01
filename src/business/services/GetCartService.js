import { CartRepository } from "../../data/repositories/CartRepository.js";

export async function getCart() {
  const repo = CartRepository();
  return await repo.get();
}
