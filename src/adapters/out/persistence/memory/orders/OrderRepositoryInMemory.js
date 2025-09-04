import { OrderRepository } from "../../../../../../ports/out/orders/OrderRepository.js";

export class OrderRepositoryInMemory extends OrderRepository {
  constructor() {
    super();
    this._orders = new Map();
  }

  async save(order) {
    const id = order.id?.value ?? order.id;
    this._orders.set(String(id), JSON.parse(JSON.stringify(order)));
  }

  async findById(id) {
    const o = this._orders.get(String(id));
    return o ? JSON.parse(JSON.stringify(o)) : null;
  }

  async list() {
    return Array.from(this._orders.values()).map((o) =>
      JSON.parse(JSON.stringify(o))
    );
  }
}
