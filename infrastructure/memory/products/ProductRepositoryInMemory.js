import { ProductRepository } from "../../../src/products/interface/adapters/repositories/ProductRepository.js";
import { Product } from "../../../src/products/domain/entities/Product.js";

const SEED = [
  {
    id: 1,
    sku: "SKU-001",
    name: "T-Shirt noir",
    price: { amount: 1999, currency: "EUR" },
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Sticker pack",
    price: { amount: 499, currency: "EUR" },
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Vinyle édition",
    price: { amount: 2499, currency: "EUR" },
  },
];

export class ProductRepositoryInMemory extends ProductRepository {
  constructor(seed = SEED) {
    super();
    this.items = seed.map((data) => new Product(data));
  }
  async findAll() {
    return this.items;
  }
}
