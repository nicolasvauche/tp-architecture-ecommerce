import { db } from "./state.js";

export function ProductRepositoryInMemory() {
  return {
    async findAll() {
      return db.products.map((p) => ({
        id: p.id,
        name: p.name,
        priceCents: p.price_cents,
        stock: p.stock,
      }));
    },

    async findById(id) {
      const p = db.products.find((p) => p.id === id);
      return p
        ? { id: p.id, name: p.name, priceCents: p.price_cents, stock: p.stock }
        : null;
    },
  };
}
