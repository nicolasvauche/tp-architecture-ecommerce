import express from "express";
import { logger as defaultLogger } from "../../shared/logger.js";
import { config } from "../../shared/env.js";
import { createMemoryContainer } from "../../../config/di.memory.js";
import { productsRoutes } from "../../../src/products/interface/adapters/http/routes/products.routes.js";
import { cartRoutes } from "../../../src/cart/interface/adapters/http/routes/cart.routes.js";
import { ordersRoutes } from "../../../src/orders/interface/adapters/http/routes/orders.routes.js";

export function createApp({ container, logger = defaultLogger } = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const di = container ?? createMemoryContainer();

  app.get("/__health", (req, res) => {
    res
      .status(200)
      .json({ status: "ok", dataSource: process.env.DATA_SOURCE || "memory" });
  });

  app.use(
    "/products",
    productsRoutes({
      container: di,
      logger: logger.child({ module: "products" }),
    })
  );
  app.use(
    "/cart",
    cartRoutes({ container: di, logger: logger.child({ module: "cart" }) })
  );
  app.use(
    "/orders",
    ordersRoutes({ container: di, logger: logger.child({ module: "orders" }) })
  );

  app.use((req, res) => {
    res.status(404).json({ error: "Not Found", path: req.originalUrl });
  });

  (async () => {
    const { errorMiddleware } = await import(
      "./middlewares/errorMiddleware.js"
    );
    app.use(errorMiddleware(logger, config));
  })();

  logger.info(`Express app initialized (env: ${config.logLevel})`);

  return app;
}
