# E-commerce Microservices (Node.js + Express)

Cette branche illustre l’évolution du projet fil rouge vers une **architecture en microservices**.  
L’objectif est de découper l’application en **services indépendants** (Products, Cart, Orders), exposés via une **API Gateway** qui centralise les accès et la gestion des routes.

---

## Objectifs pédagogiques

- Comprendre la logique **microservices** : séparation par contexte, autonomie des services.
- Découvrir le rôle d’une **API Gateway** :
  - Routage vers les services (proxy HTTP).
  - Centralisation des **404** (les 400/500 restent gérées par les microservices).
  - Vérification de santé des services en cascade.
- Mettre en place une communication inter-services simple (HTTP/REST).
- Utiliser une base de données **SQLite** par service pour isoler la persistance.
- Préparer la transition vers des environnements distribués (Docker, orchestrateurs).

---

## Lancer le projet

1. Copier les fichiers `.env.example` de chaque service et de la gateway vers `.env`.
2. Initialiser les bases SQLite de chaque service via les fichiers SQL fournis.
3. Démarrer chaque service (Products, Cart, Orders) sur ses propres ports :
   - Products → 4001
   - Cart → 4002
   - Orders → 4003
4. Démarrer la **Gateway API** sur le port 3000.
5. Vérifier l’état global via l’endpoint `/health`.

---

## Diagrammes

![Diagramme de Composants](./__docs__/02%20-%20Diagramme%20de%20Composants%20-%20v4%20-%20Microservices.png)

---

## Arborescence

```bash
e-commerce-microservices/
├─ README.md
├─ .gitignore
├─ .env.example                  # Variables d’environnement globales
├─ docker-compose.yml            # (optionnel)
├─ .github/
│  └─ workflows/
│     └─ ci.yaml                 # (optionnel)
│
├─ gateway-api/
│  ├─ package.json
│  ├─ .env.example
│  ├─ .gitignore
│  └─ src/
│     ├─ server.js
│     ├─ proxy.js
│     ├─ health.js
│     └─ middleware/
│        ├─ requestId.js
│        └─ notFound.js
│
├─ products-service/             # Microservice n-tiers
│  ├─ package.json
│  ├─ .env.example
│  ├─ .gitignore
│  ├─ sql/
│  │  └─ 001_init.sql
│  └─ src/
│     ├─ app.js
│     ├─ server.js
│     ├─ routes/
│     │  └─ products.routes.js
│     ├─ controllers/
│     │  └─ products.controller.js
│     ├─ services/
│     │  └─ products.service.js
│     ├─ repositories/
│     │  └─ products.repository.js
│     └─ db/
│        └─ sqlite.js
│
├─ cart-service/                 # Microservice n-tiers
│  ├─ package.json
│  ├─ .env.example
│  ├─ .gitignore
│  ├─ sql/
│  │  └─ 001_init.sql
│  └─ src/
│     ├─ app.js
│     ├─ server.js
│     ├─ routes/
│     │  └─ cart.routes.js
│     ├─ controllers/
│     │  └─ cart.controller.js
│     ├─ services/
│     │  └─ cart.service.js
│     ├─ repositories/
│     │  └─ cart.repository.js
│     └─ db/
│        └─ sqlite.js
│
└─ orders-service/               # Microservice n-tiers
   ├─ package.json
   ├─ .env.example
   ├─ .gitignore
   ├─ sql/
   │  └─ 001_init.sql
   └─ src/
      ├─ app.js
      ├─ server.js
      ├─ routes/
      │  └─ orders.routes.js
      ├─ controllers/
      │  └─ orders.controller.js
      ├─ services/
      │  └─ orders.service.js
      ├─ repositories/
      │  └─ orders.repository.js
      └─ db/
         └─ sqlite.js
```

---

## Concepts clés

- **API Gateway** : point d’entrée unique, gère les proxys `/products`, `/cart`, `/orders`.
- **Services indépendants** :
  - Products : catalogue produits (SQLite, n-tiers simple).
  - Cart : gestion du panier (SQLite, n-tiers simple).
  - Orders : création de commandes à partir du panier (SQLite, n-tiers simple, appel inter-service vers Cart).
- **Isolation des responsabilités** : chaque service a sa propre base de données et son cycle de vie.
- **Communication** : simple HTTP REST, synchrone pour l’instant.
- **Erreur 404** : gérée par la Gateway uniquement. Les erreurs métier (400) et serveur (500) restent côté services.

---

## Data sources

- Chaque microservice gère sa **base SQLite indépendante**, initialisée avec un script SQL :
  - `products-service/sql/001_init.sql`
  - `cart-service/sql/001_init.sql`
  - `orders-service/sql/001_init.sql`
- Les bases sont stockées dans le dossier `var/` de chaque service.

---

## Tests

- **Unitaires** : règles métier (services).
- **Intégration** : repositories SQLite.
- **Fonctionnels** : endpoints de chaque microservice.
- **E2E via Gateway** :
  - Liste des produits.
  - Ajout au panier.
  - Checkout → création de commande.
  - Consultation de commande.

---

## Conventions

- **Bounded contexts** explicites : Products, Cart, Orders.
- **Architecture n-tiers simple** par service : routes → controllers → services → repositories → db.
- **Indépendance des services** : chaque service peut évoluer et être déployé séparément.
- **Gateway minimale** : uniquement proxy, health check et gestion centralisée des 404.

---

## Étapes pédagogiques

1. V0 — Monolithe simple : tout dans une application unique.
2. V1 — Architecture N-Tier : séparation présentation / logique / persistance.
3. V2 — Clean Architecture : inversion des dépendances, premiers contrats.
4. V3 — Architecture Hexagonale : Ports & Adapters, Core isolé, data sources interchangeables.
5. V4 — Microservices (cette branche) : séparation en services autonomes (Products, Cart, Orders) derrière une Gateway.

---

## Résultats attendus

- **Services indépendants** faciles à déployer et à faire évoluer.
- **Gateway unique** pour les clients, simplifiant la consommation.
- **Base de code claire** : chaque service reste simple (n-tiers).
- **Préparation à l’échelle** : passage possible à Docker/Kubernetes et communication asynchrone (messagerie).
