# ADR-018: Reference Data Implementation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Backend Implementation Planning
- Frontend Backend Contract Preparation
- Backend Stack Decision

The backend now has:

- NestJS runtime
- health endpoint
- Prisma setup
- first schema
- migration
- safe seed
- Prisma Client generation

The next step is to expose safe seeded reference data through simple REST APIs.

---

# Decision

Implement read-only Reference Data APIs before Campaign APIs.

This sprint implements:

- WorkspacesModule
- WorkspacesController
- WorkspacesService
- UsersModule
- UsersController
- UsersService
- SquadsModule
- SquadsController
- SquadsService

Implemented endpoints:

```txt
GET /workspaces
GET /workspaces/:workspaceId
GET /users
GET /users/:userId
GET /squads
GET /squads/:squadId
```

---

# Rationale

Campaign persistence should reference:

- workspaceId
- ownerId
- squadId

Reference data must be readable before Campaign persistence APIs are useful.

This cut proves PostgreSQL reads through Prisma and NestJS modules without implementing Campaign product behavior.

---

# Guardrails

This ADR does not approve:

- Campaign APIs
- Campaign Workspace endpoint
- campaign child resource APIs
- write APIs for reference data
- frontend API clients
- frontend integration
- auth
- Docker
- workflow engine
- event sourcing

---

# Consequence

The backend can now expose seeded reference facts.

The next expected cut is Campaign Persistence Implementation, but it should remain focused and should not jump directly to Campaign Workspace.
