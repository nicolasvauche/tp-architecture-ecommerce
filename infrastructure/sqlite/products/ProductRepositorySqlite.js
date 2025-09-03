import { ProductRepository } from "../../../src/products/interface/adapters/repositories/ProductRepository.js";
import { Product } from "../../../src/products/domain/entities/Product.js";
import { ProductName } from "../../../src/products/domain/value-objects/ProductName.js";
import { Sku } from "../../../src/products/domain/value-objects/Sku.js";
import { Money } from "../../../src/shared-kernel/value-objects/Money.js";

export class ProductRepositorySqlite extends ProductRepository {
  constructor(db) {
    super();
    this.db = db;
    this.qList = db.prepare(
      "SELECT id, sku, name, price_cents, currency FROM products ORDER BY id ASC"
    );
  }

  async findAll() {
    const rows = this.qList.all();
    return rows.map(
      (r) =>
        new Product({
          id: r.id,
          sku: new Sku(r.sku),
          name: new ProductName(r.name),
          price: new Money(r.price_cents, r.currency),
        })
    );
  }
}
