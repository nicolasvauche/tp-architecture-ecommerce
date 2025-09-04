export class ProductDto {
  static from(product) {
    return {
      id: product.id,
      name: product.name?.value ?? product.name,
      sku: product.sku?.value ?? product.sku,
      price: {
        amount: product.price?.decimal ?? product.price?.amount ?? null,
        currency: product.price?.currency ?? "EUR",
      },
    };
  }

  static list(products) {
    return products.map((p) => ProductDto.from(p));
  }
}
