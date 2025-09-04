export class OrderRepository {
  /** @param {Object} order @returns {Promise<void>} */ async save(order) {
    throw new Error("Not implemented");
  }
  /** @param {string} id @returns {Promise<Object|null>} */ async findById(id) {
    throw new Error("Not implemented");
  }
  /** @returns {Promise<Array>} */ async list() {
    throw new Error("Not implemented");
  }
}
