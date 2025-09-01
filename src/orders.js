const express = require("express");
const router = express.Router();

let orders = [];
let nextOrderId = 1;

// GET /orders
router.get("/", (req, res) => {
  res.json(orders);
});

// POST /orders
router.post("/", (req, res) => {
  const order = { id: nextOrderId++, createdAt: new Date(), status: "PENDING" };
  orders.push(order);
  res.json(order);
});

module.exports = router;
