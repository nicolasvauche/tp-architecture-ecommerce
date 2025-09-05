import { getDb } from "../db/sqlite.js";

export class ProductsRepository {
  constructor() {
    this.db = getDb();
    this.stmtAll = this.db.prepare(
      "SELECT id, name, price, currency FROM products ORDER BY id ASC"
    );
  }

  findAll() {
    return this.stmtAll.all();
  }
}
