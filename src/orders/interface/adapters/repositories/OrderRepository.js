export class OrderRepository {
  /** @param {Order} order */ async save(_order) {
    throw new Error("Not implemented");
  }
  /** @returns {Promise<Order[]>} */ async findAll() {
    throw new Error("Not implemented");
  }
  /** @returns {Promise<Order|null>} */ async findById(_id) {
    throw new Error("Not implemented");
  }
}
