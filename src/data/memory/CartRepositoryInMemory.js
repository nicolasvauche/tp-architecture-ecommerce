import { db } from "./state.js";

function computeTotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

export function CartRepositoryInMemory() {
  return {
    async get() {
      const items = db.cart.items;
      return { items, total: Number(computeTotal(items).toFixed(2)) };
    },

    async addItem({ productId, quantity, price }) {
      const existing = db.cart.items.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        db.cart.items.push({ productId, quantity, price });
      }
    },

    async removeItem(productId) {
      db.cart.items = db.cart.items.filter((i) => i.productId !== productId);
    },

    async clear() {
      db.cart.items = [];
    },
  };
}
