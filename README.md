# Monolithe E-commerce (Node.js + Express)

Un **projet fil rouge** pour comprendre les bases des architectures applicatives :

- On commence par un **monolithe simple** (tout dans une seule app).
- Puis on le fera évoluer vers des architectures **n-tiers**, **DDD** et **microservices**.

---

## Lancer le projet

### 1. Installer les dépendances

```bash
npm install
```

---

### 2. Lancer le serveur

```bash
npm run dev
```

Le serveur démarre sur http://localhost:3000.

---

## Arborescence

```bash
architecture-ecommerce/
├─ package.json
└─ src/
   ├─ index.js        # Point d’entrée
   ├─ products.js     # Routes produits
   ├─ cart.js         # Routes panier
   ├─ orders.js       # Routes commandes
   └─ state.js        # State global
```

---

## Endpoints disponibles

### Produits

```bash
GET /products # liste des produits disponibles
```

### Panier

```bash
GET /cart # voir le contenu du panier
POST /cart # ajouter un produit
DELETE /cart # vider le panier
```

### Commandes

```bash
GET /orders # voir toutes les commandes passées
POST /orders # créer une nouvelle commande à partir du panier
```

---

## Étapes pédagogiques

1. V0 Monolithe simple (ce projet)

   - Tout en mémoire, une seule app

2. V1 Monolithe avec base de données

   - Persistance SQLite/Postgres avec Prisma ou Sequelize

3. V2 Architecture en couches (n-tiers)

   - Séparation Routes / Services / Repositories

4. V3 Domain-Driven Design (DDD)

   - Clean architecture (infrastructure & adapters)
   - Architecture hexagonale (port & adapters)

5. V4 Microservices & CQRS
   - Découper en services (catalogue, panier, commande)
