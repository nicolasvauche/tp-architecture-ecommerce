import { db } from "./state.js";

function euro(cents) {
  return cents / 100;
}

function computeTotal(items) {
  return Number(
    items.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2)
  );
}

export function CartRepositoryInMemory() {
  return {
    async get() {
      const items = db.cart_items.map((ci) => {
        const p = db.products.find((pp) => pp.id === ci.product_id);
        const price = euro(p?.price_cents ?? 0);
        return {
          productId: ci.product_id,
          quantity: ci.qty,
          price,
        };
      });
      return { items, total: computeTotal(items) };
    },

    async addItem({ productId, quantity }) {
      const existing = db.cart_items.find((ci) => ci.product_id === productId);
      if (existing) {
        existing.qty += quantity;
      } else {
        db.cart_items.push({ product_id: productId, qty: quantity });
      }
    },

    async removeItem(productId) {
      db.cart_items = db.cart_items.filter((ci) => ci.product_id !== productId);
    },

    async clear() {
      db.cart_items = [];
    },
  };
}
