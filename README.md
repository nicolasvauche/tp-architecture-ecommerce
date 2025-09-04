# E-commerce Hexagonal (Node.js + Express)

Cette branche illustre l’évolution du projet fil rouge vers une **architecture Hexagonale (Ports & Adapters)**.  
L’objectif est d’isoler un **Core métier indépendant**, relié au monde extérieur via des **Ports** (contrats) et des **Adapters** (implémentations techniques). Les **bounded contexts** demeurent : **Products**, **Cart**, **Orders**.

---

## Objectifs pédagogiques

- Comprendre l’architecture **Hexagonale** et la séparation **Core / Ports / Interface / Adapters / Infrastructure**.
- Distinguer **Ports IN** (ce que le monde demande au Core) et **Ports OUT** (ce dont le Core a besoin).
- Conserver des **bounded contexts** explicites avec leurs **contrats de repository** par contexte.
- Réduire le couplage aux frameworks (**Express**) et aux **data sources** (**mémoire**, **SQLite**).
- Améliorer la **testabilité** : Core testable seul, Adapters vérifiés via contrats.

---

## Lancer le projet

1. Copier les fichiers d’exemple d’environnement puis renseigner les variables nécessaires.
2. Choisir la composition **mémoire** ou **SQLite** via la configuration DI et démarrer le serveur.
3. Exécuter la suite de tests (unitaires, intégration, fonctionnels, e2e) pour valider le comportement.

Par défaut, le serveur écoute sur le **port 3000** (surchargé via les variables d’environnement).

---

## Diagrammes

![Diagramme de Composants](./__docs__/01%20-%20Diagramme%20de%20Composants%20-%20v3%20-%20Hexagonale.png)

---

## Arborescence

```bash
tp-architecture-ecommerce/                        # Racine du projet
├─ __tests__/                                     # Tests (unit/int/functional/e2e)
│  ├─ unit/                                       # Tests unitaires core pur
│  ├─ integration/                                # Tests adapters (memory/sqlite) via contrats
│  ├─ functional/                                 # Tests HTTP (routes + contrôleurs)
│  └─ e2e/                                        # Parcours complet bout-à-bout
│
├─ config/                                        # Composition root (wiring DI)
│  ├─ di.memory.js                                # Câble ports OUT -> impl mémoire + app Express
│  └─ di.sqlite.js                                # Câble ports OUT -> impl SQLite + app Express
│
├─ scripts/                                       # Scripts utilitaires
│  └─ db-reset-sqlite.js                          # Exécute reset/schema/seed SQLite
│
├─ src/                                           # Code applicatif (hexa stricte)
│  ├─ core/                                       # CORE : domaine + use cases (pur JS)
│  │  ├─ cart/                                    # BC Cart
│  │  │  ├─ entities/                             # Entités Cart
│  │  │  │  └─ Cart.js                            # Règles du panier
│  │  │  ├─ value-objects/                        # VO liés à Cart
│  │  │  │  └─ Quantity.js                        # Quantité validée/bornée
│  │  │  └─ usecases/                             # Cas d’usage (implémentent Ports IN)
│  │  │     ├─ AddToCart.js                       # Ajouter un produit
│  │  │     ├─ RemoveFromCart.js                  # Retirer un produit
│  │  │     └─ ClearCart.js                       # Vider le panier
│  │  ├─ orders/                                  # BC Orders
│  │  │  ├─ entities/
│  │  │  │  └─ Order.js                           # Règles de commande
│  │  │  ├─ value-objects/
│  │  │  │  ├─ OrderId.js                         # Id interne
│  │  │  │  ├─ OrderNumber.js                     # Numéro lisible (ex: ORD-2025-0001)
│  │  │  │  └─ TaxRate.js                         # Taux de taxe dédié aux orders
│  │  │  └─ usecases/
│  │  │     ├─ CheckoutOrder.js                   # Passer commande
│  │  │     ├─ GetOrderDetail.js                  # Détail d’une commande
│  │  │     └─ ListOrders.js                      # Lister les commandes
│  │  ├─ products/                                # BC Products
│  │  │  ├─ entities/
│  │  │  │  └─ Product.js                         # Règles d’un produit
│  │  │  ├─ value-objects/
│  │  │  │  ├─ ProductName.js                     # Nom produit validé
│  │  │  │  └─ Sku.js                             # Référence/SKU
│  │  │  └─ usecases/
│  │  │     └─ ListProducts.js                    # Lister le catalogue
│  │  └─ shared-kernel/                           # Transverse stable
│  │     ├─ errors/
│  │     │  └─ DomainError.js                     # Erreur métier générique
│  │     └─ value-objects/
│  │        ├─ Currency.js                        # Devise (EUR, USD…)
│  │        ├─ Money.js                           # Montant + devise immuable
│  │        ├─ Percentage.js                      # Pourcentage
│  │        ├─ PositiveInt.js                     # Entier positif
│  │        └─ Uuid.js                            # UUID
│  │
│  ├─ ports/                                      # PORTS : contrats (aucune techno)
│  │  ├─ in/                                      # Ports IN (ce que le monde demande au core)
│  │  │  ├─ cart/
│  │  │  │  ├─ AddToCartPort.js                   # Contrat d’entrée AddToCart
│  │  │  │  ├─ RemoveFromCartPort.js              # Contrat d’entrée RemoveFromCart
│  │  │  │  └─ ClearCartPort.js                   # Contrat d’entrée ClearCart
│  │  │  ├─ orders/
│  │  │  │  ├─ CheckoutOrderPort.js               # Contrat d’entrée CheckoutOrder
│  │  │  │  ├─ GetOrderDetailPort.js              # Contrat d’entrée GetOrderDetail
│  │  │  │  └─ ListOrdersPort.js                  # Contrat d’entrée ListOrders
│  │  │  └─ products/
│  │  │     └─ ListProductsPort.js                # Contrat d’entrée ListProducts
│  │  └─ out/                                     # Ports OUT (dépendances du core)
│  │     ├─ cart/
│  │     │  └─ CartRepository.js                  # Contrat repo Cart
│  │     ├─ orders/
│  │     │  └─ OrderRepository.js                 # Contrat repo Orders
│  │     └─ products/
│  │        └─ ProductRepository.js               # Contrat repo Products
│  │
│  ├─ interface/                                  # Interface (présentation, sans framework)
│  │  ├─ cart/
│  │  │  └─ http/
│  │  │     ├─ CartController.js                  # Orchestration HTTP-agnostique (appelle use cases)
│  │  │     └─ CartDto.js                         # Mapping entités -> JSON d’exposition
│  │  ├─ orders/
│  │  │  └─ http/
│  │  │     ├─ OrdersController.js                # Orchestration HTTP-agnostique
│  │  │     └─ OrderDto.js                        # DTO Orders
│  │  └─ products/
│  │     └─ http/
│  │        ├─ ProductsController.js              # Orchestration HTTP-agnostique
│  │        └─ ProductDto.js                      # DTO Products
│  │
│  └─ adapters/                                   # ADAPTERS : détails techniques
│     ├─ in/                                      # Adapters IN (Transport/Entrée)
│     │  └─ http/
│     │     └─ express/
│     │        ├─ cart.routes.js                  # Routes Express -> appellent Interface/Controller Cart
│     │        ├─ orders.routes.js                # Routes Express -> Orders
│     │        └─ products.routes.js              # Routes Express -> Products
│     └─ out/                                     # Adapters OUT (Persistance/Sortie)
│        └─ persistence/
│           ├─ memory/
│           │  ├─ cart/
│           │  │  └─ CartRepositoryInMemory.js    # Impl mémoire du CartRepository
│           │  ├─ orders/
│           │  │  └─ OrderRepositoryInMemory.js   # Impl mémoire du OrderRepository
│           │  └─ products/
│           │     └─ ProductRepositoryInMemory.js # Impl mémoire du ProductRepository
│           └─ sqlite/
│              ├─ cart/
│              │  └─ CartRepositorySqlite.js      # Impl SQLite du CartRepository
│              ├─ orders/
│              │  └─ OrderRepositorySqlite.js     # Impl SQLite du OrderRepository
│              ├─ products/
│              │  └─ ProductRepositorySqlite.js   # Impl SQLite du ProductRepository
│              ├─ db.js                           # Connexion better-sqlite3 + helpers
│              ├─ schema.sql                      # DDL de création
│              ├─ seed.sql                        # Données d’amorçage
│              └─ reset.sql                       # Drop des tables
│
├─ infrastructure/                                # Boot & cross-cutting technique
│  ├─ app.js                                      # Instancie Express, monte routes + middlewares
│  ├─ server.js                                   # Démarre HTTP avec le bon DI (memory/sqlite)
│  └─ shared/
│     ├─ env.js                                   # Chargement env (test/dev/prod)
│     ├─ logger.js                                # Logger technique (console par défaut)
│     └─ errorMiddleware.js                       # Mapping erreurs métier -> statuts HTTP
│
├─ var/                                           # Runtime (ex: fichiers DB)
│  └─ .gitkeep                                    # Placeholder Git
│
├─ .env.example                                   # Variables env (dev)
├─ .env.test.example                              # Variables env (tests)
├─ .gitignore                                     # Ignore node_modules, var, etc.
├─ babel.config.cjs                               # Config Babel (si besoin ESM->CJS tests)
├─ jest.config.cjs                                # Config Jest
├─ package-lock.json                              # Lock npm
├─ package.json                                   # Dépendances + scripts
└─ README.md                                      # Docs projet (endpoints, setup, etc.)
```

---

## Concepts clés

- **Core** : entités, value objects, règles et **use cases** qui **implémentent les Ports IN** (aucune dépendance technique).
- **Ports** :
  - **IN** : contrats d’entrée du Core (ex. _AddToCart_, _CheckoutOrder_, _ListProducts_).
  - **OUT** : contrats de dépendances appelées par le Core (ex. _CartRepository_, _OrderRepository_, _ProductRepository_).
- **Interface** : contrôleurs et DTO **agnostiques du framework**, responsables de l’orchestration et du mapping I/O.
- **Adapters** :
  - **IN (HTTP)** : adaptation d’**Express** vers l’Interface via des routes.
  - **OUT (Persistence)** : implémentations **mémoire** et **SQLite** des Ports OUT.
- **Infrastructure** : démarrage de l’application (app/server), configuration DI, logging, gestion d’erreurs et scripts base de données.
- **DI (composition root)** : sélection des Adapters (mémoire/sqlite) et câblage **Use Cases ⇄ Ports OUT** et **Controllers ⇄ Use Cases**.

---

## Data sources

- **Mémoire** : idéale pour le développement rapide et les tests isolés.
- **SQLite** : persistance légère initialisable via scripts de schéma et de seed, réinitialisable via un script dédié.

---

## Tests

- **Unitaires (Core)** : règles métier et use cases **sans I/O**.
- **Intégration (Adapters OUT)** : validation des implémentations **mémoire/SQLite** face aux **Ports OUT**.
- **Fonctionnels (HTTP)** : contrôleurs et routes par contexte.
- **E2E** : scénario complet **catalogue → panier → checkout → consultation des commandes**.

---

## Conventions

- **Bounded contexts** conservés : _Products_, _Cart_, _Orders_.
- **Ports OUT** (repositories) définis **dans les BC** et implémentés **côté Adapters OUT**.
- **Interface** sans dépendance directe à Express (meilleure réutilisabilité et testabilité).
- **Nommage explicite** des use cases, ports et adapters pour rendre les responsabilités évidentes.

---

## Étapes pédagogiques

1. **V0 — Monolithe simple** : application unique sans séparation stricte.
2. **V1 — Architecture N-Tier** : présentation / logique / persistance.
3. **V2 — Clean Architecture** : inversion des dépendances, premiers contrats.
4. **V3 — Architecture Hexagonale (cette branche)** : Ports & Adapters, Core isolé, data sources interchangeables.
5. **V4 — Microservices & CQRS** : services autonomes (catalogue, panier, commandes) et séparation lecture/écriture.

---

## Résultats attendus

- **Core** stable et testable, sans import technique.
- **Ports** explicites qui clarifient les dépendances.
- **Adapters** remplaçables (Express, mémoire, SQLite) sans impacter le Core.
- **Infrastructure** simple, responsable du démarrage et de la configuration.
