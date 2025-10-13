# 🛒 AllParts Ecommerce

**AllParts Ecommerce** é uma aplicação full stack desenvolvida com **Golang**, **React**, **Next.js** e **Docker Compose**, com o objetivo de oferecer uma experiência completa de compra online voltada para peças gamer.

---

## 🚀 Tecnologias Utilizadas

### 🧠 Backend
- **Go (Golang)** — API REST principal
- **Fiber** — Framework web rápido e minimalista
- **JWT** — Autenticação de usuários
- **GORM** — ORM para banco de dados
- **Docker Compose** — Gerenciamento e containerização do banco

### 🎨 Frontend
- **React + Next.js** — Interface moderna e dinâmica
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização responsiva e otimizada

### 💾 Banco de Dados
- **Postgres (via Docker Compose)**

---
<img border="0" data-original-height="1080" data-original-width="1920" height="600" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEVpUiQcRz0E6bZiQ3EcTxU3Zwv2KQw7u-ofZK91Jt0iAVujUdc_xfFjMS-_zJECWS8V4Im4kOg9h5pF8GYAQogRrPcLuaDGA0SG_MrOtr2BKqIHYre9_X2Bd7-2c3elmHuL9CVZJHJ2SP_AGAhQyHF-xd9YeDat_wSNtKJCyeq0HEDk8hzEQeWEl9Piti/s1868/1.png" width="1280" />
<br/>
 
```
💡 Funcionalidades

✅ Autenticação JWT
✅ CRUD completo de produtos
✅ Sistema de pedidos
✅ Checkout com simulação de pagamento via Stripe
✅ Painel administrativo para Admin
✅ Permissões de Users
✅ Interface moderna com Next.js
```

## ROTAS PÚBLICAS
```
POST   http://localhost:4000/api/registrar        # Registrar usuário
POST   http://localhost:4000/api/login            # Login de usuário
GET    http://localhost:4000/api/products         # Listar produtos
GET    http://localhost:4000/api/products/:id     # lista produto por id
```

## ROTAS PROTEGIDAS (necessário o token JWT)
```
POST   http://localhost:4000/api/orders           # Criar pedido
GET    http://localhost:4000/api/orders           # Listar pedidos do usuário
```
## ROTA STRIPE
```
POST   http://localhost:4000/api/checkout         # fazer pedido
```

## ADMIN (necessário o token JWT)

```
POST   http://localhost:4000/api/products         # Criar produto
GET    http://localhost:4000/api/admin/orders     # Listar todos os pedidos
PUT    http://localhost:4000/api/products/:id     # Atualizar produto
DELETE http://localhost:4000/api/products/:id     # Deletar produto
```


## 🧩 Estrutura do Projeto

```bash
ALLPARTS-ECOMMERCE/
│
├── backend/
│ ├── cmd/
│ │ └── main.go
│ ├── config/
│ │ └── db.go 
│ ├── controllers/
│ │ ├── auth_controller.go
│ │ ├── checkout_controller.go
│ │ ├── order_controller.go
│ │ └── product_controller.go
│ ├── middlewares/
│ │ └── auth.go
│ ├── models/
│ │ ├── order.go
│ │ ├── product.go
│ │ └── user.go
│ ├── routes/
│ │ └── routes.go
│ ├── utils/
│ │ ├── hash.go
│ │ └── jwt.go
│ ├── go.mod
│ ├── go.sum
│ └── Dockerfile
│
├── frontend/
│ ├── components/
│ │ ├── CartItem.tsx
│ │ ├── Comments.tsx
│ │ ├── Footer.tsx
│ │ ├── LoginInput.tsx
│ │ ├── Navbar
│ │ ├── ProductCard.tsx
│ │ ├── Register.tsx 
│ ├── public/
│ ├── src/
│ │ └── app/
│ │ ├── admin/
│ │ ├── editar/
│ │ ├── deletar/
│ │ ├── products/
│ │ ├── orders/
│ │ ├── carrinho/
│ │ ├── login/
│ │ ├── pagamento/
│ │ └── cadastre-se/
│ ├── package.json
│ ├── tsconfig.json
│ └── next.config.mjs
│
├── docker-compose.yml
├── .env
├── .gitignore
```

## - Suba o banco de dados com Docker
```
docker-compose up -d
```

## - Inicie o backend
```
cd backend/cmd
go run main.go
```

## - O servidor iniciará em:
👉 http://localhost:4000

## - Inicie o frontend
```
cd frontend
npm install
npm run dev
```

## - Frontend disponível em:
👉 http://localhost:3000


## Crie um arquivo .env
```
JWT_SECRET=seu_segredo_aqui
STRIPE_SECRET_KEY=seu_segredo_aqui
```



