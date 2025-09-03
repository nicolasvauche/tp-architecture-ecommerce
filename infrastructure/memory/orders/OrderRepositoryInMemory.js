import { OrderRepository } from "../../../src/orders/interface/adapters/repositories/OrderRepository.js";
import { Order } from "../../../src/orders/domain/entities/Order.js";

export class OrderRepositoryInMemory extends OrderRepository {
  constructor() {
    super();
    this._items = [];
    this._autoId = 1;
  }

  async save(order) {
    const normalized =
      order instanceof Order
        ? order
        : new Order({ ...order, createdAt: order.createdAt ?? new Date() });

    const idx = this._items.findIndex(
      (o) => o.id.toString() === normalized.id.toString()
    );
    if (idx >= 0) {
      this._items[idx] = normalized;
      return normalized;
    } else {
      const withId =
        normalized instanceof Order
          ? normalized
          : new Order({ ...normalized, id: String(this._autoId++) });
      if (!withId.id) {
        const patched = new Order({
          ...withId,
          id: String(this._autoId++),
        });
        this._items.push(patched);
        return patched;
      }
      this._items.push(withId);
      return withId;
    }
  }

  async findAll() {
    return [...this._items].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async findById(id) {
    return this._items.find((o) => o.id.toString() === String(id)) ?? null;
  }
}
