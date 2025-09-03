# E-commerce Clean (Node.js + Express)

Cette branche illustre l’évolution du projet fil rouge vers une **architecture Clean** inspirée du Domain-Driven Design.  
L’objectif est de structurer l’application autour des **domaines métiers** (Products, Cart, Orders) en appliquant le principe d’**indépendance des couches** et de **dépendances orientées vers l’intérieur**.

---

## Objectifs pédagogiques

- Comprendre la logique d’une architecture **Clean** et ses couches concentriques.
- Identifier le rôle des **Entities**, **Use Cases**, **Interface Adapters** et **Frameworks & Drivers**.
- Découvrir la notion de **bounded context** en Domain-Driven Design.
- Séparer clairement les responsabilités :
  - Règles métier fondamentales dans le **domaine**.
  - Orchestration métier dans les **cas d’usage**.
  - Adaptation des données dans les **adapters**.
  - Détails techniques (DB, HTTP, frameworks) en **infrastructure**.
- Préparer la comparaison avec l’architecture hexagonale (Ports & Adapters).

---

## Lancer le projet

1. Installer les dépendances avec npm.
2. Lancer le serveur en mode développement.
3. Exécuter les tests automatisés (unitaires, intégration, fonctionnels, e2e).

Le serveur démarre par défaut sur le port 3000.

---

## Arborescence

```bash
tp-architecture-ecommerce/                  # Racine du projet
├─ __tests__/                               # Tous les tests Jest (unit, int, e2e, functional)
│  ├─ e2e/                                  # Tests bout-à-bout (simulateur parcours complet)
│  ├─ functional/                           # Tests fonctionnels (HTTP : routes + contrôleurs)
│  ├─ integration/                          # Tests d’intégration (impls mémoire/sqlite via contrats)
│  └─ unit/                                 # Tests unitaires (entities + usecases purs, sans I/O)
│
├─ config/                                  # Configuration applicative (DI, wiring)
│  └─ di.memory.js                          # Binds contrats → implémentations InMemory
│
├─ infrastructure/                          # Implémentations techniques concrètes (outer layer)
│  ├─ drivers/                              # Frameworks externes (Express, etc.)
│  │  └─ express/                           # Adaptation technique via Express
│  │     ├─ middlewares/                    # Middlewares Express
│  │     │  └─ errorMiddleware.js           # Traduit erreurs métier en statuts HTTP
│  │     ├─ app.js                          # Instancie Express et monte les routes
│  │     └─ server.js                       # Lance le serveur et injecte l'application
│  │
│  ├─ memory/                               # Implémentations InMemory des repositories
│  │  ├─ cart/                              # Impl spécifique au domaine Cart
│  │  │  └─ CartRepositoryInMemory.js       # Repo mémoire pour Cart
│  │  ├─ orders/                            # Impl spécifique au domaine Orders
│  │  │  └─ OrderRepositoryInMemory.js      # Repo mémoire pour Orders
│  │  └─ products/                          # Impl spécifique au domaine Products
│  │     └─ ProductRepositoryInMemory.js    # Repo mémoire pour Products
│  │
│  └─ shared/                               # Outils techniques transverses
│     ├─ env.js                             # Helper pour charger les variables d’environnement
│     └─ logger.js                          # Logger technique (console par défaut)
│
├─ src/                                     # Code applicatif (Clean + DDD)
│  ├─ cart/                                 # Bounded context Cart
│  │  ├─ application/                       # Couche Application (cas d’usage Cart)
│  │  │  ├─ services/                       # Services Cart
│  │  │  │  └─ CartPricingService.js        # Calcule les prix du panier (line total, cart total)
│  │  │  └─ usecases/                       # Use Cases Cart
│  │  │     ├─ AddToCartUseCase.js          # Ajouter un produit au panier
│  │  │     ├─ ClearCartUseCase.js          # Vider le panier
│  │  │     └─ RemoveFromCartUseCase.js     # Retirer un produit du panier
│  │  ├─ domain/                            # Couche Domain (Cart)
│  │  │  ├─ entities/                       # Entités Cart
│  │  │  │  └─ Cart.js                      # Entité Panier avec ses règles
│  │  │  └─ value-objects/                  # Value Objects spécifiques à Cart
│  │  │     └─ Quantity.js                  # VO Quantité (valide, bornée)
│  │  ├─ interface/                         # Interface Adapters (Cart)
│  │  │  └─ adapters/                       # Adaptateurs Cart
│  │  │     ├─ http/                        # Contrôleurs HTTP (Cart)
│  │  │     │  ├─ controllers/
│  │  │     │  │  └─ CartController.js      # Mappe HTTP → Use Cases Cart
│  │  │     │  └─ routes/
│  │  │     │     └─ cart.routes.js         # Routes /cart
│  │  │     └─ repositories/                # Contrats de repo Cart
│  │  │        └─ CartRepository.js         # Contrat repo pour Cart
│  │  └─ presentation/                      # Couche Presentation (Cart)
│  │     └─ dto/                            # DTO exposés Cart
│  │        └─ CartDto.js                   # DTO JSON pour Cart
│  │
│  ├─ orders/                               # Bounded context Orders
│  │  ├─ application/
│  │  │  └─ usecases/
│  │  │     ├─ CheckoutOrderUseCase.js      # Passer commande
│  │  │     ├─ GetOrderDetailUseCase.js     # Détail commande
│  │  │     └─ ListOrdersUseCase.js         # Lister commandes
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  │  └─ Order.js                     # Entité Order avec ses règles
│  │  │  └─ value-objects/
│  │  │     ├─ OrderId.js                   # VO identifiant commande
│  │  │     ├─ OrderNumber.js               # VO numéro lisible de commande
│  │  │     └─ TaxRate.js                   # VO taux de taxe spécifique Orders
│  │  ├─ interface/
│  │  │  └─ adapters/
│  │  │     ├─ http/
│  │  │     │  ├─ controllers/
│  │  │     │  │  └─ OrdersController.js    # Mappe HTTP → Use Cases Orders
│  │  │     │  └─ routes/
│  │  │     │     └─ orders.routes.js       # Routes /orders
│  │  │     └─ repositories/
│  │  │        └─ OrderRepository.js        # Contrat repo pour Orders
│  │  └─ presentation/
│  │     └─ dto/
│  │        └─ OrderDto.js                  # DTO JSON pour Orders
│  │
│  ├─ products/                             # Bounded context Products
│  │  ├─ application/
│  │  │  └─ usecases/
│  │  │     └─ ListProductsUseCase.js       # Lister les produits du catalogue
│  │  ├─ domain/
│  │  │  ├─ entities/
│  │  │  │  └─ Product.js                   # Entité Product
│  │  │  └─ value-objects/
│  │  │     ├─ ProductName.js               # VO nom produit
│  │  │     └─ Sku.js                       # VO SKU (référence produit)
│  │  ├─ interface/
│  │  │  └─ adapters/
│  │  │     ├─ http/
│  │  │     │  ├─ controllers/
│  │  │     │  │  └─ ProductsController.js  # Mappe HTTP → Use Cases Products
│  │  │     │  └─ routes/
│  │  │     │     └─ products.routes.js     # Routes /products
│  │  │     └─ repositories/
│  │  │        └─ ProductRepository.js      # Contrat repo pour Products
│  │  └─ presentation/
│  │     └─ dto/
│  │        └─ ProductDto.js                # DTO JSON pour Products
│  │
│  └─ shared-kernel/                        # Transverse (partagé par tous les domaines)
│     ├─ errors/                            # Exceptions/mécanismes communs
│     │  └─ DomainError.js                  # Erreur métier générique
│     └─ value-objects/                     # Value Objects stables et partagés
│        ├─ Currency.js                     # Devise (EUR, USD…)
│        ├─ Money.js                        # Montant + devise, immuable
│        ├─ Percentage.js                   # Pourcentage (0–100 ou 0–1)
│        ├─ PositiveInt.js                  # Entier positif validé
│        └─ Uuid.js                         # Identifiant UUID
│
├─ .env.test.example                        # Variables d’env pour tests
├─ .env.example                             # Variables d’env pour dev
├─ .gitignore                               # Fichiers ignorés par Git
├─ babel.config.cjs                         # Config Babel
├─ jest.config.cjs                          # Config Jest
├─ package-lock.json                        # Lock des dépendances npm
├─ package.json                             # Dépendances + scripts
└─ README.md                                # Documentation projet
```

---

## Étapes pédagogiques

1. **V0 — Monolithe simple**  
   Application unique sans séparation des responsabilités.

2. **V1 — Architecture N-Tier**  
   Découpage en couches présentation, logique métier et persistance.

3. **V2 — Clean Architecture (cette branche)**  
   Introduction des entités, cas d’usage, contrats et inversion des dépendances.  
   Mise en évidence des bounded contexts Products, Cart et Orders.

4. **V3 — Architecture Hexagonale**  
   Approche Ports & Adapters, vocabulaire spécifique, indépendance accrue vis-à-vis des frameworks.

5. **V4 — Microservices & CQRS**  
   Découpage en services autonomes (catalogue, panier, commandes) et séparation lecture/écriture.
