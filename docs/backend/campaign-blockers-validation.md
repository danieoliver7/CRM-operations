# Campaign Blockers Validation

## Purpose

This document defines validation rules for the Campaign Blockers Implementation sprint.

It validates only Campaign Blockers APIs.

It does not validate Notes, Decision Context, Activities, Handoffs, Campaign Workspace, auth or frontend integration.

---

# Validation Goal

Validate that campaign blockers can be listed, created, updated and resolved through simple REST endpoints backed by Prisma/PostgreSQL.

The validation should prove that blockers are durable campaign-scoped operational facts without becoming tickets, incidents, SLA engines or workflow automation.

---

# Pre-Validation Requirements

Before testing endpoints, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migrations can be applied
- seed can be run
- reference users exist
- reference squads exist
- at least one Campaign exists or can be created
- existing health, reference data and Campaign APIs still work

---

# Required Database Commands

Run from `/backend`:

```bash
npx prisma migrate dev
npm run prisma:seed
```

If migrations or seed are already applied, the commands should still complete safely.

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

# Required Runtime Validation

Start the backend:

```bash
npm run start
```

Validate existing endpoints still work:

```txt
GET /health
GET /workspaces
GET /users
GET /squads
GET /campaigns
GET /campaigns/:campaignId
```

Validate Campaign Blockers endpoints:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

---

# Required Error Validation

Validate:

- invalid campaign id returns `CAMPAIGN_NOT_FOUND`
- invalid blocker id under a valid campaign returns `BLOCKER_NOT_FOUND`
- blocker from another campaign returns `BLOCKER_NOT_FOUND`
- invalid `createdById` returns `USER_NOT_FOUND`
- invalid `resolvedById` returns `USER_NOT_FOUND`
- unsupported blocker fields return `INVALID_BLOCKER_INPUT`

---

# Response Validation

List responses must use:

```json
{
  "data": []
}
```

Detail responses must use:

```json
{
  "data": {}
}
```

Error responses must use:

```json
{
  "error": {
    "code": "BLOCKER_NOT_FOUND",
    "message": "Blocker not found."
  }
}
```

---

# Frontend Regression Validation

Run from `/frontend`:

```bash
npm run lint
npm run build
```

Frontend runtime code should remain unaffected by this sprint.

---

# Safety Checks

Confirm:

- `backend/.env` is not committed
- no real credentials are committed
- Prisma schema was not expanded with ticketing, SLA, risk, execution health or timeline presentation fields
- no Notes API was created
- no Decision Context API was created
- no Activities API was created
- no Handoffs API was created
- no Campaign Workspace endpoint was created
- no frontend API client was created
- no auth was created
- no Docker setup was added
- no workflow engine behavior was introduced
- no event sourcing behavior was introduced
- no ticketing system behavior was introduced
- no derived intelligence is persisted or returned as backend truth

---

# Final Principle

Campaign Blockers validation should prove the backend can persist operational impediment facts without expanding into the rest of Campaign Workspace backend behavior.
