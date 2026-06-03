# ADR-015: Backend Implementation Planning Before Backend Code

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Foundation Planning
- Backend Foundation Design
- Backend Foundation Architecture Review
- Backend MVP Definition
- Backend Stack Decision
- Frontend Backend Contract Preparation

The approved Backend V1 stack direction is:

```txt
NestJS
Prisma
PostgreSQL
REST-first API
Modular Monolith
```

The project is ready to plan the first backend implementation, but backend code should not be created until implementation cuts, modules, schema direction, API order and validation gates are clear.

---

# Decision

The project will complete Backend Implementation Planning before creating backend code.

This planning phase must define:

- first backend implementation cuts
- Backend V1 module plan
- first Prisma schema plan
- Backend V1 API implementation plan
- Campaign Workspace endpoint recommendation
- Backend V1 validation plan
- implementation guardrails

---

# Rationale

Backend implementation should not be improvised.

Planning first protects the project from:

- copying frontend mock fields into database schema
- persisting derived intelligence
- creating too many modules
- creating framework-driven architecture
- introducing auth too early
- creating workflow engine behavior
- adding enterprise complexity
- expanding Backend MVP scope
- making frontend integration harder than necessary

---

# Workspace Endpoint Recommendation

Backend V1 should start with a composed Campaign Workspace read endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint should return persisted facts needed by Campaign Workspace, not derived intelligence or presentation summaries.

Separate resource endpoints should still exist or follow for writes and resource-specific reads.

---

# What We Will Document

The planning phase documents:

- `/docs/backend/backend-implementation-plan.md`
- `/docs/backend/backend-v1-module-plan.md`
- `/docs/backend/first-prisma-schema-plan.md`
- `/docs/backend/backend-v1-api-implementation-plan.md`
- `/docs/backend/backend-v1-validation-plan.md`

---

# What We Will Not Create

This ADR does not approve:

- backend server
- NestJS app
- Prisma schema
- migrations
- database connection
- API routes
- controllers
- services
- frontend API client
- auth
- Docker
- CI/CD

---

# Guardrails

Do not introduce:

- microservices
- CQRS
- event sourcing
- workflow engine
- orchestration layer
- advanced RBAC
- billing
- realtime
- analytics warehouse
- AI features
- integrations

---

# Consequence

The next backend sprint can start from an approved plan instead of inventing implementation order during code creation.

Backend code should begin only after Backend Implementation Planning is reviewed and accepted.
