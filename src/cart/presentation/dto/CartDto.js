export class CartDto {
  static fromPricing(pricing) {
    return {
      items: pricing.lines.map((l) => ({
        productId: l.productId,
        quantity: l.quantity,
        unitPrice: l.unitPrice.toJSON(),
        lineTotal: l.lineTotal.toJSON(),
      })),
      total: pricing.total.toJSON(),
    };
  }
}
