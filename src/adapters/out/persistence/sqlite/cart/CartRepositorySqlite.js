import { CartRepository } from "../../../../../../ports/out/cart/CartRepository.js";

export class CartRepositorySqlite extends CartRepository {
  constructor({ db }) {
    super();
    this.db = db;
  }

  async get() {
    const items = this.db
      .prepare(
        `SELECT product_id AS productId, quantity FROM cart_items ORDER BY rowid`
      )
      .all();

    return {
      lines: items.map((i) => ({
        productId: String(i.productId),
        quantity: i.quantity,
      })),
      total: { amount: 0, currency: "EUR" },
    };
  }

  async save(cart) {
    const trx = this.db.transaction(() => {
      this.db.prepare(`DELETE FROM cart_items`).run();
      const stmt = this.db.prepare(
        `INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)`
      );
      for (const line of cart.lines) {
        stmt.run(String(line.productId), line.quantity);
      }
    });
    trx();
  }

  async remove(productId) {
    this.db
      .prepare(`DELETE FROM cart_items WHERE product_id = ?`)
      .run(String(productId));
    return this.get();
  }

  async clear() {
    this.db.prepare(`DELETE FROM cart_items`).run();
    return { lines: [], total: { amount: 0, currency: "EUR" } };
  }
}
