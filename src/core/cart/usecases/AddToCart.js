import { AddToCartPort } from "../../../ports/in/cart/AddToCartPort.js";
import { DomainError } from "../../shared-kernel/errors/DomainError.js";
import { Money } from "../../shared-kernel/value-objects/Money.js";
import { Quantity } from "../value-objects/Quantity.js";
import { Cart } from "../entities/Cart.js";

export class AddToCart extends AddToCartPort {
  /** @param {{ cartRepo: any, productRepo: any }} deps */
  constructor({ cartRepo, productRepo }) {
    super();
    this.cartRepo = cartRepo;
    this.productRepo = productRepo;
  }

  /** @param {{productId:string|number, quantity?:number}} input */
  async execute({ productId, quantity = 1 }) {
    const q = new Quantity(quantity).value;

    const product = await this.productRepo.findById(productId);
    if (!product) throw new DomainError("unknown_product", "Produit inconnu");

    const unitPrice = new Money(product.price.amount, product.price.currency);

    const current = await this.cartRepo.get();
    const cart = new Cart(current);
    cart.upsertLine({ productId, unitPrice, quantity: q });

    await this.cartRepo.save(cart.toObject());
    return cart.toObject();
  }
}
