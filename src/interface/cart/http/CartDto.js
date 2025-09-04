export class CartDto {
  static from(cart) {
    return {
      items: cart.lines.map((line) => ({
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
        amount: cart.total?.decimal ?? cart.total?.amount ?? null,
        currency: cart.total?.currency ?? "EUR",
      },
    };
  }
}
