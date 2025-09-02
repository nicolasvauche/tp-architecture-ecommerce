import { ProductRepositoryInMemory } from "../infrastructure/memory/products/ProductRepositoryInMemory.js";
import { ListProductsUseCase } from "../src/products/application/usecases/ListProductsUseCase.js";

export function createMemoryContainer() {
  const registry = new Map();

  registry.set("ProductRepository", new ProductRepositoryInMemory());

  registry.set(
    "ListProductsUseCase",
    new ListProductsUseCase(registry.get("ProductRepository"))
  );

  return {
    get: (token) => {
      if (!registry.has(token)) {
        throw new Error(`DI: token not found: ${token}`);
      }
      return registry.get(token);
    },
  };
}
