const express = require("express");
const state = require("./state");

const router = express.Router();

// GET /cart
router.get("/", (_req, res) => {
  res.json(state.cart);
});

// POST /cart { productId, quantity }
router.post("/", (req, res) => {
  const { productId, quantity } = req.body || {};

  // Vérifications basiques
  if (
    !Number.isInteger(productId) ||
    !Number.isInteger(quantity) ||
    productId <= 0 ||
    quantity <= 0
  ) {
    return res
      .status(400)
      .json({
        error: "productId et quantity doivent être des entiers positifs",
      });
  }

  // Vérifier que le produit est proposé
  const product = state.products.find((p) => p.id === productId);
  if (!product) {
    return res.status(400).json({ error: "Produit non proposé" });
  }

  // Vérifier si le produit est déjà dans le panier
  const existing = state.cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity; // on fusionne les lignes
  } else {
    state.cart.push({ productId, quantity });
  }

  res.json({ message: "Produit ajouté au panier" });
});

// DELETE /cart
router.delete("/", (_req, res) => {
  state.cart = [];
  res.json({ message: "Panier vidé" });
});

module.exports = router;
