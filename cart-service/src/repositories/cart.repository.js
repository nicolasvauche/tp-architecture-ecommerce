import { getDb } from "../db/sqlite.js";

export class CartRepository {
  constructor() {
    this.db = getDb();

    this.stmtList = this.db.prepare(
      "SELECT product_id AS productId, quantity, unit_price AS unitPrice, currency FROM cart_items ORDER BY product_id"
    );

    this.stmtGet = this.db.prepare(
      "SELECT product_id AS productId, quantity, unit_price AS unitPrice, currency FROM cart_items WHERE product_id = ?"
    );

    this.stmtUpsert = this.db.prepare(
      `INSERT INTO cart_items (product_id, quantity, unit_price, currency)
       VALUES (@productId, @quantity, @unitPrice, @currency)
       ON CONFLICT(product_id) DO UPDATE SET
         quantity = cart_items.quantity + excluded.quantity,
         unit_price = excluded.unit_price,
         currency = excluded.currency`
    );

    this.stmtDeleteOne = this.db.prepare(
      "DELETE FROM cart_items WHERE product_id = ?"
    );
    this.stmtClear = this.db.prepare("DELETE FROM cart_items");
  }

  list() {
    return this.stmtList.all();
  }

  get(productId) {
    return this.stmtGet.get(productId);
  }

  upsert({ productId, quantity, unitPrice, currency }) {
    if (quantity <= 0) return;
    this.stmtUpsert.run({
      productId: String(productId),
      quantity,
      unitPrice,
      currency,
    });
  }

  delete(productId) {
    this.stmtDeleteOne.run(String(productId));
  }

  clear() {
    this.stmtClear.run();
  }
}
