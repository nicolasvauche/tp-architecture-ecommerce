export const SEED_PRODUCTS = [
  { id: 1, name: "T-shirt", price_cents: 1999, stock: 100 },
  { id: 2, name: "Hoodie", price_cents: 3999, stock: 50 },
  { id: 3, name: "Sticker Pack", price_cents: 499, stock: 500 },
];

export const db = {
  products: structuredClone(SEED_PRODUCTS),
  cart_items: [],
  orders: [],
  order_items: [],
  _seqOrder: 0,
};

export function resetMemoryDb() {
  db.products.length = 0;
  db.products.push(...structuredClone(SEED_PRODUCTS));
  db.cart_items.length = 0;
  db.orders.length = 0;
  db.order_items.length = 0;
  db._seqOrder = 0;
}
