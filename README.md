# SmartShop - Enterprise Shopkeeper Smart Management Application

SmartShop is a production-ready, enterprise-grade web application built to empower shopkeepers with tools for managing products, tracking sales, monitoring stock levels, and generating profit/loss reports. 

Built using **React (TypeScript)**, **Vite**, **Tailwind CSS**, and **Supabase**, it features a secure Role-Based Access Control (RBAC) architecture suitable for commercial retail operations.

---

## 🏗️ Architecture & Features

The application follows clean architecture principles with a decoupled presentation layer and backend services layer:

- **State & Auth Caching**: Centralized `AuthContext` caches user sessions, profile info, and roles, ensuring zero query duplication and robust RBAC checks across pages.
- **Dynamic Dashboard**: Responsive metrics cards (Total Sales, Inventory Items, Low Stock items) with access-controlled actions.
- **Accessible Modals**: Native focus trapping, screen-reader support, and escape-to-close behavior implemented using Radix/Shadcn dialog primitives.
- **Strict Type Checking**: Enforced compiler flags (`strict`, `noImplicitAny`, `strictNullChecks`, etc.) for enterprise safety.
- **Data Integrity**: Transactions and stock level adjustments are validated with strict RLS (Row Level Security) on Supabase.

---

## 🗄️ Database Schema & RBAC

The database schema is defined in `supabase/migrations/` and consists of:

1. **`profiles`**: Linked to auth users (`id` references `auth.users`). Stores user metadata.
2. **`products`**: Linked to `profiles` via `user_id`. Tracks stock quantity, buying price, and selling price.
3. **`sales`**: Linked to `products` via `product_id`. Tracks quantities, total transaction amounts, and timestamps.
4. **`user_roles`**: Links users to system roles. Checked against the `active` column to determine validity.

### Application Roles
- **`admin`**: Full access, manages user roles and generates profit/loss reports for any user.
- **`manager`**: Manages products, inventory levels, and views sales summaries.
- **`sales`**: Records new sales and views transaction history.
- **`inventory`**: Manages product catalogs and updates stock counts.
- **`viewer`**: Read-only dashboard view.

---

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (version 20 or higher)
- npm or bun package manager
- Docker (optional, for containerized deployments)

### 🛠️ Local Development Setup

1. **Clone the repository**:
   ```sh
   git clone <YOUR_GIT_URL>
   cd shopkeeper-smart-manage
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
   For local development, the default Supabase endpoints are pre-filled, but you should adjust them for production.

3. **Install dependencies**:
   ```sh
   npm install
   ```

4. **Start the development server**:
   ```sh
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

---

## 🧪 Testing

The project uses **Vitest** for unit and integration testing.

- **Run tests once**:
  ```sh
  npm run test
  ```
- **Run tests in watch mode**:
  ```sh
  npm run test:watch
  ```

---

## 🐳 Docker Deployment

A multi-stage `Dockerfile` is provided to compile React assets and serve them using Nginx.

### Using Docker Compose:
To build and run the container locally:
```sh
docker-compose up --build -d
```
The application will be accessible at `http://localhost`.

---

## 🛡️ DevOps and CI/CD

A GitHub Actions workflow is located at `.github/workflows/ci.yml`. It triggers on push and pull requests to `main`/`master` branches:
1. Installs clean dependencies (`npm ci`).
2. Runs the linter (`npm run lint`).
3. Verifies TypeScript compilation (`npx tsc --noEmit`).
4. Runs unit tests (`npm run test`).
5. Validates the production bundle build.

---

## ❓ Troubleshooting

- **Supabase credentials throw errors**: Ensure `.env` is created in the root folder, and that variables are prefixed with `VITE_`.
- **404 on page reload under Docker**: The Nginx configuration uses `try_files` in `nginx.conf` to redirect page routing to `index.html`. Verify that `/etc/nginx/conf.d/default.conf` was copied correctly in the build steps.
- **TypeScript compilation fails**: Ensure you are not importing `any` type overrides and that all variables match the schemas in `src/integrations/supabase/types.ts`.
