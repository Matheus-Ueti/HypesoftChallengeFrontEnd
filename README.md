# ShopSense — Frontend

Frontend do desafio técnico Hypesoft. Sistema de gestão de produtos construído com React 19, TypeScript e Vite, integrado ao backend via API REST e autenticado com Keycloak.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript 5 + Vite 7 |
| Estilo | TailwindCSS 3 + Shadcn/ui |
| Requisições | Axios + TanStack Query 5 |
| Formulários | React Hook Form 7 + Zod 4 |
| Gráficos | Recharts 3 |
| Autenticação | keycloak-js 26 |
| Roteamento | React Router DOM 7 |
| Testes | Vitest 4 + React Testing Library 16 |

---

## Funcionalidades

- **Autenticação** via Keycloak com `login-required` — todas as rotas são protegidas automaticamente
- **Dashboard** com total de produtos, valor total do estoque, lista de estoque baixo e gráfico por categoria
- **Produtos** — criar, editar, excluir, buscar por nome e filtrar por categoria
- **Categorias** — criar, editar e excluir categorias
- **Estoque baixo** — badge vermelha para produtos com menos de 10 unidades

---

## Estrutura do projeto

```
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── charts/        # CategoryChart (Recharts)
│   ├── forms/         # ProductForm, CategoryForm (React Hook Form + Zod)
│   ├── layout/        # Header, SideBar, MainLayout
│   └── ui/            # Componentes base Shadcn/ui
├── contexts/          # AuthContext (isAuthenticated, logout)
├── hooks/             # useProducts, useCategories, useAuth
├── lib/
│   ├── api.ts         # Axios com interceptors de token JWT
│   ├── keycloak.ts    # Instância do keycloak-js
│   └── queryClient.ts # Configuração do TanStack Query
├── pages/             # Dashboard, Products, Categories, Settings
├── services/          # products.service.ts, categories.service.ts
├── types/             # product.ts, category.ts, auth.ts
└── main.tsx           # Keycloak inicializado antes do React montar
```

---

## Pré-requisitos

- **Node.js 18+**
- **Backend + Keycloak + MongoDB rodando via Docker Compose**

> Siga o README do repositório `HypesoftChallengeBackEnd` antes de rodar o frontend.

---

## Como rodar

### 1. Subir o backend

No repositório do backend (`HypesoftChallengeBackEnd`):

```bash
docker-compose up -d
```

Aguarde ~30 segundos para o Keycloak inicializar completamente. Verifique com:

```bash
docker-compose ps
```

Todos os containers devem estar com status `running`.

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:5000
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=shopsense
VITE_KEYCLOAK_CLIENT_ID=shopsense-frontend
```

> Os valores acima são os padrões para rodar localmente com Docker Compose. Não é necessário alterá-los.

### 4. Iniciar o dev server

```bash
npm run dev
```

Acesse: **http://localhost:5173**

O browser será redirecionado automaticamente para a tela de login do Keycloak.

---

## Credenciais

### Aplicação (realm `shopsense`)

| Usuário | Senha | Role |
|---------|-------|------|
| `admin` | `Admin@123` | app-admin, app-user |
| `user` | `User@123` | app-user |

### Keycloak Admin Console

Acesse `http://localhost:8080` com:

| Usuário | Senha |
|---------|-------|
| `admin` | `admin` |

---

## Como funciona a autenticação

O Keycloak é inicializado em `main.tsx` **antes** do React montar, com `onLoad: 'login-required'`:

1. Ao acessar qualquer rota, o usuário é redirecionado para o login do Keycloak
2. Após autenticação, o React monta a aplicação
3. O token JWT é injetado automaticamente em todas as requisições via interceptor do Axios
4. O token é renovado automaticamente 30 segundos antes de expirar (`updateToken(30)`)
5. Em caso de 401, o app tenta renovar o token e refaz a requisição uma vez

---

## Build para produção

```bash
npm run build
```

Os arquivos ficam em `dist/`. O Nginx no Docker Compose já serve o build automaticamente na porta `3000`.

---

## Testes

```bash
# Modo watch (desenvolvimento)
npm test

# Executar uma vez (CI)
npm run test:run
```

---

## URLs dos serviços

| Serviço | URL |
|---------|-----|
| Frontend (dev) | http://localhost:5173 |
| API REST | http://localhost:5000 |
| Swagger | http://localhost:5000/swagger |
| Keycloak | http://localhost:8080 |
| MongoDB Express | http://localhost:8081 |
