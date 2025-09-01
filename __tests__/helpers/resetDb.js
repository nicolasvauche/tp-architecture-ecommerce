import { db } from "../../src/data/memory/state.js";

export function resetDb() {
  db.products.splice(
    0,
    db.products.length,
    { id: "P-001", name: "Tee-shirt", price: 19.9, sku: "TS-001" },
    { id: "P-002", name: "Mug", price: 9.9, sku: "MG-001" }
  );
  db.cart.items = [];
  db.orders.length = 0;
  db._seqOrder = 0;
  return db;
}
