import { db } from "./db.js";

export function ProductRepositorySqlite() {
  return {
    async findAll() {
      const stmt = db.prepare(
        "SELECT id, name, price_cents AS priceCents, stock FROM products ORDER BY id"
      );
      return stmt.all();
    },

    async findById(id) {
      const stmt = db.prepare(
        "SELECT id, name, price_cents AS priceCents, stock FROM products WHERE id = ?"
      );
      return stmt.get(id) || null;
    },
  };
}
