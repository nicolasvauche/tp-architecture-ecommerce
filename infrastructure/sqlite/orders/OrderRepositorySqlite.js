import { OrderRepository } from "../../../src/orders/interface/adapters/repositories/OrderRepository.js";
import { Order } from "../../../src/orders/domain/entities/Order.js";
import { OrderId } from "../../../src/orders/domain/value-objects/OrderId.js";
import { OrderNumber } from "../../../src/orders/domain/value-objects/OrderNumber.js";
import { Money } from "../../../src/shared-kernel/value-objects/Money.js";

export class OrderRepositorySqlite extends OrderRepository {
  constructor(db) {
    super();
    this.db = db;

    this.qInsert = db.prepare(`
      INSERT INTO orders (id, number, created_at, currency, total_cents)
      VALUES (?, ?, ?, ?, ?)
    `);
    this.qInsertLine = db.prepare(`
      INSERT INTO order_items (order_id, product_id, unit_cents, quantity, line_cents)
      VALUES (?, ?, ?, ?, ?)
    `);
    this.qAll = db.prepare(`
      SELECT id, number, created_at, currency, total_cents
      FROM orders
      ORDER BY created_at DESC
    `);
    this.qOne = db.prepare(`
      SELECT id, number, created_at, currency, total_cents
      FROM orders
      WHERE id = ?
    `);
    this.qLines = db.prepare(`
      SELECT product_id, unit_cents, quantity, line_cents
      FROM order_items
      WHERE order_id = ?
    `);
  }

  async save(order) {
    const lines = Array.isArray(order.lines) ? order.lines : [];

    this.db.transaction(() => {
      this.qInsert.run(
        order.id.value,
        order.number.value,
        order.createdAt.toISOString(),
        order.total.currency,
        order.total.amount
      );

      for (const l of lines) {
        this.qInsertLine.run(
          order.id.value,
          l.productId,
          l.unitPrice.amount,
          l.quantity,
          l.lineTotal.amount
        );
      }
    })();

    return order;
  }

  async findAll() {
    const rows = this.qAll.all();
    return rows.map(
      (r) =>
        new Order({
          id: new OrderId(r.id),
          number: new OrderNumber(r.number),
          createdAt: r.created_at,
          lines: [],
          total: new Money(r.total_cents, r.currency),
        })
    );
  }

  async findById(id) {
    const r = this.qOne.get(id);
    if (!r) return null;

    const lines = this.qLines.all(id).map((it) => ({
      productId: it.product_id,
      quantity: it.quantity,
      unitPrice: new Money(it.unit_cents, r.currency),
      lineTotal: new Money(it.line_cents, r.currency),
    }));

    return new Order({
      id: new OrderId(r.id),
      number: new OrderNumber(r.number),
      createdAt: r.created_at,
      lines,
      total: new Money(r.total_cents, r.currency),
    });
  }
}
