const express = require("express");
const state = require("./state");

const router = express.Router();

// GET /orders
router.get("/", (req, res) => {
  res.json(state.orders);
});

// POST /orders
router.post("/", (req, res) => {
  if (state.cart.length === 0) {
    return res
      .status(400)
      .json({ error: "Panier vide, impossible de créer une commande" });
  }

  const order = {
    id: state.nextOrderId,
    createdAt: new Date().toISOString(),
    status: "PENDING",
    items: [...state.cart], // copie du panier actuel
  };

  state.orders.push(order);
  state.nextOrderId += 1;
  // state.cart = [];

  res.json(order);
});

module.exports = router;
