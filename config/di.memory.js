import { ProductRepositoryInMemory } from "../infrastructure/memory/products/ProductRepositoryInMemory.js";
import { ListProductsUseCase } from "../src/products/application/usecases/ListProductsUseCase.js";

import { CartRepositoryInMemory } from "../infrastructure/memory/cart/CartRepositoryInMemory.js";
import { AddToCartUseCase } from "../src/cart/application/usecases/AddToCartUseCase.js";
import { RemoveFromCartUseCase } from "../src/cart/application/usecases/RemoveFromCartUseCase.js";
import { ClearCartUseCase } from "../src/cart/application/usecases/ClearCartUseCase.js";
import { GetCartUseCase } from "../src/cart/application/usecases/GetCartUseCase.js";

import { CartPricingService } from "../src/cart/application/services/CartPricingService.js";

export function createMemoryContainer() {
  const registry = new Map();

  registry.set("ProductRepository", new ProductRepositoryInMemory());
  registry.set("CartRepository", new CartRepositoryInMemory());

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

  return {
    get: (token) => {
      if (!registry.has(token))
        throw new Error(`DI: token not found: ${token}`);
      return registry.get(token);
    },
  };
}
