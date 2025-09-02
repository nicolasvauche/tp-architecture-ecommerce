import { Sku } from "../value-objects/Sku.js";
import { ProductName } from "../value-objects/ProductName.js";
import { Money } from "../../../shared-kernel/value-objects/Money.js";

export class Product {
  constructor({ id, sku, name, price }) {
    this.id = id;
    this.sku = sku instanceof Sku ? sku : new Sku(sku);
    this.name = name instanceof ProductName ? name : new ProductName(name);

    if (price instanceof Money) {
      this.price = price;
    } else if (
      price &&
      Number.isInteger(price.amount) &&
      typeof price.currency === "string"
    ) {
      this.price = new Money(price.amount, price.currency);
    } else {
      throw new Error(
        "Product.price must be Money or {amount:int, currency:string}"
      );
    }
  }

  rename(newName) {
    this.name = new ProductName(newName);
  }
}
