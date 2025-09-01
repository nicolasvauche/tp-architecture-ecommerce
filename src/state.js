// "Seed" = données initiales (produits fictifs, panier vide, etc.)
let products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Mug", price: 10 },
];

let cart = []; // panier en mémoire
let orders = []; // commandes en mémoire
let nextOrderId = 1; // compteur d'ID pour les commandes

// Fonction pour réinitialiser l'état (utile pour les tests automatisés)
function reset() {
  products = [
    { id: 1, name: "T-shirt", price: 20 },
    { id: 2, name: "Mug", price: 10 },
  ];
  cart = [];
  orders = [];
  nextOrderId = 1;
}

// Exporter l'état "vivant" (références vers les variables)
module.exports = {
  get products() {
    return products;
  },
  set products(val) {
    products = val;
  },

  get cart() {
    return cart;
  },
  set cart(val) {
    cart = val;
  },

  get orders() {
    return orders;
  },
  set orders(val) {
    orders = val;
  },

  get nextOrderId() {
    return nextOrderId;
  },
  set nextOrderId(val) {
    nextOrderId = val;
  },

  reset,
};
