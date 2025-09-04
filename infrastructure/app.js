import express from "express";
import helmet from "helmet";

export function createApp({ routers = [], errorMiddleware, logger }) {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  for (const r of routers) {
    if (r && typeof r === "object" && r.router) {
      app.use(r.basePath ?? "/", r.router);
    } else {
      app.use("/", r);
    }
  }

  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

  if (typeof errorMiddleware === "function") {
    app.use(errorMiddleware(logger));
  } else {
    app.use((err, req, res, next) => {
      logger?.error?.(err) ?? console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
  }

  return app;
}

export default createApp;
