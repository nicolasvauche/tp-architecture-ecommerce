const express = require("express");
const state = require("./state");

const router = express.Router();

// GET /products
router.get("/", (_req, res) => {
  res.json(state.products);
});

module.exports = router;
