const express = require("express");
const router = express.Router();

// Produits en mémoire
let products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Mug", price: 10 },
];

// GET /products
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
