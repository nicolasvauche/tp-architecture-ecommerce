import { createDb } from "../infrastructure/sqlite/db.js";
import { config } from "../infrastructure/shared/env.js";

import { ProductRepositorySqlite } from "../infrastructure/sqlite/products/ProductRepositorySqlite.js";
import { CartRepositorySqlite } from "../infrastructure/sqlite/cart/CartRepositorySqlite.js";
import { OrderRepositorySqlite } from "../infrastructure/sqlite/orders/OrderRepositorySqlite.js";

import { ListProductsUseCase } from "../src/products/application/usecases/ListProductsUseCase.js";

import { AddToCartUseCase } from "../src/cart/application/usecases/AddToCartUseCase.js";
import { RemoveFromCartUseCase } from "../src/cart/application/usecases/RemoveFromCartUseCase.js";
import { ClearCartUseCase } from "../src/cart/application/usecases/ClearCartUseCase.js";
import { GetCartUseCase } from "../src/cart/application/usecases/GetCartUseCase.js";
import { CartPricingService } from "../src/cart/application/services/CartPricingService.js";

import { CheckoutOrderUseCase } from "../src/orders/application/usecases/CheckoutOrderUseCase.js";
import { ListOrdersUseCase } from "../src/orders/application/usecases/ListOrdersUseCase.js";
import { GetOrderDetailUseCase } from "../src/orders/application/usecases/GetOrderDetailUseCase.js";

export function createSqliteContainer() {
  const db = createDb({ file: config.sqliteDb });
  const registry = new Map();

  registry.set("ProductRepository", new ProductRepositorySqlite(db));
  registry.set("CartRepository", new CartRepositorySqlite(db));
  registry.set("OrderRepository", new OrderRepositorySqlite(db));

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

  registry.set("Db", db);

  return {
    get: (token) => {
      if (!registry.has(token))
        throw new Error(`DI: token not found: ${token}`);
      return registry.get(token);
    },
  };
}
