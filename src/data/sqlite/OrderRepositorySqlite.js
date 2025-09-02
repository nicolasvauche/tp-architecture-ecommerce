import { db } from "./db.js";

function toDbId(publicId) {
  if (typeof publicId === "string" && publicId.startsWith("O-")) {
    return parseInt(publicId.slice(2), 10);
  }
  return Number(publicId);
}
function fromDbId(dbId) {
  return `O-${String(dbId).padStart(4, "0")}`;
}
const toCents = (euro) => Math.round(euro * 100);
const euro = (cents) => cents / 100;

export function OrderRepositorySqlite() {
  const api = {
    async findAll() {
      const orders = db
        .prepare(
          `SELECT id, total_cents AS totalCents, created_at AS createdAt
           FROM orders
           ORDER BY id DESC`
        )
        .all();

      const itemsStmt = db.prepare(
        `SELECT product_id AS productId, qty, unit_price_cents AS unitPriceCents
         FROM order_items
         WHERE order_id = ?
         ORDER BY product_id`
      );

      return orders.map((o) => ({
        id: fromDbId(o.id),
        items: itemsStmt.all(o.id).map((r) => ({
          productId: r.productId,
          quantity: r.qty,
          price: euro(r.unitPriceCents),
        })),
        total: euro(o.totalCents),
        createdAt: o.createdAt,
      }));
    },

    async findById(id) {
      const dbId = toDbId(id);

      const o = db
        .prepare(
          `SELECT id, total_cents AS totalCents, created_at AS createdAt
           FROM orders WHERE id = ?`
        )
        .get(dbId);

      if (!o) return null;

      const itemsRows = db
        .prepare(
          `SELECT product_id AS productId, qty, unit_price_cents AS unitPriceCents
           FROM order_items WHERE order_id = ?
           ORDER BY product_id`
        )
        .all(dbId);

      return {
        id: fromDbId(o.id),
        items: itemsRows.map((r) => ({
          productId: r.productId,
          quantity: r.qty,
          price: euro(r.unitPriceCents),
        })),
        total: euro(o.totalCents),
        createdAt: o.createdAt,
      };
    },

    async createFromCart({ items, total, createdAt }) {
      const created = createdAt || new Date().toISOString();
      const totalCents =
        typeof total === "number"
          ? toCents(total)
          : items.reduce((s, it) => s + toCents(it.price) * it.quantity, 0);

      const insertOrder = db.prepare(
        "INSERT INTO orders(total_cents, created_at) VALUES (?, ?)"
      );
      const insertItem = db.prepare(
        `INSERT INTO order_items(order_id, product_id, qty, unit_price_cents)
         VALUES (?, ?, ?, ?)`
      );
      const clearCart = db.prepare("DELETE FROM cart_items");

      const tx = db.transaction(() => {
        const info = insertOrder.run(totalCents, created);
        const orderId = info.lastInsertRowid;

        for (const it of items) {
          insertItem.run(orderId, it.productId, it.quantity, toCents(it.price));
        }

        // vider le panier
        clearCart.run();

        return orderId;
      });

      const newId = tx();
      return await api.findById(newId);
    },
  };

  api.list = api.findAll;

  return api;
}
