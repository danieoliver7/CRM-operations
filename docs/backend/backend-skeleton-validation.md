# Backend Skeleton Validation

## Purpose

This document defines validation rules for the Backend Skeleton Implementation sprint.

It replaces the planning-only validation rule that no backend folder should exist.

During this sprint, backend runtime code may exist, but only within the skeleton scope.

---

# Validation Goal

Validate that the backend skeleton exists and works without introducing product backend behavior.

---

# Required Backend Validation

Run from `/backend`:

```bash
npm run lint
npm run test
npm run build
```

Also validate the backend can start:

```bash
npm run start
```

Then validate:

```txt
GET /health
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

The backend skeleton must not break existing frontend commands.

---

# Repository Validation

Confirm:

- backend folder exists
- backend can build
- backend can start
- frontend still builds
- frontend lint still passes
- no Prisma schema exists
- no migrations exist
- no `.env` file was committed
- no database connection was added
- no product API routes exist
- no auth exists
- no Docker setup was added
- no frontend API client was created

---

# Allowed In This Sprint

Allowed:

- `/backend`
- NestJS minimal app
- health/root endpoint
- TypeScript backend setup
- backend package scripts
- backend README
- minimal skeleton test

---

# Still Disallowed

Disallowed:

- Prisma
- PostgreSQL connection
- database schema
- migrations
- product APIs
- product modules
- auth
- Docker
- queues
- websocket
- notifications
- frontend integration

---

# Final Principle

The backend skeleton is valid when it proves runtime readiness without product behavior.
