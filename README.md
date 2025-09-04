# E-commerce N-Tier (Node.js + Express)

Cette branche illustre l’évolution du projet fil rouge vers une architecture en couches (n-tiers).  
L’objectif est de séparer clairement les responsabilités de l’application afin de mieux organiser le code et de préparer le terrain pour des architectures plus avancées.

---

## Objectifs pédagogiques

- Comprendre la logique d’une architecture n-tiers classique.
- Séparer la présentation (routes, controllers), la logique métier (services) et l’accès aux données (repositories).
- Mettre en évidence la différence entre un monolithe simple et une architecture organisée en couches.
- Préparer la transition vers des modèles plus évolués (Clean, Hexagonal, Microservices).

---

## Lancer le projet

1. Installer les dépendances avec npm.
2. Lancer le serveur en mode développement.
3. Exécuter les tests automatisés.

Le serveur démarre par défaut sur le port 3000.

---

## Diagrammes

![Diagramme de Composants](./__docs__/01%20-%20Diagramme%20de%20Composants%20-%20v1%20-%20N-Tier%20avec%20BDD.png)

---

## Arborescence

```bash
tp-architecture-ecommerce/
├─ __tests__/                                # Tous les tests Jest
│  ├─ e2e/                                   # Tests bout-à-bout (parcours complet)
│  │  ├─ cart_orders.e2e.test.js             # Ajout panier → checkout → commandes
│  │  └─ invalid_product.e2e.test.js         # Produit invalide refusé
│  │
│  ├─ functional/                            # Tests fonctionnels (routes HTTP via supertest)
│  │  ├─ products.functional.test.js         # Vérifie GET /products
│  │  ├─ cart.functional.test.js             # Vérifie POST/DELETE /cart
│  │  └─ orders.functional.test.js           # Vérifie GET/POST /orders
│  │
│  ├─ helpers/                               # Helpers de test (pas exécutés seuls)
│  │  ├─ jest.env.setup.js                   # Force l'environnement test
│  │  └─ resetDb.js                          # Réinitialise le state in-memory entre tests
│  │
│  ├─ integration/                           # Tests d’intégration (repositories in-memory)
│  │  ├─ repositories.int.test.js            # Produits + Panier + Commandes (repos)
│  │  └─ orders.repositories.int.test.js     # Cas intégration OrderRepository
│  │
│  └─ unit/                                  # Tests unitaires (services purs)
│     ├─ listProducts.unit.test.js           # Test unitaire : lister les Produits
│     ├─ cart.services.unit.test.js          # Tests unitaires : services du Panier
│     └─ orders.services.unit.test.js        # Tests unitaires : services Commandes
│
├─ scripts/                                   # Petits utilitaires CLI
│  └─ db-reset-sqlite.js                      # Exécute schema.sql + seed.sql
│
├─ src/
│  ├─ business/                              # TIER 2 — Logique métier (pas d'I/O)
│  │  └─ services/                           # Services ⇢ repositories (Data)
│  │     ├─ ListProductsService.js
│  │     ├─ AddToCartService.js
│  │     ├─ RemoveFromCartService.js
│  │     ├─ ClearCartService.js
│  │     ├─ CheckoutOrderService.js
│  │     ├─ ListOrdersService.js
│  │     └─ GetOrderDetailService.js
│  │
│  ├─ data/                                  # TIER 3 — Accès données (impl concrètes)
│  │  ├─ memory/                             # Implémentation in-memory simple
│  │  │  ├─ state.js                         # Faux “DB” : produits, panier, commandes
│  │  │  ├─ ProductRepositoryInMemory.js
│  │  │  ├─ CartRepositoryInMemory.js
│  │  │  └─ OrderRepositoryInMemory.js
│  │  │
│  │  ├─ repositories/                        # Points d’accès (fabriques)
│  │  │  ├─ ProductRepository.js
│  │  │  ├─ CartRepository.js
│  │  │  └─ OrderRepository.js
│  │  │
│  │  └─ sqlite/                              # Implémentation SQLite
│  │     ├─ CartRepositorySqlite.js
│  │     ├─ db.js                             # Connexion better-sqlite3 + helpers
│  │     ├─ OrderRepositorySqlite.js
│  │     ├─ ProductRepositorySqlite.js
│  │     ├─ reset.sql                         # DROP TABLE products, cart_items, orders, order_items…
│  │     ├─ schema.sql                        # CREATE TABLE products, cart_items, orders, order_items…
│  │     └─ seed.sql                          # Données d’amorçage (quelques produits)
│  │
│  ├─ presentation/                           # TIER 1 — Interface (HTTP uniquement)
│  │  └─ http/
│  │     ├─ controllers/                      # Controllers ⇢ services (Business)
│  │     │  ├─ ProductsController.js
│  │     │  ├─ CartController.js
│  │     │  └─ OrdersController.js
│  │     │
│  │     ├─ middlewares/                      # Middlewares Express
│  │     │  └─ errorMiddleware.js             # Traduit erreurs métier en statuts HTTP
│  │     │
│  │     ├─ routes/                           # Routes ⇢ controllers
│  │     │  ├─ products.routes.js
│  │     │  ├─ cart.routes.js
│  │     │  └─ orders.routes.js
│  │     │
│  │     └─ app.js                            # Crée l'app Express et monte les routes
│  │
│  └─ index.js                                # Point d’entrée (lance le serveur HTTP)
│
├─ var/                                       # Dossier runtime sqlite (git-ignoré)
│  └─ .gitkeep
│
├─ .env.example                               # À DUPLIQUER EN .env
├─ .env.test.example                          # À DUPLIQUER EN .env.test
├─ .gitignore                                 # Ignore node_modules, coverage, etc.
├─ babel.config.cjs                           # Configuration de Babel
├─ jest.config.cjs                            # Configuration de Jest
├─ README.md                                  # Doc projet (branche n-tier)
├─ package-lock.json
└─ package.json                               # Dépendances, scripts npm, config Jest
```

---

## Étapes pédagogiques

1. V0 Monolithe simple

   - Tout est regroupé dans une seule application.

2. V1 Architecture N-Tier (cette branche)

   - Séparation claire entre présentation, logique métier et persistance.
   - Mise en place de routes, controllers, services et repositories.

3. V2 Domain-Driven Design (Clean)

   - Introduction d’interfaces et inversion des dépendances.

4. V3 Architecture Hexagonale

   - Ports & Adapters, plus grande indépendance vis-à-vis des frameworks.

5. V4 Microservices & CQRS
   - Découpage en services indépendants (catalogue, panier, commandes).
