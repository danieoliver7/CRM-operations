# Prisma Database Validation

## Purpose

This document records validation expectations for the Prisma And Database Foundation sprint.

---

# Required Backend Validation

Run from `/backend`:

```bash
npm run prisma:format
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

If local credentials are valid:

```bash
npx prisma migrate dev
npm run prisma:seed
```

Validate the health endpoint:

```txt
GET http://127.0.0.1:4000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "crm-operations-backend"
}
```

---

# Required Frontend Regression Validation

Run from `/frontend`:

```bash
npm run lint
npm run build
```

---

# Repository Safety Checks

Confirm:

- `backend/.env` is not committed
- `backend/.env.example` exists with placeholder only
- no real credentials are committed
- Prisma schema exists
- Prisma Client can be generated
- migration SQL exists
- no product API routes exist
- no product controllers/services exist
- no auth exists
- no Docker setup exists
- no frontend API client exists
- frontend still builds
- backend still builds

---

# Current Validation Result

Completed successfully:

- Prisma format
- Prisma validate
- Prisma generate
- backend lint
- backend test
- backend build
- backend health endpoint

Blocked by local credentials:

- applying migration to local PostgreSQL
- running seed against local PostgreSQL

The block is environmental and should be resolved by updating local `backend/.env` with valid PostgreSQL credentials.
