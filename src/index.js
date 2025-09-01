const express = require("express");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const ordersRouter = require("./orders");

const app = express();

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Routes principales
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API e-commerce monolithique 🚀");
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur e-commerce en ligne sur http://localhost:${PORT}`);
});
