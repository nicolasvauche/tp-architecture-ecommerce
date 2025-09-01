const express = require("express");
const router = express.Router();

let cart = [];

// GET /cart
router.get("/", (req, res) => {
  res.json(cart);
});

// POST /cart { productId, quantity }
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  cart.push({ productId, quantity });
  res.json({ message: "Produit ajouté au panier" });
});

// DELETE /cart
router.delete("/", (req, res) => {
  cart = [];
  res.json({ message: "Panier vidé" });
});

module.exports = router;
