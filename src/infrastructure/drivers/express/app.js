import express from "express";
import { logger as defaultLogger } from "../../shared/logger.js";
import { config } from "../../shared/env.js";

export function createApp({ container, logger = defaultLogger } = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/__health", (req, res) => {
    res
      .status(200)
      .json({ status: "ok", dataSource: process.env.DATA_SOURCE || "memory" });
  });

  // TODO: monter les routes par domaines quand prêtes
  // Exemple (quand tu auras créé routes/controllers) :
  // import { productsRoutes } from '../../../../src/products/interface/adapters/http/routes/products.routes.js';
  // app.use('/products', productsRoutes({ container, logger: logger.child({ module: 'products' }) }));

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
