# Reference Data Implementation

## Purpose

This document records the Reference Data Implementation sprint.

This sprint implements the first product-adjacent backend APIs, but only for safe read-only reference data.

It does not implement Campaign persistence APIs, Campaign Workspace APIs, frontend integration or auth.

---

# Current Phase

Reference Data Implementation

The project already has:

- minimal NestJS backend skeleton
- Prisma and PostgreSQL foundation
- first Prisma schema
- safe reference seed strategy
- PrismaService and PrismaModule as infrastructure
- health endpoint

This sprint exposes seeded reference data through simple REST endpoints.

---

# Implemented Scope

Implemented:

- WorkspacesModule
- WorkspacesController
- WorkspacesService
- UsersModule
- UsersController
- UsersService
- SquadsModule
- SquadsController
- SquadsService
- simple DTO mapping functions
- simple response wrappers
- read-only endpoints for workspaces, users and squads
- DTO mapper tests

---

# Implemented Endpoints

```txt
GET /workspaces
GET /workspaces/:workspaceId

GET /users
GET /users/:userId

GET /squads
GET /squads/:squadId
```

No write endpoints were created.

---

# Why Reference Data Comes Before Campaigns

Campaigns should not store owner and squad as UI strings.

Campaigns should reference:

- `ownerId -> User`
- `squadId -> Squad`
- `workspaceId -> Workspace`

Reference data must exist before Campaign persistence becomes useful.

---

# Prisma Usage

Services use `PrismaService` directly and simply.

Allowed usage implemented:

- `findMany`
- `findUnique`
- simple `select`
- simple `orderBy`

No repository layer, unit of work, custom ORM wrapper, domain event bus or workflow logic was introduced.

---

# Error Handling

Not found responses use simple error wrappers:

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found."
  }
}
```

Implemented error codes:

- `WORKSPACE_NOT_FOUND`
- `USER_NOT_FOUND`
- `SQUAD_NOT_FOUND`

Raw Prisma errors are not exposed as API responses.

---

# What Remains Deferred

Still deferred:

- Campaign APIs
- Campaign Workspace endpoint
- campaign child resource APIs
- write APIs for reference data
- frontend API clients
- frontend mappers
- auth
- RBAC
- Docker
- realtime
- workflow engine
- event sourcing

---

# Final Principle

Reference data APIs prove backend reads through Prisma without turning the backend into the Campaign product yet.
