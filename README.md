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

## Arborescence

```bash
tp-architecture-ecommerce/
├─ __tests__/                             # unit/integration/e2e
│  └─ products.test.js
│
├─ src/
│  ├─ presentation/                       # TIER 1 — HTTP seulement
│  │  └─ http/
│  │     ├─ index.js                      # crée l'app Express
│  │     ├─ routes/                       # routes ⇢ controllers
│  │     │  ├─ products.routes.js
│  │     │  ├─ cart.routes.js
│  │     │  └─ orders.routes.js
│  │     └─ controllers/                  # controllers ⇢ services (Business)
│  │        ├─ ProductsController.js
│  │        ├─ CartController.js
│  │        └─ OrdersController.js
│  │
│  ├─ business/                           # TIER 2 — logique métier (pas d'I/O)
│  │  └─ services/                        # services ⇢ repositories (Data)
│  │     ├─ ListProductsService.js
│  │     ├─ AddToCartService.js
│  │     ├─ CheckoutOrderService.js
│  │     └─ GetOrderDetailService.js
│  │
│  ├─ data/                               # TIER 3 — accès données (concrets)
│  │  ├─ repositories/
│  │  │  ├─ ProductRepository.js
│  │  │  ├─ CartRepository.js
│  │  │  └─ OrderRepository.js
│  │  └─ memory/                          # impl in-memory simple
│  │     ├─ state.js
│  │     ├─ ProductRepositoryInMemory.js
│  │     ├─ CartRepositoryInMemory.js
│  │     └─ OrderRepositoryInMemory.js
│  │
│  └─ index.js                            # point d’entrée (lance le serveur)
│
├─ .gitignore
├─ README.md
├─ package-lock.json
└─ package.json
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
