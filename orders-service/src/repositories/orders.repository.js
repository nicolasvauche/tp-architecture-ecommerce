import { getDb } from "../db/sqlite.js";

export class OrdersRepository {
  constructor() {
    this.db = getDb();

    this.insertOrderStmt = this.db.prepare(
      "INSERT INTO orders (number, total_amount, currency, created_at) VALUES (?, ?, ?, ?)"
    );

    this.insertLineStmt = this.db.prepare(
      `INSERT INTO order_lines (order_id, product_id, quantity, unit_amount, currency, line_total)
       VALUES (?, ?, ?, ?, ?, ?)`
    );

    this.getByIdStmt = this.db.prepare(
      `SELECT o.id, o.number, o.total_amount AS totalAmount, o.currency, o.created_at AS createdAt
       FROM orders o WHERE o.id = ?`
    );

    this.getLinesByOrderIdStmt = this.db.prepare(
      `SELECT product_id AS productId, quantity, unit_amount AS unitAmount,
              currency, line_total AS lineTotal
       FROM order_lines WHERE order_id = ? ORDER BY id ASC`
    );

    this.listOrdersStmt = this.db.prepare(
      `SELECT id, number, total_amount AS totalAmount, currency, created_at AS createdAt
       FROM orders ORDER BY id DESC LIMIT ? OFFSET ?`
    );
  }

  createOrder({ number, totalAmount, currency, createdAt, lines }) {
    const tx = this.db.transaction(() => {
      const info = this.insertOrderStmt.run(
        number,
        totalAmount,
        currency,
        createdAt
      );
      const orderId = info.lastInsertRowid;

      for (const l of lines) {
        this.insertLineStmt.run(
          orderId,
          String(l.productId),
          l.quantity,
          l.unitAmount,
          currency,
          l.lineTotal
        );
      }
      return { id: Number(orderId) };
    });

    return tx();
  }

  getById(id) {
    const order = this.getByIdStmt.get(id);
    if (!order) return null;
    const lines = this.getLinesByOrderIdStmt.all(id);
    return {
      id: order.id,
      number: order.number,
      total: { amount: Number(order.totalAmount), currency: order.currency },
      createdAt: order.createdAt,
      lines: lines.map((l) => ({
        productId: String(l.productId),
        quantity: l.quantity,
        unitPrice: { amount: Number(l.unitAmount), currency: order.currency },
        lineTotal: { amount: Number(l.lineTotal), currency: order.currency },
      })),
    };
  }

  list({ limit = 20, offset = 0 } = {}) {
    const rows = this.listOrdersStmt.all(limit, offset);
    return rows.map((r) => ({
      id: r.id,
      number: r.number,
      total: { amount: Number(r.totalAmount), currency: r.currency },
      createdAt: r.createdAt,
    }));
  }
}
