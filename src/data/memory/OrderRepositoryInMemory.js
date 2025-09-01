import { db } from "./state.js";

function genId() {
  const n = (++db._seqOrder).toString().padStart(4, "0");
  return `O-${n}`;
}

export function OrderRepositoryInMemory() {
  return {
    async findAll() {
      return db.orders;
    },

    async findById(id) {
      return db.orders.find((o) => o.id === id) || null;
    },

    async createFromCart({ items, total, createdAt }) {
      const order = {
        id: genId(),
        items: structuredClone(items),
        total,
        createdAt,
      };
      db.orders.push(order);
      return order;
    },
  };
}
