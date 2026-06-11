# Campaign Persistence Validation

## Purpose

This document defines validation rules for the Campaign Persistence Implementation sprint.

It validates Campaign persistence without validating Campaign Workspace, child resources, auth or frontend integration.

---

# Pre-Validation Requirements

Before endpoint validation, confirm:

- `backend/.env` exists locally
- `backend/.env` is ignored by Git
- `DATABASE_URL` points to local PostgreSQL
- migration has been applied
- seed has been run
- default workspace exists
- reference users exist
- reference squads exist

---

# Required Database Commands

Run from `/backend`:

```bash
npx prisma migrate dev
npm run prisma:seed
```

If the database is already in sync, document that `migrate dev` reports no pending migration.

---

# Required Backend Commands

Run from `/backend`:

```bash
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

---

# Required Frontend Regression Commands

Run from `/frontend`:

```bash
npm run lint
npm run build
```

Frontend remains mock/local during this sprint.

---

# Required Runtime Endpoint Validation

Validate existing endpoints:

```txt
GET /health
GET /workspaces
GET /users
GET /squads
```

Validate Campaign endpoints:

```txt
GET /campaigns
POST /campaigns
GET /campaigns/:campaignId
PATCH /campaigns/:campaignId
PATCH /campaigns/:campaignId/status
PATCH /campaigns/:campaignId/priority
PATCH /campaigns/:campaignId/owner
PATCH /campaigns/:campaignId/squad
```

Validate reference errors:

```txt
POST /campaigns rejects invalid workspaceId with WORKSPACE_NOT_FOUND
POST /campaigns rejects invalid ownerId with USER_NOT_FOUND
POST /campaigns rejects invalid squadId with SQUAD_NOT_FOUND
GET /campaigns/:campaignId rejects missing campaign with CAMPAIGN_NOT_FOUND
PATCH /campaigns/:campaignId rejects invalid body with INVALID_CAMPAIGN_INPUT
```

---

# Safety Checks

Confirm:

- `backend/.env` is not committed
- no real credentials are committed
- Prisma schema was not expanded with forbidden fields
- no Campaign Workspace endpoint exists
- no campaign child resource APIs exist
- no frontend API client exists
- no auth exists
- no Docker setup exists
- no workflow engine exists
- no derived intelligence is persisted or returned as backend truth

---

# Success Criteria

The sprint passes if:

- Campaign records can be created in PostgreSQL
- Campaign records can be listed and retrieved
- Campaign records can be updated
- workspace, owner and squad references are validated
- response wrappers remain predictable
- health and reference data endpoints still work
- backend validation passes
- frontend validation passes
- scope boundaries remain intact
