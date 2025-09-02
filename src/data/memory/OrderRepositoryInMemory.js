import { db } from "./state.js";

function fromDbId(dbId) {
  return `O-${String(dbId).padStart(4, "0")}`;
}
function euro(cents) {
  return cents / 100;
}
function toCents(e) {
  return Math.round(e * 100);
}

export function OrderRepositoryInMemory() {
  return {
    async findAll() {
      return db.orders
        .slice()
        .sort((a, b) => b.id - a.id)
        .map((o) => {
          const itemsRows = db.order_items
            .filter((oi) => oi.order_id === o.id)
            .sort((a, b) => a.product_id - b.product_id);

          const items = itemsRows.map((r) => ({
            productId: r.product_id,
            quantity: r.qty,
            price: euro(r.unit_price_cents),
          }));

          return {
            id: fromDbId(o.id),
            items,
            total: euro(o.total_cents),
            createdAt: o.created_at,
          };
        });
    },

    async findById(id) {
      const dbId =
        typeof id === "string" && id.startsWith("O-")
          ? parseInt(id.slice(2), 10)
          : Number(id);

      const o = db.orders.find((x) => x.id === dbId);
      if (!o) return null;

      const itemsRows = db.order_items
        .filter((oi) => oi.order_id === dbId)
        .sort((a, b) => a.product_id - b.product_id);

      const items = itemsRows.map((r) => ({
        productId: r.product_id,
        quantity: r.qty,
        price: euro(r.unit_price_cents),
      }));

      return {
        id: fromDbId(o.id),
        items,
        total: euro(o.total_cents),
        createdAt: o.created_at,
      };
    },

    async createFromCart({ items, total, createdAt }) {
      const created = createdAt || new Date().toISOString();
      const totalCents =
        typeof total === "number"
          ? toCents(total)
          : toCents(items.reduce((s, it) => s + it.quantity * it.price, 0));

      const newId = ++db._seqOrder;

      // 1) créer la commande
      db.orders.push({
        id: newId,
        total_cents: totalCents,
        created_at: created,
      });

      // 2) insérer les lignes
      for (const it of items) {
        db.order_items.push({
          order_id: newId,
          product_id: it.productId,
          qty: it.quantity,
          unit_price_cents: toCents(it.price),
        });
      }

      // 3) vider le panier
      db.cart_items = [];

      return this.findById(newId);
    },
  };
}
