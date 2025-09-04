import { ProductRepository } from "../../../../../../ports/out/products/ProductRepository.js";

export class ProductRepositorySqlite extends ProductRepository {
  constructor({ db }) {
    super();
    this.db = db;
  }

  async findAll() {
    const rows = this.db
      .prepare(
        `SELECT id, name, sku, price_amount AS amount, price_currency AS currency FROM products ORDER BY id`
      )
      .all();
    return rows.map((r) => ({
      id: String(r.id),
      name: r.name,
      sku: r.sku,
      price: { amount: r.amount, currency: r.currency },
    }));
  }

  async findById(id) {
    const r = this.db
      .prepare(
        `SELECT id, name, sku, price_amount AS amount, price_currency AS currency FROM products WHERE id = ?`
      )
      .get(String(id));
    return r
      ? {
          id: String(r.id),
          name: r.name,
          sku: r.sku,
          price: { amount: r.amount, currency: r.currency },
        }
      : null;
  }
}
