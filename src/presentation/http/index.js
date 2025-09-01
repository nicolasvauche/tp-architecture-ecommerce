import express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

const app = express();
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);

export default app;
