# Perfect Art

Perfect Art is split into three applications:

- Public website: `http://localhost:5173`
- Admin panel: `http://localhost:5174/` and `http://localhost:5174/login`
- Backend API: `http://localhost:5000` with `/api`

The public production website remains `https://www.perfectartcontracting.com/reactdemo/`. Localhost is only the development build of that existing website; it is not a replacement public site.

## Setup

1. Create the MySQL 8 database using `backend/migrations/001_initial_schema.sql`.
2. Copy `backend/.env.example` to `backend/.env` and set the local MySQL password, JWT secret, and admin bootstrap credentials. `backend/.env` is local-only and ignored by Git.
3. Keep `frontend/.env.example` and `adminpanel/.env.example` limited to public `VITE_API_URL` configuration. They must never contain database credentials or JWT secrets.
4. Install dependencies with `npm install` from the repository root.

Run each app with:

```text
npm run dev:backend
npm run dev:frontend
npm run dev:admin
```

The public site uses port 5173 and the standalone admin app uses port 5174 with root-based routes such as `/`, `/login`, `/projects/retail`, and `/gallery`.

## Architecture

`frontend/` contains the existing Perfect Art public website. `adminpanel/` contains the separate admin source. `backend/` is the only application that communicates with MySQL and serves authenticated CRUD APIs plus uploaded media.

The backend initializes the MySQL schema idempotently and seeds the existing Perfect Art content on startup. Admin bootstrap credentials are read from `backend/.env`; no credentials are stored in source code or the safe environment templates.

Managed public content follows `frontend -> backend API -> perfectart_db` and admin changes follow `adminpanel -> backend API -> perfectart_db`. Contact and quote submissions use the same API path in the opposite direction.

## Production Deployment

Build the public frontend with `npm run build:frontend` and deploy its `frontend/dist` output beneath `/reactdemo/`. The frontend Vite build uses `/reactdemo/` as its production base path. Deploy the backend separately on port 5000 (or behind a reverse proxy), set `CLIENT_URL` and `ADMIN_URL` to the deployed origins, and keep `backend/.env` outside source control. The admin app can be deployed under `/reactdemo/admin/` using `VITE_ADMIN_BASE_PATH=/reactdemo/admin/` and a matching host rewrite.

## API Overview

Public reads include `/api/projects`, `/api/testimonials`, `/api/articles`, `/api/gallery`, and `/api/contact`. Public submissions use `/api/contact/inquiry` and `/api/contact/quote`. JWT-protected admin APIs provide CRUD for those resources plus `/api/dashboard/stats`, inquiries, and quote requests.
