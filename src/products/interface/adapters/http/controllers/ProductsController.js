import { ProductDto } from "../../../../presentation/dto/ProductDto.js";

export class ProductsController {
  constructor({ listProductsUseCase, logger }) {
    this.listProductsUseCase = listProductsUseCase;
    this.logger = logger;
  }

  async list(_req, res, next) {
    try {
      const products = await this.listProductsUseCase.execute();
      res.status(200).json(products.map(ProductDto.fromEntity));
    } catch (err) {
      this.logger?.error?.("List products failed", { err });
      next(err);
    }
  }
}
