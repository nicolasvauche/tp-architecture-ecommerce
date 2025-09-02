export class ProductDto {
  static fromEntity(p) {
    return {
      id: p.id,
      sku: p.sku.toString(),
      name: p.name.toString(),
      price: p.price.toJSON(),
    };
  }
}
