import { ProductRepositoryInMemory } from "../infrastructure/memory/products/ProductRepositoryInMemory.js";
import { ListProductsUseCase } from "../src/products/application/usecases/ListProductsUseCase.js";

import { CartRepositoryInMemory } from "../infrastructure/memory/cart/CartRepositoryInMemory.js";
import { AddToCartUseCase } from "../src/cart/application/usecases/AddToCartUseCase.js";
import { RemoveFromCartUseCase } from "../src/cart/application/usecases/RemoveFromCartUseCase.js";
import { ClearCartUseCase } from "../src/cart/application/usecases/ClearCartUseCase.js";
import { GetCartUseCase } from "../src/cart/application/usecases/GetCartUseCase.js";
import { CartPricingService } from "../src/cart/application/services/CartPricingService.js";

import { OrderRepositoryInMemory } from "../infrastructure/memory/orders/OrderRepositoryInMemory.js";
import { CheckoutOrderUseCase } from "../src/orders/application/usecases/CheckoutOrderUseCase.js";
import { ListOrdersUseCase } from "../src/orders/application/usecases/ListOrdersUseCase.js";
import { GetOrderDetailUseCase } from "../src/orders/application/usecases/GetOrderDetailUseCase.js";

export function createMemoryContainer() {
  const registry = new Map();

  registry.set("ProductRepository", new ProductRepositoryInMemory());
  registry.set("CartRepository", new CartRepositoryInMemory());
  registry.set("OrderRepository", new OrderRepositoryInMemory());

  registry.set(
    "ListProductsUseCase",
    new ListProductsUseCase(registry.get("ProductRepository"))
  );
  registry.set(
    "AddToCartUseCase",
    new AddToCartUseCase({
      cartRepository: registry.get("CartRepository"),
      productRepository: registry.get("ProductRepository"),
    })
  );
  registry.set(
    "RemoveFromCartUseCase",
    new RemoveFromCartUseCase({
      cartRepository: registry.get("CartRepository"),
    })
  );
  registry.set(
    "ClearCartUseCase",
    new ClearCartUseCase({
      cartRepository: registry.get("CartRepository"),
    })
  );
  registry.set(
    "GetCartUseCase",
    new GetCartUseCase({
      cartRepository: registry.get("CartRepository"),
    })
  );
  registry.set(
    "CartPricingService",
    new CartPricingService({
      productRepository: registry.get("ProductRepository"),
    })
  );
  registry.set(
    "CheckoutOrderUseCase",
    new CheckoutOrderUseCase({
      cartRepository: registry.get("CartRepository"),
      productRepository: registry.get("ProductRepository"),
      orderRepository: registry.get("OrderRepository"),
      pricer: registry.get("CartPricingService"),
    })
  );
  registry.set(
    "ListOrdersUseCase",
    new ListOrdersUseCase({ orderRepository: registry.get("OrderRepository") })
  );
  registry.set(
    "GetOrderDetailUseCase",
    new GetOrderDetailUseCase({
      orderRepository: registry.get("OrderRepository"),
    })
  );

  return {
    get: (token) => {
      if (!registry.has(token))
        throw new Error(`DI: token not found: ${token}`);
      return registry.get(token);
    },
  };
}
