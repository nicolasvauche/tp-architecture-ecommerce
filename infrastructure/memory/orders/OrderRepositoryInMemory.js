import { OrderRepository } from "../../../src/orders/interface/adapters/repositories/OrderRepository.js";
import { Order } from "../../../src/orders/domain/entities/Order.js";

export class OrderRepositoryInMemory extends OrderRepository {
  constructor() {
    super();
    this._items = [];
    this._autoId = 1;
  }
  async save(order) {
    const exists = this._items.findIndex(
      (o) => o.id.toString() === order.id.toString()
    );
    if (exists >= 0) this._items[exists] = order;
    else {
      const withId = new Order({ ...order, id: String(this._autoId++) });
      this._items.push(withId);
      return withId;
    }
    return order;
  }
  async findAll() {
    return [...this._items];
  }
  async findById(id) {
    return this._items.find((o) => o.id.toString() === String(id)) ?? null;
  }
}
