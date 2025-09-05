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
