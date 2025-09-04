export class CartRepository {
  /** @returns {Promise<Object>} */ async get() {
    throw new Error("Not implemented");
  }
  /** @param {Object} cart @returns {Promise<void>} */ async save(cart) {
    throw new Error("Not implemented");
  }
  /** @param {string|number} productId @returns {Promise<Object>} */ async remove(
    productId
  ) {
    throw new Error("Not implemented");
  }
  /** @returns {Promise<Object>} */ async clear() {
    throw new Error("Not implemented");
  }
}
