import { createApp } from "./app.js";
import { config } from "./shared/env.js";
import { logger } from "./shared/logger.js";
import errorMiddleware from "./shared/errorMiddleware.js";

async function loadDI(dataSource) {
  if (dataSource === "sqlite") {
    const { bootstrapSqlite } = await import("../config/di.sqlite.js");
    return bootstrapSqlite();
  }
  const { bootstrapMemory } = await import("../config/di.memory.js");
  return bootstrapMemory();
}

(async function main() {
  try {
    const { routers, onClose } = await loadDI(config.dataSource);

    const app = createApp({
      routers,
      errorMiddleware,
      logger,
    });

    const server = app.listen(config.port, () => {
      logger.info(
        `[http] listening on http://localhost:${config.port} (dataSource=${config.dataSource})`
      );
    });

    const shutdown = async (signal) => {
      logger.info(`[http] received ${signal}, shutting down...`);
      server.close(async (err) => {
        if (err) logger.error(err);
        try {
          if (typeof onClose === "function") {
            await onClose();
          }
        } catch (e) {
          logger.error(e);
        } finally {
          process.exit(err ? 1 : 0);
        }
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("unhandledRejection", (e) => {
      logger.error(e);
      shutdown("unhandledRejection");
    });
    process.on("uncaughtException", (e) => {
      logger.error(e);
      shutdown("uncaughtException");
    });
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();
