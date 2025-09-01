import { ProductRepository } from "../../data/repositories/ProductRepository.js";

export async function listProducts() {
  const repo = ProductRepository(); // n-tier: on appelle directement le repo concret
  return await repo.findAll();
}
