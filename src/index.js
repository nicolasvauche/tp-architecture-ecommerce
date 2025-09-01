const express = require("express");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const ordersRouter = require("./orders");

const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);

app.get("/", (_req, res) =>
  res.send("Bienvenue sur l’API e-commerce monolithique 🚀")
);

// export pour Supertest
module.exports = app;

// écoute uniquement si lancé directement: `node src/index.js`
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
}
