import { CartRepository } from "../../../src/cart/interface/adapters/repositories/CartRepository.js";
import { Cart } from "../../../src/cart/domain/entities/Cart.js";
import { Quantity } from "../../../src/cart/domain/value-objects/Quantity.js";

export class CartRepositorySqlite extends CartRepository {
  constructor(db) {
    super();
    this.db = db;

    this.qEnsure = db.prepare(
      "INSERT OR IGNORE INTO carts (cart_id) VALUES ('default')"
    );

    this.qItems = db.prepare(`
      SELECT product_id, quantity
      FROM cart_items
      WHERE cart_id = 'default'
      ORDER BY product_id ASC
    `);

    this.qUpsert = db.prepare(`
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ('default', ?, ?)
      ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = excluded.quantity
    `);

    this.qClear = db.prepare(
      "DELETE FROM cart_items WHERE cart_id = 'default'"
    );
  }

  async get() {
    this.qEnsure.run();
    const rows = this.qItems.all();
    return new Cart(
      rows.map((r) => ({
        productId: String(r.product_id),
        quantity: new Quantity(r.quantity),
      }))
    );
  }

  async save(cart) {
    const items = cart.items();
    this.db.transaction(() => {
      this.qEnsure.run();
      this.qClear.run();
      for (const it of items) {
        const pid = String(it.productId);
        const qty =
          it.quantity instanceof Quantity
            ? it.quantity.toNumber()
            : Number(it.quantity);
        this.qUpsert.run(pid, qty);
      }
    })();
  }
}
