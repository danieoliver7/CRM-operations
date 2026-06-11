# Backend V1 Validation Plan

## Purpose

This document defines how Backend V1 implementation should be validated.

It exists to prevent backend code from violating product, domain, contract and MVP decisions.

---

# Validation Philosophy

Backend V1 should be validated against:

- Backend MVP scope
- stack guardrails
- persistence boundaries
- first schema checklist
- frontend-backend contracts
- API boundaries
- product anti-patterns

Backend correctness is not only technical. It must also preserve product architecture.

---

# Pre-Implementation Validation

Before backend code starts, confirm:

- Backend Implementation Plan exists
- Backend V1 Module Plan exists
- First Prisma Schema Plan exists
- Backend V1 API Implementation Plan exists
- Backend V1 Validation Plan exists
- ADR for implementation planning exists
- current phase is Backend Implementation Planning
- no backend runtime code has been created during planning

---

# Schema Validation

Before creating `schema.prisma`, validate against:

- `/docs/backend/first-schema-review-checklist.md`
- `/docs/backend/first-prisma-schema-plan.md`
- `/docs/backend/persistence-boundaries.md`
- `/docs/backend/entity-relationships.md`
- `/docs/contracts/dto-to-view-model-mapping.md`
- `/docs/contracts/campaign-workspace-contract.md`

The first schema must prove that it does not persist:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- progress as primary truth
- SLA label as primary truth
- UI state

---

# Module Validation

Validate that first modules match the module plan:

- workspaces
- users
- squads
- campaigns
- activities
- blockers
- handoffs
- notes
- decision-context
- shared

Reject modules such as:

- ExecutionHealthModule
- OperationalRiskModule
- CoordinationStateModule
- WorkflowContinuityModule
- CommandCenterModule
- TimelinePresentationModule
- WorkflowEngineModule

---

# API Validation

Validate that APIs:

- expose persisted facts
- follow REST-first resource boundaries
- remain campaign-centered
- align with DTO contracts
- support Campaign Workspace durability

Validate that Backend V1 does not create:

- workflow runtime APIs
- derived intelligence APIs
- orchestration endpoints
- generic project management APIs
- AI prediction APIs

---

# Contract Validation

Validate:

- DTOs map cleanly to frontend View Models
- Campaign Workspace response provides required facts
- empty arrays are valid success responses
- errors can become operational messages
- mock/UI compatibility fields do not become schema by accident

Key compatibility fields to protect:

- owner
- squad
- progress
- sla

---

# Frontend Compatibility Validation

Backend implementation should not require rewriting the frontend.

Validate that the future integration can remain incremental:

```txt
API DTO
  -> mapper
  -> View Model
  -> component
```

Frontend-derived utilities should continue to own:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- timeline presentation
- command center summary
- dashboard warnings
- planning pressure
- owner pressure
- squad pressure

---

# Non-Goal Validation

Every Backend V1 implementation PR should confirm it did not introduce:

- auth too early
- Docker too early
- microservices
- CQRS
- event sourcing
- workflow engine behavior
- orchestration layer
- realtime
- notifications
- integrations
- AI
- billing
- advanced RBAC
- analytics warehouse

---

# Planning Sprint Validation

For this planning sprint specifically, validate:

- `git diff --check` passes
- Markdown fences are balanced
- no `backend/src` exists
- no `server` folder was created
- no `prisma/schema.prisma` exists
- no migrations folder exists
- no API runtime files were created
- no `.env` file was created

If runtime code is touched accidentally, run frontend lint/build and explain why.

---

# Backend Skeleton Implementation Validation

During the Backend Skeleton Implementation sprint, backend runtime code may be created.

This replaces the planning-only validation rule that no backend folder should exist.

Allowed:

- backend folder
- minimal NestJS app
- TypeScript backend config
- backend package scripts
- minimal health/root endpoint

Still disallowed:

- Prisma
- schema.prisma
- migrations
- database connection
- product modules
- product APIs
- auth
- Docker
- frontend API client

Use:

- `/docs/backend/backend-skeleton-implementation.md`
- `/docs/backend/backend-skeleton-project-structure.md`
- `/docs/backend/backend-skeleton-validation.md`

to validate the skeleton sprint.

---

# Prisma And Database Foundation Validation

During the Prisma And Database Foundation sprint, persistence foundation may be created.

Allowed:

- Prisma setup
- `schema.prisma`
- PostgreSQL datasource configuration through local environment and Prisma config
- Prisma Client generation
- first migration SQL if schema passes review
- safe seed script if justified
- `.env.example`

Still disallowed:

- product API routes
- product controllers
- product services
- frontend API client
- auth
- Docker
- workflow engine
- derived intelligence persistence

Use:

- `/docs/backend/prisma-database-foundation.md`
- `/docs/backend/prisma-schema-implementation-rules.md`
- `/docs/backend/database-environment-rules.md`
- `/docs/backend/database-seed-strategy.md`
- `/docs/backend/prisma-database-validation.md`

to validate the sprint.

The schema must not persist:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- progress as primary truth
- SLA label as primary truth
- UI state

Migration and seed application require valid local database credentials.

If local credentials fail authentication, the sprint can still be considered structurally valid when:

- Prisma format passes
- Prisma validate passes
- Prisma Client generation passes
- migration SQL is generated from the approved schema
- backend lint/test/build pass
- health endpoint still works
- frontend lint/build pass

# Reference Data Implementation Validation

During the Reference Data Implementation sprint, read-only backend APIs may be created for reference data.

Allowed:

- WorkspacesModule
- WorkspacesController
- WorkspacesService
- UsersModule
- UsersController
- UsersService
- SquadsModule
- SquadsController
- SquadsService

Allowed endpoints:

GET /workspaces
GET /workspaces/:workspaceId
GET /users
GET /users/:userId
GET /squads
GET /squads/:squadId

Validate that reference data APIs:

- read seeded PostgreSQL data through Prisma
- return list responses as `{ data: T[] }`
- return detail responses as `{ data: T }`
- return not-found responses as `{ error: { code, message } }`
- use `WORKSPACE_NOT_FOUND`, `USER_NOT_FOUND` and `SQUAD_NOT_FOUND`
- keep services simple and direct
- avoid repository abstractions, workflow logic and derived intelligence

Still disallowed:

- Campaign APIs
- Campaign Workspace endpoint
- campaign child resource APIs
- write APIs for reference data
- frontend API client
- auth
- Docker
- realtime
- workflow engine behavior

Use:

- `/docs/backend/reference-data-implementation.md`
- `/docs/backend/reference-data-api-contract.md`
- `/docs/backend/reference-data-validation.md`
- `/docs/decisions/ADR-018-reference-data-implementation.md`

to validate the reference data sprint.


# Campaign Persistence Implementation Validation

During the Campaign Persistence Implementation sprint, basic Campaign backend APIs may be created.

Allowed:

- CampaignsModule
- CampaignsController
- CampaignsService
- Campaign DTOs
- Campaign request DTOs
- Campaign response mappers

Allowed endpoints:

GET /campaigns
GET /campaigns/:campaignId
POST /campaigns
PATCH /campaigns/:campaignId
PATCH /campaigns/:campaignId/status
PATCH /campaigns/:campaignId/priority
PATCH /campaigns/:campaignId/owner
PATCH /campaigns/:campaignId/squad

Validate that Campaign APIs:

- persist Campaign records through Prisma/PostgreSQL
- return list responses as `{ data: T[] }`
- return detail responses as `{ data: T }`
- validate `workspaceId`, `ownerId` and `squadId` before writes
- use `CAMPAIGN_NOT_FOUND`, `WORKSPACE_NOT_FOUND`, `USER_NOT_FOUND`, `SQUAD_NOT_FOUND` and `INVALID_CAMPAIGN_INPUT`
- keep status, priority, owner and squad updates as fact updates only
- do not create activities, handoffs, timeline events or decision context automatically
- do not return derived operational intelligence as backend truth

Still disallowed:

- Campaign Workspace endpoint
- campaign child resource APIs
- ActivitiesModule
- BlockersModule
- HandoffsModule
- NotesModule
- DecisionContextModule
- frontend API client
- auth
- Docker
- realtime
- workflow engine behavior

Use:

- `/docs/backend/campaign-persistence-implementation.md`
- `/docs/backend/campaign-api-contract.md`
- `/docs/backend/campaign-persistence-validation.md`
- `/docs/decisions/ADR-019-campaign-persistence-implementation.md`

to validate the campaign persistence sprint.


# Campaign Child Resources Planning Validation

During Campaign Child Resources Planning, no child resource APIs should be implemented.

Allowed:

- planning docs for Campaign child resources
- prioritization docs
- API boundary docs
- validation docs
- ADR documenting child resource order

Still disallowed in this planning sprint:

- Blockers API implementation
- Notes API implementation
- Decision Context API implementation
- Activities API implementation
- Handoffs API implementation
- Campaign Workspace endpoint
- frontend API client
- frontend integration
- auth
- RBAC
- Docker
- workflow engine
- event sourcing
- realtime

Approved implementation order:

1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint

Validate that planning docs preserve these guardrails:

- Blockers do not become tickets, incidents, escalation or SLA engines
- Notes do not become chat, comments, threads, mentions or collaboration platforms
- Decision Context does not become approval workflow, comment system, knowledge base or documentation platform
- Activities do not become event sourcing, audit logs, automatic logs, timeline presentation backend or notification feed
- Handoffs do not become workflow engines, dependency graphs, BPM runtime or orchestration
- Campaign Workspace Facts Endpoint does not become command center backend, derived intelligence API, timeline presentation API or dashboard summary API

Use:

- `/docs/backend/campaign-child-resources-planning.md`
- `/docs/backend/campaign-child-resource-prioritization.md`
- `/docs/backend/campaign-child-resource-api-boundaries.md`
- `/docs/backend/campaign-child-resource-validation.md`
- `/docs/decisions/ADR-020-campaign-child-resources-planning.md`

to validate the planning sprint.

---

# Campaign Blockers Implementation Validation

During the Campaign Blockers Implementation sprint, the first Campaign child resource API may be created.

Allowed:

- BlockersModule
- BlockersController
- BlockersService
- Blocker DTOs
- Blocker request helpers
- Blocker response mapper
- Blocker validation tests

Allowed endpoints:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

Validate that Campaign Blockers APIs:

- persist blocker facts through Prisma/PostgreSQL
- return simple `{ data }` wrappers
- validate Campaign existence for every operation
- validate blocker belongs to the route Campaign
- validate User references when provided
- use `CAMPAIGN_NOT_FOUND`, `BLOCKER_NOT_FOUND`, `USER_NOT_FOUND` and `INVALID_BLOCKER_INPUT`
- avoid automatic activity, timeline, handoff, decision context or notification creation
- avoid derived intelligence persistence or response fields

Still disallowed:

- Notes API implementation
- Decision Context API implementation
- Activities API implementation
- Handoffs API implementation
- Campaign Workspace endpoint
- frontend API client
- auth
- RBAC
- Docker
- workflow engine
- event sourcing
- realtime
- ticketing system
- SLA engine

Use:

- `/docs/backend/campaign-blockers-implementation.md`
- `/docs/backend/campaign-blockers-api-contract.md`
- `/docs/backend/campaign-blockers-validation.md`
- `/docs/decisions/ADR-021-campaign-blockers-implementation.md`

to validate the Campaign Blockers implementation sprint.

---

# Final Principle

Backend V1 validation should protect the product from accidental architecture drift.

It should be easier to reject premature complexity than to remove it later.
