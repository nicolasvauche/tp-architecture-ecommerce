// Wiring "mémoire" : ports OUT -> impl InMemory, puis controllers, puis routers.
import { ListProducts } from "../src/core/products/usecases/ListProducts.js";
import { AddToCart } from "../src/core/cart/usecases/AddToCart.js";
import { RemoveFromCart } from "../src/core/cart/usecases/RemoveFromCart.js";
import { ClearCart } from "../src/core/cart/usecases/ClearCart.js";
import { CheckoutOrder } from "../src/core/orders/usecases/CheckoutOrder.js";
import { GetOrderDetail } from "../src/core/orders/usecases/GetOrderDetail.js";
import { ListOrders } from "../src/core/orders/usecases/ListOrders.js";

// Impl InMemory (ports/out)
import { ProductRepositoryInMemory } from "../src/adapters/out/persistence/memory/products/ProductRepositoryInMemory.js";
import { CartRepositoryInMemory } from "../src/adapters/out/persistence/memory/cart/CartRepositoryInMemory.js";
import { OrderRepositoryInMemory } from "../src/adapters/out/persistence/memory/orders/OrderRepositoryInMemory.js";

// Interface (controllers HTTP-agnostiques)
import { ProductsController } from "../src/interface/products/http/ProductsController.js";
import { CartController } from "../src/interface/cart/http/CartController.js";
import { OrdersController } from "../src/interface/orders/http/OrdersController.js";

// Adapters IN (Express)
import { buildProductsRouter } from "../src/adapters/in/http/express/products.routes.js";
import { buildCartRouter } from "../src/adapters/in/http/express/cart.routes.js";
import { buildOrdersRouter } from "../src/adapters/in/http/express/orders.routes.js";

export async function bootstrapMemory() {
  // --- Adapters OUT (InMemory) ---
  const productRepo = new ProductRepositoryInMemory();
  const cartRepo = new CartRepositoryInMemory();
  const orderRepo = new OrderRepositoryInMemory();

  // --- Use cases (ports IN effectifs) ---
  const listProducts = new ListProducts({ productRepo });
  const addToCart = new AddToCart({ cartRepo, productRepo });
  const removeFromCart = new RemoveFromCart({ cartRepo });
  const clearCart = new ClearCart({ cartRepo });

  // Ports techniques optionnels (ex: clock/uuid/tx)
  const checkoutOrder = new CheckoutOrder({ cartRepo, orderRepo });
  const getOrderDetail = new GetOrderDetail({ orderRepo });
  const listOrders = new ListOrders({ orderRepo });

  // --- Controllers (Interface) ---
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

  // --- Routers Express (Adapters IN) ---
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
    onClose: async () => {},
  };
}
