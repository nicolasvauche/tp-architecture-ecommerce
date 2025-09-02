import { ProductRepository } from "../../data/repositories/ProductRepository.js";

export async function listProducts() {
  const repo = ProductRepository();
  return await repo.findAll();
}
