# CNC Auto Design Express API

This Express backend stores registration and payment requests for the CNC Auto Design project. It uses SQLite for a zero-config persistent datastore, making it easy to host on free platforms such as Render, Railway, or Fly.io.

## Quick Start

```bash
cd server
cp env.example .env
npm install
npm run dev
```

The API listens on `http://localhost:5050` by default.

## Environment Variables

- `PORT` – Optional, defaults to `5050`.
- `ADMIN_TOKEN` – Secret token required for admin actions (approving/denying payments, managing active users).
- `ALLOWED_ORIGIN` – Comma-separated list of front-end origins allowed for CORS. Example: `http://localhost:8888,https://your-main-site.netlify.app`.

## REST Endpoints

- `POST /api/registrations` – Store onboarding details from the main site.
- `GET /api/registrations` – Admin dashboard fetches pending registrations.
- `POST /api/payments` – Main site submits payment proof.
- `GET /api/payments` – Admin dashboard lists payment requests.
- `PATCH /api/payments/:id` – Admin updates payment status (`approved`, `rejected`, etc.). Requires `Authorization: Bearer <ADMIN_TOKEN>` header. Approving a payment automatically inserts an entry in `active_users`.
- `GET /api/active-users` – Admin dashboard shows current active accounts.
- `DELETE /api/active-users/:id` – Admin revokes access. Requires admin token.

## Deploying for Free

1. Push the `server` directory to its own repository (or keep it within this one).
2. Create an account on **Render** (or Railway/Fly.io).
3. Create a new **Web Service** pointing to this repo, set the build command to `npm install` and start command to `npm start`. Add environment variables (`ADMIN_TOKEN`, optional `ALLOWED_ORIGIN`).
4. Render will expose a public URL such as `https://cnc-backend.onrender.com`.

## Frontend Integration

- Main site: send requests to `https://cnc-backend.onrender.com/api/...`.
- Admin panel: include `Authorization: Bearer <ADMIN_TOKEN>` when calling admin-protected routes.
- After approval, the backend calculates `expires_at` using the optional `durationDays` field from the PATCH payload (defaults to 30 days).

Feel free to adjust the tables or endpoints to match any additional data your workflow needs.

