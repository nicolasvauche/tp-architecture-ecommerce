import { OrderRepository } from "../../../../../../ports/out/orders/OrderRepository.js";

export class OrderRepositorySqlite extends OrderRepository {
  constructor({ db }) {
    super();
    this.db = db;
  }

  async save(order) {
    const id = String(order.id?.value ?? order.id);
    const number = String(order.number?.value ?? order.number);
    const createdAt = order.createdAt;
    const total = order.total ?? { amount: 0, currency: "EUR" };

    const insertOrder = this.db.prepare(
      `INSERT INTO orders (id, number, created_at, total_amount, total_currency)
       VALUES (?, ?, ?, ?, ?)`
    );
    const insertLine = this.db.prepare(
      `INSERT INTO order_lines (order_id, product_id, quantity, unit_price_amount, line_total_amount, currency)
       VALUES (?, ?, ?, ?, ?, ?)`
    );

    const trx = this.db.transaction(() => {
      insertOrder.run(
        id,
        number,
        createdAt,
        total.amount ?? 0,
        total.currency ?? "EUR"
      );
      for (const line of order.lines) {
        insertLine.run(
          id,
          String(line.productId),
          line.quantity,
          line.unitPrice?.amount ?? 0,
          line.lineTotal?.amount ?? 0,
          line.unitPrice?.currency ?? "EUR"
        );
      }
    });
    trx();
  }

  async findById(id) {
    const o = this.db
      .prepare(
        `SELECT id, number, created_at, total_amount, total_currency FROM orders WHERE id = ?`
      )
      .get(String(id));
    if (!o) return null;

    const lines = this.db
      .prepare(
        `SELECT product_id AS productId, quantity, unit_price_amount, line_total_amount, currency
         FROM order_lines WHERE order_id = ? ORDER BY rowid`
      )
      .all(String(id));

    return {
      id: String(o.id),
      number: o.number,
      createdAt: o.created_at,
      lines: lines.map((l) => ({
        productId: String(l.productId),
        quantity: l.quantity,
        unitPrice: { amount: l.unit_price_amount, currency: l.currency },
        lineTotal: { amount: l.line_total_amount, currency: l.currency },
      })),
      total: { amount: o.total_amount, currency: o.total_currency },
    };
  }

  async list() {
    const rows = this.db
      .prepare(
        `SELECT id, number, created_at, total_amount, total_currency FROM orders ORDER BY created_at DESC, rowid DESC`
      )
      .all();

    const linesStmt = this.db.prepare(
      `SELECT product_id AS productId, quantity, unit_price_amount, line_total_amount, currency
         FROM order_lines WHERE order_id = ? ORDER BY rowid`
    );

    return rows.map((o) => ({
      id: String(o.id),
      number: o.number,
      createdAt: o.created_at,
      lines: linesStmt.all(String(o.id)).map((l) => ({
        productId: String(l.productId),
        quantity: l.quantity,
        unitPrice: { amount: l.unit_price_amount, currency: l.currency },
        lineTotal: { amount: l.line_total_amount, currency: l.currency },
      })),
      total: { amount: o.total_amount, currency: o.total_currency },
    }));
  }
}
