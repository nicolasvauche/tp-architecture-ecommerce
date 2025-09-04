// Wiring "sqlite" : ports OUT -> impl SQLite
import { ListProducts } from "../src/core/products/usecases/ListProducts.js";
import { AddToCart } from "../src/core/cart/usecases/AddToCart.js";
import { RemoveFromCart } from "../src/core/cart/usecases/RemoveFromCart.js";
import { ClearCart } from "../src/core/cart/usecases/ClearCart.js";
import { CheckoutOrder } from "../src/core/orders/usecases/CheckoutOrder.js";
import { GetOrderDetail } from "../src/core/orders/usecases/GetOrderDetail.js";
import { ListOrders } from "../src/core/orders/usecases/ListOrders.js";

// Impl SQLite (ports/out)
import { ProductRepositorySqlite } from "../src/adapters/out/persistence/sqlite/products/ProductRepositorySqlite.js";
import { CartRepositorySqlite } from "../src/adapters/out/persistence/sqlite/cart/CartRepositorySqlite.js";
import { OrderRepositorySqlite } from "../src/adapters/out/persistence/sqlite/orders/OrderRepositorySqlite.js";
import { db } from "../src/adapters/out/persistence/sqlite/db.js";

// Interface (controllers)
import { ProductsController } from "../src/interface/products/http/ProductsController.js";
import { CartController } from "../src/interface/cart/http/CartController.js";
import { OrdersController } from "../src/interface/orders/http/OrdersController.js";

// Adapters IN (Express)
import { buildProductsRouter } from "../src/adapters/in/http/express/products.routes.js";
import { buildCartRouter } from "../src/adapters/in/http/express/cart.routes.js";
import { buildOrdersRouter } from "../src/adapters/in/http/express/orders.routes.js";

export async function bootstrapSqlite() {
  // --- Adapters OUT (SQLite) ---
  const productRepo = new ProductRepositorySqlite({ db });
  const cartRepo = new CartRepositorySqlite({ db });
  const orderRepo = new OrderRepositorySqlite({ db });

  // --- Use cases ---
  const listProducts = new ListProducts({ productRepo });
  const addToCart = new AddToCart({ cartRepo, productRepo });
  const removeFromCart = new RemoveFromCart({ cartRepo });
  const clearCart = new ClearCart({ cartRepo });

  const checkoutOrder = new CheckoutOrder({
    cartRepo,
    orderRepo,
  });
  const getOrderDetail = new GetOrderDetail({ orderRepo });
  const listOrders = new ListOrders({ orderRepo });

  // --- Controllers ---
  const productsController = new ProductsController({ listProducts });
  const cartController = new CartController({
    addToCart,
    removeFromCart,
    clearCart,
  });
  const ordersController = new OrdersController({
    checkoutOrder,
    getOrderDetail,
    listOrders,
  });

  // --- Routers ---
  const productsRouter = {
    basePath: "/products",
    router: buildProductsRouter({ controller: productsController }),
  };
  const cartRouter = {
    basePath: "/cart",
    router: buildCartRouter({ controller: cartController }),
  };
  const ordersRouter = {
    basePath: "/orders",
    router: buildOrdersRouter({ controller: ordersController }),
  };

  return {
    routers: [productsRouter, cartRouter, ordersRouter],
    onClose: async () => {
      if (db?.close) db.close();
    },
  };
}
