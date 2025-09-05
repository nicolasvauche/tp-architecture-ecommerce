import { ProductsRepository } from "../repositories/products.repository.js";

export class ProductsService {
  constructor(repo = new ProductsRepository()) {
    this.repo = repo;
  }

  listProducts() {
    const rows = this.repo.findAll();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      price: {
        amount: Number(r.price),
        currency: r.currency,
      },
    }));
  }
}
