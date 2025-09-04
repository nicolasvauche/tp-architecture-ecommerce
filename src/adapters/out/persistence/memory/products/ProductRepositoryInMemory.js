import { ProductRepository } from "../../../../../../ports/out/products/ProductRepository.js";

export class ProductRepositoryInMemory extends ProductRepository {
  constructor({ data = null } = {}) {
    super();
    this.products = data ?? [
      {
        id: "1",
        name: "Guitare",
        sku: "GTR-01",
        price: { amount: 1999, currency: "EUR" },
      },
      {
        id: "2",
        name: "Basse",
        sku: "BAS-02",
        price: { amount: 999, currency: "EUR" },
      },
      {
        id: "3",
        name: "Batterie",
        sku: "DRM-03",
        price: { amount: 2999, currency: "EUR" },
      },
    ];
  }
  async findAll() {
    return this.products;
  }
  async findById(id) {
    return this.products.find((p) => String(p.id) === String(id)) ?? null;
  }
}
