# ADR-017: Prisma And Database Foundation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Backend Implementation Planning
- Frontend Backend Contract Preparation
- Backend Stack Decision
- Backend MVP Definition

The backend skeleton exists as a minimal NestJS runtime.

The next implementation cut is Prisma and database foundation.

The approved Backend V1 stack includes:

```txt
NestJS
Prisma
PostgreSQL
REST-first API
Modular Monolith
```

---

# Decision

Introduce Prisma and PostgreSQL-compatible database foundation under `/backend`.

This includes:

- Prisma dependency setup
- Prisma Client generation
- first Prisma schema
- first migration SQL
- safe seed script
- local `.env.example`
- minimal Prisma service/module for future NestJS usage

This does not approve product APIs, auth, frontend integration or product backend behavior.

---

# Prisma 7 Note

The installed Prisma version uses Prisma 7 behavior.

Datasource URL configuration is stored in:

```txt
backend/prisma.config.ts
```

The schema stores the datasource provider but not the URL.

This still follows the project rule that `DATABASE_URL` comes from local environment and is never committed.

---

# Schema Boundary

The first schema may include:

- Organization
- Workspace
- User
- Squad
- Campaign
- CampaignActivity
- Blocker
- Handoff
- CampaignNote
- DecisionContext

The schema must not persist:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- command center summary
- timeline presentation events
- frontend UI state

---

# Consequences

The backend now has persistence foundation, but not product backend behavior.

Future implementation cuts can build reference data and campaign persistence on top of the schema.

Local migration/seed application requires valid local PostgreSQL credentials in ignored `backend/.env`.

---

# Guardrails

Do not add in this sprint:

- Campaign API
- Campaign Workspace endpoint
- User API
- Squad API
- Workspace API
- product controllers
- product services
- auth
- Docker
- frontend API client
- frontend integration
- event sourcing
- workflow engine

---

# Final Decision

Prisma And Database Foundation is approved as an infrastructure cut only.

The next expected cut is Reference Data Implementation.
