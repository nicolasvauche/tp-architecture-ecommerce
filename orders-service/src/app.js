import express from "express";
import routes from "./routes/orders.routes.js";

const app = express();
app.use(express.json());

app.use("/", routes);

app.use((err, _req, res, _next) => {
  const status = err.statusCode ?? 500;
  res.status(status).json({
    error: { code: "ORDERS_ERROR", message: err.message ?? "Unexpected error" },
  });
});

export default app;
