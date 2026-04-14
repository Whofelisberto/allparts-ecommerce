# AllParts Ecommerce

AllParts Ecommerce e uma aplicacao full stack desenvolvida com Golang, Next.js e PostgreSQL para uma experiencia de compra online voltada para pecas gamer.

## Tecnologias

### Backend
- Go (Golang)
- Fiber
- JWT
- GORM

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Infra
- Docker Compose
- PostgreSQL

<img border="0" data-original-height="1080" data-original-width="1920" height="600" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEVpUiQcRz0E6bZiQ3EcTxU3Zwv2KQw7u-ofZK91Jt0iAVujUdc_xfFjMS-_zJECWS8V4Im4kOg9h5pF8GYAQogRrPcLuaDGA0SG_MrOtr2BKqIHYre9_X2Bd7-2c3elmHuL9CVZJHJ2SP_AGAhQyHF-xd9YeDat_wSNtKJCyeq0HEDk8hzEQeWEl9Piti/s1868/1.png" width="1280" />

## Funcionalidades

- Autenticacao JWT
- CRUD completo de produtos
- Sistema de pedidos
- Checkout com Stripe
- Painel administrativo
- Permissoes de usuario

## Rotas principais

### Publicas
```text
POST   http://localhost:4000/api/registrar
POST   http://localhost:4000/api/login
GET    http://localhost:4000/api/products
GET    http://localhost:4000/api/products/:id
```

### Protegidas
```text
POST   http://localhost:4000/api/orders
GET    http://localhost:4000/api/orders
POST   http://localhost:4000/api/checkout
```

### Admin
```text
POST   http://localhost:4000/api/products
GET    http://localhost:4000/api/admin/orders
PUT    http://localhost:4000/api/products/:id
DELETE http://localhost:4000/api/products/:id
```

## Como rodar com Docker

O arquivo [docker-compose.yml](c:/Users/Leandro/Desktop/allparts-ecommerce/docker-compose.yml) sobe os tres servicos do projeto:

- frontend em http://localhost:3000
- backend em http://localhost:4000
- postgres exposto em localhost:5532

Suba tudo com:

```bash
docker compose up -d --build
```

Para acompanhar os logs:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

Para parar os containers:

```bash
docker compose down
```

## Como rodar localmente

### 1. Suba apenas o banco com Docker
```bash
docker compose up -d db
```

### 2. Rode o backend local
```bash
cd backend/cmd
go run main.go
```

### 3. Rode o frontend local
```bash
cd frontend
npm install
npm run dev
```

## Variaveis de ambiente

Crie um arquivo .env na raiz do projeto com pelo menos:

```env
JWT_SECRET=seu_segredo_aqui
STRIPE_SECRET_KEY=seu_segredo_aqui
```

O backend tambem aceita estas variaveis para conexao com o banco:

```env
DB_HOST=localhost
DB_PORT=5532
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=allparts-ecommerce
DB_SSLMODE=disable
```

No Docker Compose, o backend usa automaticamente:

```env
DB_HOST=db
DB_PORT=5432
```

## Observacoes sobre Docker

- Fora do Docker, o banco fica acessivel em localhost:5532.
- Dentro da rede do Docker, o backend conecta no banco usando host db e porta 5432.
- Se a API responder vazia em /api/products, o backend esta funcionando e o banco apenas ainda nao possui produtos cadastrados.

