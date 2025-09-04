import { ListProductsPort } from "../../../ports/in/products/ListProductsPort.js";
import { Product } from "../entities/Product.js";

export class ListProducts extends ListProductsPort {
  /** @param {{ productRepo: any }} deps */
  constructor({ productRepo }) {
    super();
    this.productRepo = productRepo;
  }
  async execute() {
    const rows = await this.productRepo.findAll();
    return rows.map(Product.fromPrimitives).map((p) => p.toObject());
  }
}
