import { Money } from "../../../shared-kernel/value-objects/Money.js";

export class CartPricingService {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async price(cart) {
    const products = await this.productRepository.findAll();
    const byId = new Map(products.map((p) => [String(p.id), p]));

    const lines = cart
      .items()
      .map(({ productId, quantity }) => {
        const product = byId.get(String(productId));
        if (!product) {
          return null;
        }
        const qty = quantity.toNumber();
        const unitPrice = product.price;
        const lineTotal = unitPrice.multiply(qty);
        return {
          productId: String(product.id),
          sku: product.sku.toString(),
          name: product.name.toString(),
          quantity: qty,
          unitPrice,
          lineTotal,
        };
      })
      .filter(Boolean);

    const total = lines.reduce(
      (acc, l) => acc.add(l.lineTotal),
      Money.zero(lines[0]?.unitPrice.currency ?? "EUR")
    );

    return { lines, total };
  }
}
