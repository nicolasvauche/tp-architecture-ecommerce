export class OrderDto {
  static from(order) {
    return {
      id: order.id?.value ?? order.id,
      number: order.number?.value ?? order.number,
      createdAt: order.createdAt,
      lines: order.lines.map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
        unitPrice: {
          amount: line.unitPrice?.decimal ?? line.unitPrice?.amount ?? null,
          currency: line.unitPrice?.currency ?? "EUR",
        },
        lineTotal: {
          amount: line.lineTotal?.decimal ?? line.lineTotal?.amount ?? null,
          currency: line.lineTotal?.currency ?? "EUR",
        },
      })),
      total: {
        amount: order.total?.decimal ?? order.total?.amount ?? null,
        currency: order.total?.currency ?? "EUR",
      },
    };
  }

  static list(orders) {
    return orders.map((o) => OrderDto.from(o));
  }
}
