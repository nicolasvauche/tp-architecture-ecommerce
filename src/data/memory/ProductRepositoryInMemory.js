import { db } from "./state.js";

export function ProductRepositoryInMemory() {
  return {
    async findAll() {
      return db.products;
    },
    async findById(id) {
      return db.products.find((p) => p.id === id) || null;
    },
  };
}
