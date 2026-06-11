# Campaign Blockers Implementation

## Purpose

This document records the Campaign Blockers Implementation sprint.

This sprint implements the first Campaign child resource.

It introduces campaign-scoped blockers as persisted operational facts.

It does not implement Campaign Workspace endpoint.

It does not implement Notes, Decision Context, Activities or Handoffs.

It does not implement frontend integration.

It does not implement auth.

---

# Current Phase

Campaign Blockers Implementation

The project already has:

- NestJS backend runtime
- Prisma/PostgreSQL persistence foundation
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Child Resources Planning validated

This backend cut implements campaign-scoped blockers.

---

# Implemented Scope

Implemented:

- BlockersModule
- BlockersController
- BlockersService
- BlockerDto
- request parsing helpers
- response mapper
- DTO/request tests

Implemented endpoints:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

---

# Persistence Behavior

Blocker APIs persist and return blocker facts only:

- id
- campaignId
- createdById
- resolvedById
- title
- description
- severity
- status
- createdAt
- updatedAt
- resolvedAt

The API maps `createdById` and `resolvedById` to the existing Prisma fields `createdByUserId` and `resolvedByUserId`.

No Prisma schema change was required.

---

# Validation Behavior

Blocker operations validate:

- Campaign exists
- Blocker exists and belongs to the route campaign
- `createdById` exists when provided
- `resolvedById` exists when provided

Expected error codes:

```txt
CAMPAIGN_NOT_FOUND
BLOCKER_NOT_FOUND
USER_NOT_FOUND
INVALID_BLOCKER_INPUT
```

---

# Resolve Behavior

Resolve is a simple fact update.

It sets:

- `status` to `resolved`
- `resolvedAt` to the current server timestamp
- `resolvedById` when provided

It does not create:

- CampaignActivity
- timeline event
- notification
- handoff
- decision context
- workflow automation

---

# Explicit Non-Goals

This sprint did not implement:

- Notes API
- Decision Context API
- Activities API
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- auth
- RBAC
- Docker
- event sourcing
- workflow engine
- ticketing system
- incident system
- escalation workflow
- SLA engine
- derived intelligence persistence

---

# Final Principle

Blockers are campaign-scoped operational impediments.

They are not tickets, incidents or workflow automation.
