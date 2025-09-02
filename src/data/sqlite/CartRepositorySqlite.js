import { db } from "./db.js";

function computeTotal(items) {
  return Number(
    items.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2)
  );
}

export function CartRepositorySqlite() {
  return {
    async get() {
      const rows = db
        .prepare(
          `
        SELECT ci.product_id AS productId,
               ci.qty        AS quantity,
               p.price_cents AS priceCents
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        ORDER BY ci.product_id
      `
        )
        .all();

      const items = rows.map((r) => ({
        productId: r.productId,
        quantity: r.quantity,
        price: r.priceCents / 100,
      }));

      return { items, total: computeTotal(items) };
    },

    async addItem({ productId, quantity, price }) {
      db.prepare(
        `
        INSERT INTO cart_items(product_id, qty)
        VALUES (?, ?)
        ON CONFLICT(product_id) DO UPDATE SET qty = qty + excluded.qty
      `
      ).run(productId, quantity);
    },

    async removeItem(productId) {
      db.prepare("DELETE FROM cart_items WHERE product_id = ?").run(productId);
    },

    async clear() {
      db.prepare("DELETE FROM cart_items").run();
    },
  };
}
