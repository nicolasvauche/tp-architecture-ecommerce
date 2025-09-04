import { ProductName } from "../value-objects/ProductName.js";
import { Sku } from "../value-objects/Sku.js";
import { Money } from "../../shared-kernel/value-objects/Money.js";

export class Product {
  constructor({ id, name, sku, price }) {
    this.id = String(id);
    this.name = name instanceof ProductName ? name : new ProductName(name);
    this.sku = sku instanceof Sku ? sku : new Sku(sku);
    this.price =
      price instanceof Money ? price : new Money(price.amount, price.currency);
  }

  static fromPrimitives(p) {
    return new Product({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: new Money(p.price.amount, p.price.currency),
    });
  }

  toObject() {
    return {
      id: this.id,
      name: this.name.value,
      sku: this.sku.value,
      price: { amount: this.price.amount, currency: this.price.currency },
    };
  }
}
