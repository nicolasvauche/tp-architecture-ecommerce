import { CartDto } from "../../../../presentation/dto/CartDto.js";

export class CartController {
  constructor({
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    pricer,
    logger,
  }) {
    this.getCart = getCart;
    this.addToCart = addToCart;
    this.removeFromCart = removeFromCart;
    this.clearCart = clearCart;
    this.pricer = pricer;
    this.logger = logger;
  }

  async get(_req, res, next) {
    try {
      const cart = await this.getCart.execute();
      const pricing = await this.pricer.price(cart);
      res.status(200).json(CartDto.fromPricing(pricing));
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
    try {
      const { productId, quantity } = req.body ?? {};
      const cart = await this.addToCart.execute({ productId, quantity });
      const pricing = await this.pricer.price(cart);
      res.status(200).json(CartDto.fromPricing(pricing));
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { productId } = req.params;
      const cart = await this.removeFromCart.execute({ productId });
      const pricing = await this.pricer.price(cart);
      res.status(200).json(CartDto.fromPricing(pricing));
    } catch (err) {
      next(err);
    }
  }

  async clear(_req, res, next) {
    try {
      const cart = await this.clearCart.execute();
      const pricing = await this.pricer.price(cart);
      res.status(200).json(CartDto.fromPricing(pricing));
    } catch (err) {
      next(err);
    }
  }
}
