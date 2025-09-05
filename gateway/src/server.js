import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import { requestId } from "./middleware/requestId.js";
import { notFound } from "./middleware/notFound.js";
import { buildServiceProxy } from "./proxy.js";
import { healthRouter } from "./health.js";

dotenv.config();

const app = express();

const PORT = parseInt(process.env.PORT ?? "3000", 10);
const TIMEOUT_MS = parseInt(process.env.TIMEOUT_MS ?? "5000", 10);

const PRODUCTS_URL = process.env.PRODUCTS_URL ?? "http://localhost:4001";
const CART_URL = process.env.CART_URL ?? "http://localhost:4002";
const ORDERS_URL = process.env.ORDERS_URL ?? "http://localhost:4003";

app.use(express.json());
app.use(requestId());
app.use(
  morgan(":method :url :status - :response-time ms - reqid=:reqid", {
    stream: { write: (msg) => process.stdout.write(msg) },
  })
);
morgan.token("reqid", (req) => req.id);

const health = healthRouter({
  productsUrl: PRODUCTS_URL,
  cartUrl: CART_URL,
  ordersUrl: ORDERS_URL,
  timeout: TIMEOUT_MS,
});
app.get(health.path, health.handler);

app.use(
  "/products",
  buildServiceProxy({
    target: PRODUCTS_URL,
    timeout: TIMEOUT_MS,
    serviceName: "products",
  })
);

app.use(
  "/cart",
  buildServiceProxy({
    target: CART_URL,
    timeout: TIMEOUT_MS,
    serviceName: "cart",
  })
);

app.use(
  "/orders",
  buildServiceProxy({
    target: ORDERS_URL,
    timeout: TIMEOUT_MS,
    serviceName: "orders",
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "API Gateway — up",
    routes: ["/products", "/cart", "/orders", "/health"],
  });
});

app.use(notFound());

app.listen(PORT, () => {
  console.log(`Gateway listening on http://localhost:${PORT}`);
  console.log(`→ /products → ${PRODUCTS_URL}`);
  console.log(`→ /cart     → ${CART_URL}`);
  console.log(`→ /orders   → ${ORDERS_URL}`);
});
