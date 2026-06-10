# Reference Data Validation

## Purpose

This document records validation rules and results for the Reference Data Implementation sprint.

---

# Validation Goal

Validate that reference data can be read from PostgreSQL through Prisma and exposed through simple REST endpoints.

This sprint validates backend product-read capability without creating Campaign APIs.

---

# Pre-Validation Requirements

Before testing endpoints, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migration has been applied
- seed has been run
- default organization exists
- default workspace exists
- reference users exist
- reference squads exist

---

# Required Backend Commands

Run from `/backend`:

```bash
npx prisma migrate dev
npm run prisma:seed
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

---

# Required Endpoint Validation

Validate:

```txt
GET /health
GET /workspaces
GET /workspaces/:workspaceId
GET /users
GET /users/:userId
GET /squads
GET /squads/:squadId
```

Also validate at least one not-found response.

---

# Current Validation Result

Validated successfully:

- database is in sync with Prisma schema
- seed executes successfully
- health endpoint returns expected status
- workspaces list/detail endpoints return seeded data
- users list/detail endpoints return seeded data
- squads list/detail endpoints return seeded data
- not-found response uses the expected error wrapper
- backend lint/test/build pass
- frontend lint/build pass

---

# Still Disallowed

Reference data validation should confirm that the sprint did not create:

- Campaign APIs
- Campaign Workspace endpoint
- campaign child resource APIs
- write APIs for reference data
- frontend API clients
- auth
- Docker
- workflow engine
- event sourcing
