import { ProductDto } from "./ProductDto.js";

export class ProductsController {
  constructor({ listProducts }) {
    this.listProducts = listProducts;
  }

  async list(query = {}) {
    const result =
      typeof this.listProducts.execute === "function"
        ? await this.listProducts.execute({ ...query })
        : await this.listProducts({ ...query });

    return ProductDto.list(result);
  }
}
