export class OrderDto {
  static fromEntity(o) {
    return {
      id: o.id.toString(),
      number: o.number.toString(),
      lines: o.lines.map((l) => ({
        productId: l.productId,
        sku: l.sku,
        name: l.name,
        quantity: l.quantity,
        unitPrice: l.unitPrice.toJSON(),
        lineTotal: l.lineTotal.toJSON(),
      })),
      total: o.total.toJSON(),
    };
  }
}
