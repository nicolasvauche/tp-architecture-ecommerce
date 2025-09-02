import { ProductRepositoryInMemory } from "../memory/ProductRepositoryInMemory.js";
import { ProductRepositorySqlite } from "../sqlite/ProductRepositorySqlite.js";

export function ProductRepository() {
  const driver = (process.env.DATA_DRIVER || "memory").toLowerCase();
  if (driver === "sqlite") {
    return new ProductRepositorySqlite();
  }
  return new ProductRepositoryInMemory();
}
